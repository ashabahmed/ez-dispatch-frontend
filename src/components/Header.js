import React from 'react'
import DispatchGrid from '../containers/DispatchGrid';


class Header extends React.Component {

  handleClick = (dateChange) => {
    this.props.dayChangeHandler(dateChange)
  }

  addBookingClick = () => {
    this.props.routerProps.history.push('/add-booking')
  }

  editBookingClick = () => {
    this.props.routerProps.history.push('/edit-booking')
  }

  render(){
    console.log(this.props)
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <h1 >CHANGE DAYS</h1>
          <button onClick={() => {this.handleClick(-1)}}>Previous Day</button>
          <button onClick={() => {this.handleClick(+1)}}>Next Day</button>
          <button onClick={() => {this.handleClick()}}>Today</button>
          <button onClick={this.addBookingClick} className="createBooking">Add Booking</button>
          <button onClick={this.editBookingClick} className="editBooking">Edit Booking</button>

        </div>
        <div><h3 style={{textAlign: "center"}} >Viewing: {this.props.currentDate.toDateString()} </h3></div>
        <hr/>
        <>
          <DispatchGrid currentDate={this.props.currentDate}/>
        </>
    </div>
    )
  }
} 



export default Header