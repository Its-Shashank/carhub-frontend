import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import './tile.scss'
import Date from './Date'
import ConfirmOrder from './Tile'

function CarTile(props) {
  // const values = {
  //   brand: props.car.brand,
  //   model: props.car.modelName,
  //   category: props.car.category.name,
  //   city: props.car.city.name,
  //   price: props.car.price,
  //   year: props.car.year,
  //   url: props.url
  // }
  const [step, setStep] = useState(1)
  const nextStep = () => {
    setStep(prev => prev + 1)
  }
  const prevStep = () => {
    setStep(next => next - 1)
  }

  switch(step) {
    case 1:
      return (
        <div className='tile-container'>
    
            <Grid container >
              <Grid item sm={12} md={7} className='car-text'>
                <h3 className='car-name'> {props.car.brand} {props.car.modelName} </h3>
                <h3 className='car-category'> {props.car.category.name} </h3>
                <h3 className='car-year'> {props.car.year} </h3>
                <h3 className='discount'>Special Price</h3>
                <h3 className='car-price'>₹ {props.car.price} <span className='discount' style={{marginLeft: '2rem'}}>20% off</span> </h3>
                <h4 className='tags'>
                  #JustHere #discount #{props.car.city.name}
                </h4>
    
              </Grid>
              <Grid item sm={12} md={5} className='car-thumbnail'>
                <img src={props.url} alt="thumbnail" className='car-tile'/>
                <button
                  onClick={nextStep}
                  className='date-btn'
                >
                    Book your ride
                </button>
              </Grid>
            </Grid>
          
          {/* {
            steps === 1 && <Date step={steps} />
          } */}
        </div>
      )
    
      case 2:
        return (
          <Date {...props} nextStep={nextStep} prevStep={prevStep} />
        )
      
      case 3:
        return (
          <ConfirmOrder
            {...props}
            car={props.car}
            prevStep={prevStep}
          />
        )
  }
  
  
}

export default CarTile
