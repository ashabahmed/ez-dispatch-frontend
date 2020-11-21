import React from 'react'
import DispatchGrid from '../containers/DispatchGrid';


class Header extends React.Component {

  handleClick = (dateChange) => {
    this.props.dayChangeHandler(dateChange)
  }

  addBookingClick = () => {
    console.log("is this working?")
    this.props.routerProps.history.push('/add-booking')
  }

  render(){
    console.log(this.props.routerProps)
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <h1 >CHANGE DAYS</h1>
          <button onClick={() => {this.handleClick(-1)}}>Previous Day</button>
          <button onClick={() => {this.handleClick(+1)}}>Next Day</button>
          <button onClick={() => {this.handleClick()}}>Today</button>
          <button onClick={this.addBookingClick}className="createBooking">Add Booking</button>
          
        </div>
        <>
          <DispatchGrid currentDate={this.props.currentDate}/>
        </>
    </div>
    )
  }
} 



export default Header