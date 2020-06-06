import React, { useEffect, useState } from 'react'
import Navbar from '../nav/Navbar'
import { getAllCars, getCities } from '../../apiCalls/auth'

function Ride() {
    
    const [cities, setCities] = useState([])
    const [allcars, setCars] = useState([])
    const [filteredCars, setFilteredCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {
        setLoading(true)
        getAllCars()
        .then(cars => {
            setCars(cars)
            setLoading(false)
        })
        .catch(err => console.log(err))
        getCities()
        .then(allcities => {
            setCities(allcities)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const filteredCars = allcars.filter(car => car.city._id === selectedCity)
        console.log(filteredCars)
        setFilteredCars(filteredCars)
    }, [selectedCity])

    return (
        <div>
            <Navbar />
            {
                !loading && 
                <div>
                    <h1>Select City</h1>
                    <div>
                        { 
                        cities.map((city, index) => (
                            <h2
                                key={index}
                                className='city'
                                name='cityId'
                                onClick={() => setSelectedCity(city._id)}
                            >
                                {city.name} 
                            </h2>
                        ))
                        }
                    </div>
                    <div>
                        <h1>Cars</h1>
                        { //console.log(allcars, cities)
                            filteredCars.map((car, index) => (
                                <h2
                                    key={index}
                                    className='city'
                                    name='cityId'
                                    // onClick={filterCars}
                                    value={car._id}
                                >
                                    {car.brand}
                                </h2>
                            ))
                        }
                    </div>
                </div>
                
            }
            
        </div>
    )
}
export default Ride