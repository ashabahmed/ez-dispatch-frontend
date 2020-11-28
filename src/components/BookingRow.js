import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSingleBookingAction } from '../redux/actions';

// import BookingDetailPage from './BookingDetailPage'


class BookingRow extends React.Component {

  state = {
    driverName: "",
    driver_id: 0,
    trip_status: "Booked",
    vehicle_id: 0,
    vehicle_type: "-- --",
    vehicleTypeBgColor: "white",
    passenger_name: "",
    date: ""
  }
  
  componentDidMount(){
    this.setState({ 
      vehicleTypeBgColor: this.vehicleTypeBgColor(), 
      trip_status: this.props.booking.trip_status, 
      vehicle_type: this.props.booking.vehicle_type,
      passenger_name: this.props.booking.passenger_name,
      date: this.props.booking.booking_datetime
    })
      this.props.booking.driver && this.setState({ driver_id: this.props.booking.driver.id })
      this.props.booking.vehicle && this.setState({ vehicle_id: this.props.booking.vehicle.id })
  }

  bookingDriverChangeHandler = (e) => {
    let obj = {}
    obj[`${e.target.name }`] = e.target.value

    this.props.updateBooking(this.props.booking.id, obj)
    this.setState({ driver_id: e.target.value })
  }

  bookingVehicleNumberChangeHandler = (e) => {
    let obj = {}
    obj[`${e.target.name }`] = e.target.value

    this.props.updateBooking(this.props.booking.id, obj)
    this.setState({ vehicle_id: e.target.value })
  }

  bookingTripStatusChangeHandler = (e) => {
    let obj = {}
    obj[`${e.target.name }`] = e.target.value
    console.log(e.target.value)
    switch(e.target.value){
      
      case "Picked Up":
        obj["pick_up_time"] = new Date()
        break
      case "Dropped":
        console.log(e.target.value)
        obj["drop_off_time"] = new Date()
        break
      default: 
        return obj
    }

    this.props.updateBooking(this.props.booking.id, obj)
    this.setState({ trip_status: e.target.value })
  }

  vehicleTypeChangeHandler = (e) => {
    let obj = {}
    
    obj[`${e.target.name }`] = e.target.value

    this.props.updateBooking(this.props.booking.id, obj)
    this.setState({ vehicle_type: e.target.value })
  }

  passengerNameChangeHandler = (e) => {
    let obj = {}
    
    obj[`${e.target.name }`] = e.target.value

    this.props.updateBooking(this.props.booking.id, obj)
    this.setState({ passenger_name: e.target.value })
  }


  driverNameOptions = () => {
    let fakeObj = {name: " "}
    let newArray = [fakeObj, ...this.props.drivers]
    return newArray.map((driver) => (<option key={driver.id} value={driver.id}>{driver.name}</option>))
  }

  vehicleNumberOptions = () => {
    let fakeObj = {id: " "}
    let newArray = [fakeObj, ...this.props.vehicles]
    return newArray.map((vehicle) => (<option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>))
  }

  clickHandler = () => {
    this.props.routerProps.history.push(`/bookings/${this.props.booking.id}`)
  }

  editBookingClick = () => {
    this.props.routerProps.history.push(`/edit-booking/${this.props.booking.id}`)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  vehicleTypeBgColor = () => {
    switch (this.props.booking.vehicle_type) {
      case "Sedan":
        return "blue"
      case "SUV":
        return "purple"
      case "Stretch Limo":
        return "pink"
      case "Luxury Van":
        return "orange"
      case "Cargo Van":
        return "yellow"
      case "Extended SUV":
        return "green" 
      default:
        return "white";
    }
  }

  bookingStatusBgColor = () => {
    switch (this.props.booking.trip_status) {
      case "No Show":
        return "red"
      case "Cancelled":
        return "gray"
      case "Dropped":
        return "pink"
      default:
        return "white";
    }
  }

  render(){
    console.log(this.props.booking.booking_datetime)
    return (
      <Fragment>
        <tr >
          <td>
            <span onClick={this.clickHandler}>{ this.props.booking.id }</span>
          </td>
          <td style={ {backgroundColor: this.vehicleTypeBgColor()} }>
            <select value={this.state.vehicle_type} onChange={this.vehicleTypeChangeHandler} name="vehicle_type">
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Stretch Limo">Stretch Limo</option>
              <option value="Luxury Van">Luxury Van</option>
              <option value="Cargo Van">Cargo Van</option>
              <option value="Extended SUV">Extended SUV</option>
            </select>
          </td>
          <td>
            <select value={this.state.vehicle_id} onChange={this.bookingVehicleNumberChangeHandler} name="vehicle_id">
              {this.vehicleNumberOptions()}
            </select>
          </td>
          <td>
            <span>{ this.props.booking.account ? this.props.booking.account.name : "-- --" }</span>
          </td>
          <td>
          <span>{ this.state.date.toString() }</span>
          <input type="datetime-local" value={this.state.date} name='date' onChange={this.handleChange}/>
          </td>
          <td>
            <select value={this.state.trip_status} onChange={this.bookingTripStatusChangeHandler} name="trip_status">
              <option value="Booked">Booked</option>
              <option value="No Show">No Show</option>
              <option value="Cancelled">Cancelled</option>
              <option value="En Route">En Route</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Dropped">Dropped</option>
            </select>
          </td>
          <td>
            <input value={ this.props.booking.passenger_name !== "" ?  this.props.booking.passenger_name : this.props.booking.account.name } name="passenger_name" onChange={this.passengerNameChangeHandler}/>
          </td>
          <td>
            <select value={this.state.driver_id} onChange={this.bookingDriverChangeHandler} name="driver_id">
              {this.driverNameOptions()}
            </select>
          </td>
          <td>
            <span>{ this.props.booking.pick_up_address === "" ? "-- --"  : this.props.booking.pick_up_address }</span>
          </td>
          <td>
          <span>{ this.props.booking.drop_off_address === "" ? "-- --"  : this.props.booking.drop_off_address }</span>
          </td>
          <td>
            <span>{ this.props.booking.pick_up_time ? (new Date(this.props.booking.pick_up_time).toTimeString()).slice(0, 5) : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.drop_off_time ? (new Date(this.props.booking.drop_off_time).toTimeString()).slice(0, 5): "-- --" }</span>
          </td>
          <td>
            <button onClick={this.editBookingClick} className="editBooking">Edit Booking</button>
          </td>
  
        </tr>
        
      </Fragment>
    )
  }

}

function mapDispatchToProps(dispatch){
  return { 
    updateBooking: (bookingId, obj) => dispatch(updateSingleBookingAction(bookingId, obj))
  }
}

export default connect(null, mapDispatchToProps)(BookingRow)


