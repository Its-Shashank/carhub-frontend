import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './tile.scss'
import { DialogTitle, Dialog, DialogContent } from '@material-ui/core';

function MyApp(props) {
	const [value, onChange] = useState(new Date())
	const [open, setOpen] = useState(true)

	useEffect(() => {
		console.log(new Date(value[1]))
		const daysBetween = (new Date(value[1]).getTime() - new Date(value[0]).getTime())/(1000 * 60 * 60 * 24)
		if (daysBetween !== "NaN") {
			localStorage.setItem('orderDays', Math.round(daysBetween))
			localStorage.setItem('dates', value)
		}
	}, [value])
	
  	const forward = e => {
		e.preventDefault()
		props.nextStep()
	}
	
	const backward = e => {
		e.preventDefault()
		props.prevStep()
	}

	const handleClose = () => {
		setOpen(false)
	}

  return (
    <div>
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle>
				<h2>How long you want the car to be yours?</h2>
			</DialogTitle>
			<DialogContent>
				<Calendar
					selectRange
					showDoubleView
					minDate={new Date()}
					onChange={onChange}
					value={value}
				/>
				{console.log(value)}
				<div className='direction-btns'>
					<button onClick={backward} className='date-btn'>Previous</button>
					{
						!localStorage.getItem('orderDays') ? 
							<button disabled="disabled" className='date-btn'>Next</button>
							:
							<button onClick={forward} className='date-btn'>Next</button>
					}
				</div>
			</DialogContent>
		</Dialog>
    </div>
  );
}

export default MyApp

// import React, { Component } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
 
// class MyApp extends Component {
//   state = {
//     date: new Date(),
//   }
 
//   onChange = date => this.setState({ date })
 
//   render() {
//     return (
//       <div>
//         <Calendar
// 					selectRange
// 					showDoubleView
// 					minDate={new Date()}
//           onChange={this.onChange}
//           value={this.state.date}
//         />
// 				{console.log(this.date)}
//       </div>
//     );
//   }
// }
// export default MyApp
