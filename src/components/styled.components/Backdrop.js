import React, { useEffect } from 'react'
import { getAllCars } from '../../apiCalls/auth'

function Backdrop() {
  const [cars, setCars] = useState([])
  const [filteredCar, setFilteredCar] = useState('')

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      getAllCars()
      .then(cars => {
        setCars(cars)
        console.log(cars)
      })
      .catch(err => console.log(err))
    }
  })

  useEffect(() => {
    const filteredCars = cars.filter(car => car.user === this.state.userId)
    console.log(filteredCars)
    setFilteredCar(filteredCars)
  })
  
  return (
    <div>
      
    </div>
  )
}

export default Backdrop
