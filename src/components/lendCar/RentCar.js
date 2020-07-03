import React, { Component } from 'react'
import Navbar from '../nav/Navbar'
import Footer from '../footer/Footer'
import {
    getCities,
    getCategories,
    createNewCar,
    getCategory,
    getCity,
    deleteCar,
    getAllCars
} from '../../apiCalls/auth'
import './lend.scss'
import '../Home/home.scss'
import {
    MenuItem,
    Select,
    Grid,
    Chip
} from '@material-ui/core'
import {
    VpnKeyTwoTone,
    ThumbUp,
    FavoriteTwoTone,
    CreditCardTwoTone
} from '@material-ui/icons'

import { PropagateLoader } from 'react-spinners'
import { css } from '@emotion/core'
const override = css`
    display: block;
    margin-left:50%;
   `;

class RentCar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: false,
            error: '',
            open: false,
            cityId: '',
            categoryId: '',
            brand: '',
            modelName: '',
            year: '',
            price: '',
            userId: '',
            photo: '',
            cities: [],
            categories: [],
            submitted: false,

            // some additional state variables
            carFiltered: ''
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.handleCarRemove = this.handleCarRemove.bind(this)
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

        if (localStorage.getItem('user') !== null) {
            getAllCars()
            .then(cars => {
                if (cars.length > 0) {
                    console.log(cars)
                    const filteredCar = cars.filter(car => car.user._id === JSON.parse(localStorage.getItem('user')).user._id)
                    console.log(filteredCar, JSON.parse(localStorage.getItem('user')).user._id)
                    filteredCar &&
                    this.setState({ carFiltered: filteredCar })
                }
                if (this.state.carFiltered.length > 0) {
                    getCity(this.state.carFiltered[0].city._id)
                    .then(userCarCity => {
                        localStorage.setItem('userCity', userCarCity.name)
                        console.log(userCarCity)
                    })
                    .catch(err => console.log(err))

                    getCategory(this.state.carFiltered[0].category._id)
                    .then(userCarCategory => {
                        this.setState({
                            userCarCategoryName: userCarCategory.name
                        })
                        console.log(userCarCategory)
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        }
    }

    handleCarRemove(event) {
        event.preventDefault()
        deleteCar(this.state.carFiltered[0]._id, JSON.parse(localStorage.getItem('user')).user._id)
        .then(deletedCar => {
            if (deletedCar) {
                localStorage.removeItem('userCarId')
                localStorage.removeItem('userCity')
                this.setState({
                    carFiltered: '',
                    submitted: false
                })
            }
            
            console.log(deletedCar)
        })
        .catch(err => console.log(err))
    }

    handlePhoto(event) {
        console.log(event.target.files)
        this.setState({photo: event.target.files[0]})
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

    handleSubmit(event) {
        event.preventDefault()
        // localStorage.removeItem('car_image')
        this.setState({submitted: false, loading: true})
        let form = new FormData()
        form.append('brand', this.state.brand)
        form.append('modelName', this.state.modelName)
        form.append('year', this.state.year)
        form.append('category', this.state.categoryId)
        form.append('price', this.state.price)
        form.append('user', JSON.parse(localStorage.getItem('user')).user._id)
        form.append('city', this.state.cityId)
        form.append('photo', this.state.photo)
        
        createNewCar(form, JSON.parse(localStorage.getItem('user')).user._id)
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
                    photo: '',
                    submitted: true,
                    loading: false
                })
                this.props.history.push('/')
            }
        })
    }
    
    render() {
        return (
            
            // !this.state.loading &&
            <div>
                <Navbar {...this.props} />
                
                <div className='rent-image'>
                    <div className='rent-header'>
                        <h1>Rent your car with us!</h1>
                        <h3>
                            Cars in good condition can be found at reasonable prices.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ullam!
                        </h3>
                    </div>
                </div>

                {/* Features of carhub */}

                <div className='below-rent-img'>
                    <h1>The only app you need.</h1>
                    <div className='features'>
                        <div className='feature'>
                            <VpnKeyTwoTone />
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus delectus laboriosam cumque vel tempora at et facilis quidem temporibus est?</p>
                        </div>
                        <div className='feature'>
                            <ThumbUp />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti veritatis voluptatum alias non ipsam beatae, nobis inventore adipisci illum?</p>
                        </div>
                        <div className='feature'>
                            <FavoriteTwoTone />
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, quo dolore nobis doloribus iure reprehenderit reiciendis possimus! Vel, cum doloremque.</p>
                        </div>
                        <div className='feature'>
                            <CreditCardTwoTone />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magni excepturi amet vel cumque cum facilis dolorum voluptatem sint quos.</p>
                        </div>
                    </div>
                </div>

                {/* Cities container */}


                {
                    this.state.carFiltered.length === 0 && 
                    <Grid item className='cities-container' xs={12}>
                        { this.state.cities.map((city, index) => (
                            <Chip
                                key={index}
                                className='city'
                                onClick={() => this.setState({cityId: city._id})}
                                name='cityId'
                                label={city.name}
                            />
                            //     {city.name}
                            // </Chip>
                        )) }
                    </Grid>
                }
                
                {/* Form container */}

            {
                this.state.carFiltered.length === 0 && 

                <div className='car-form-container'>
                    <form method="post" className='car-page-form'>
                        <input
                            type="text"
                            className='car-inputs'
                            id='car-brand'
                            name="brand"
                            placeholder='Brand name'
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            className='car-inputs'
                            id='car-model'
                            name="modelName"
                            placeholder='Model'
                            onChange={this.handleChange}
                            required
                        />
                        <Select variant='outlined'
                            labelId="category-select"
                            id="demo-simple-select-outlined"
                            className='car-inputs'
                            open={this.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            name='categoryId'
                            onChange={this.handleChange}
                            defaultValue='None'
                        >
                            <MenuItem value='None'>
                                Choose car category
                            </MenuItem>
                        { this.state.categories.map((category, index) => (
                            // console.log(category)
                            <MenuItem
                                id='option-select'
                                key={index}
                                onChange={this.handleChange}
                                // style={{
                                //     backgroundColor: 'rgb(243, 243, 241)'
                                // }}
                                value={category._id}>
                                    {category.name} 
                            </MenuItem>
                        )) }
                        </Select>
                        <input
                            type="number"
                            className='car-inputs'
                            id='purchase-year'
                            name="year"
                            placeholder='Year of purchase'
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="number"
                            id='car-price'
                            className='car-inputs'
                            name="price"
                            placeholder='Price per day'
                            onChange={this.handleChange}
                            required
                        />
                        {
                            !this.state.photo ? (
                            <label htmlFor="car-photo" id='photo-label'>{localStorage.getItem('car_image')}</label>
                                
                            ) : (
                                <label htmlFor="car-photo" id='photo-label'>Choose car photo</label>
                            )
                        }
                        <input
                            type="file"
                            className='car-inputs'
                            id='car-photo'
                            name="photo"
                            onChange={this.handlePhoto}
                        />
                        
                        <button
                        type='submit'
                        className='car-submit'
                        onClick={this.handleSubmit}
                        >Rent your car!</button>
                        
                        { this.state.loading && 
                        <div className='loader'>
                            <PropagateLoader
                                css={override}
                                size={25}
                                color={'#6c63fe'}
                                loading={this.state.loading}
                            />
                        </div>
                        }
                    </form>
                </div>
            }
            {
                this.state.carFiltered.length > 0 &&
                <div className='my-car-container'>
                    <h1>Your car running on the roads of {localStorage.getItem('userCity')}</h1>
                    <h3> {this.state.carFiltered[0].brand} {this.state.carFiltered[0].modelName} </h3>
                    <button onClick={this.handleCarRemove} className='remove-btn'>Remove Car</button>
                </div>
            }

                <div>
                <Footer {...this.props} />
                </div>
            </div>
        )
    }
}
export default RentCar