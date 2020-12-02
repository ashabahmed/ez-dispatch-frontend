import React from 'react'
import DispatchGrid from '../containers/DispatchGrid';


class Header extends React.Component {

  handleClick = (dateChange) => {
    this.props.dayChangeHandler(dateChange)
  }

  addBookingClick = () => {
    this.props.routerProps.history.push('/add-booking')
  }


  render(){

    return (
      <div>
        <div style={{textAlign: "center"}}>
          <h1 >EzDispatch</h1>
          <hr/>

          <button style={{textAlign: "center"}} className="button1" onClick={() => {this.handleClick()}}>Today</button>
          <button style={{float: "right"}} className="button1" onClick={this.addBookingClick} >Add Booking</button>

        </div>
        <div><h3 style={{textAlign: "center"}} >Viewing: {this.props.currentDate.toDateString()} </h3></div>
        <hr/>
        <>
          <DispatchGrid routerProps={this.props.routerProps} currentDate={this.props.currentDate}/>
        </>
        <div style={{textAlign: "center"}}>
          <button className="button1" onClick={() => {this.handleClick(-1)}}>Previous Day</button>
          <button  className="button1" onClick={() => {this.handleClick(+1)}}>Next Day</button>
        </div>
    </div>
    )
  }
} 



export default Header