import React, { Component } from 'react'
import Navbar from '../nav/Navbar'
import { getCities, getCategories, createNewCar, updateUser } from '../../apiCalls/auth'
import './lend.scss'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class RentCar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: false,
            cityId: '',
            categoryId: '',
            userId: JSON.parse(localStorage.getItem('user')).user._id,
            brand: '',
            modelName: '',
            year: '',
            price: '',
            photo: '',
            cities: [],
            categories: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        getCategories()
        .then(categories => {
            this.setState({ categories: categories })
        })
        .catch(err => console.log(err))
        
        getCities()
        .then(cities => {
            this.setState({cities: cities})
        })
        .catch(err => console.log(err))
    }

    handleSubmit(event) {
        event.preventDefault()
        let form = new FormData()
        form.append('brand', this.state.brand)
        form.append('modelName', this.state.modelName)
        form.append('year', this.state.year)
        form.append('category', this.state.categoryId)
        form.append('price', this.state.price)
        form.append('user', this.state.userId)
        form.append('city', this.state.cityId)
        // form.append('photo', this.state.photo)
        
        createNewCar(form, this.state.userId)
        .then(data => {
            if (data.err) {
                this.setState({error: data.err})
            }
            else {
                this.setState({
                    brand: '',
                    modelName: '',
                    year: '',
                    category: '',
                    city: '',
                    price: '',
                })
                const userForm = new FormData()
                userForm.append('car', data._id)
                updateUser(userForm, this.state.userId)
                .then(response => {
                    console.log(response)
                })
                .catch(err => console.log(err))
            }
        })
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }
    handleClose() {
        this.setState({ open: false })
    }
    handleOpen() {
        this.setState({ open: true })
    }
    
    render() {
        return (
            <div>
                <Navbar />
                <div className='cities-container'>
                    { this.state.cities.map((city, index) => (
                        <h1
                            key={index}
                            className='city'
                            onClick={() => this.setState({cityId: city._id})}
                            name='cityId'
                            value={city._id}
                        >
                            {city.name} 
                        </h1>
                    )) }
                </div>
                <h1>Rent your car with us.</h1>

                <form method="post" className='form-control'>
                    <input
                        type="text"
                        name="brand"
                        placeholder='Brand name'
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="modelName"
                        placeholder='Model'
                        onChange={this.handleChange}
                    />
                    <FormControl>
                        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={this.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            name='categoryId'
                            defaultValue={1}
                            onChange={this.handleChange}
                        >
                        { this.state.categories.map((category, index) => (
                            // console.log(category)
                            <MenuItem
                                key={index}
                                onChange={this.handleChange}
                                value={category._id}>
                                    {category.name} 
                            </MenuItem>
                        )) }
                        </Select>
                    </FormControl>
                    <input
                        type="number"
                        name="year"
                        placeholder='year of purchase'
                        onChange={this.handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder='price per day'
                        onChange={this.handleChange}
                    />
                    <input
                        type="file"
                        name="photo"
                        // onChange={this.handleChange}
                    />
                    <button type='submit' onClick={this.handleSubmit}>Rent your car!</button>
                </form>
            </div>
        )
    }
}
export default RentCar