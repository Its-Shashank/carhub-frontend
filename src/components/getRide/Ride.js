import React, { useEffect, useState } from 'react'
import Navbar from '../nav/Navbar'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Tile from '../styled.components/CarTile'
import { TextField } from '@material-ui/core'
import { getAllCars, getCities, getPhoto } from '../../apiCalls/auth'
import './ride.scss'
import { css } from '@emotion/core'
import { ClipLoader } from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Ride(props) {
    
    const [cities, setCities] = useState([])
    const [allcars, setCars] = useState([])
    const [filteredCars, setFilteredCars] = useState([])
    const [loading, setLoading] = useState(false)
    // const [selectedCity, setSelectedCity] = useState('')
    const [url, setUrl] = useState([])

    useEffect(() => {
        setLoading(true)
        getAllCars()
        .then(cars => {
            setCars(cars)
            setLoading(false)
            console.log(cars)
        })
        .catch(err => console.log(err))
        getCities()
        .then(allcities => {
            setCities(allcities)
        })
        .catch(err => console.log(err))
    }, [])
    const [value, setValue] = useState(cities[0])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (localStorage.getItem('rideId') && allcars) {
            const filteredCars = allcars.filter(car => car.city._id === value && car._id !== localStorage.getItem('rideId'))
            setFilteredCars(filteredCars)
        }
        else {
            if (allcars) {
                const filteredCars = allcars.filter(car => car.city._id === value)
                setFilteredCars(filteredCars)
            }
        }
    }, [value])

    useEffect(() => {
        setLoading(true)
        filteredCars.map((car, index) => {
            console.log(car._id)
            getPhoto(car._id)
            .then(image => {
                setLoading(false)
                setUrl(url => url.concat(image.url))
                console.log(image.url)
            })
            .catch(err => console.log(err))
        })
    }, [filteredCars])

    return (
        <div>
            <Navbar {...props} />
            { loading && 
            <div className='loader'>
                <ClipLoader
                    css={override}
                    size={150}
                    color={'#123abc'}
                    loading={loading}
                />
            </div>
            }
            {
                !loading && 
                <div>
                    <div className='ride-page-top'>
                        <div className='ride-header'>
                            <h1>Your ultimate solution <br/> to easy travels!</h1>
                            <h3>Book your ride here. <br/> You have the chance to drive yourself <br/> to your dream destination and we <br/> are here to help you.</h3>
                        </div>
                        <div className='circle'>
                            <div className='inside-circle'>
                            </div>
                        </div>
                    </div>
                    <div className='ride-page-cities-container'>
                        <h1>Select City</h1>
                        <div className='ride-page-cities'>
                            <Autocomplete
                                id="controllable-states-demo"
                                value={value}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setValue(newValue._id)
                                    }
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue)
                                }}
                                options={cities}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                // onClick={() => setSelectedCity(option._id)}
                                renderInput={(params) => <TextField {...params} label="Select city" variant="outlined" />}
                            />
                        </div>
                    </div>
                    
                    { localStorage.getItem('rideName') &&
                    <div className='current-order'>
                        <h1>Your current order.</h1>
                        <h3> {localStorage.getItem('rideName')} </h3>
                        <h3> {localStorage.getItem('orderDays')} </h3>
                        <h3> {localStorage.getItem('dates')} </h3>
                        {console.log(localStorage.getItem('dates'))}
                    </div>
                    }
                    <div>
                        
                        {
                            filteredCars.length > 0 &&
                            <h1 style={{marginLeft: '20%'}}>Cars</h1>
                        }
                        
                        {
                            filteredCars.map((car, index) => (
                                <Tile
                                    key={index}
                                    value={car._id}
                                    car={car}
                                    url={url[index]}
                                />
                            ))
                        }
                    </div>
                </div>
                
            }
            
        </div>
    )
}
export default Ride