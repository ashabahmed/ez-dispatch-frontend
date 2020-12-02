import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSingleBookingAction } from '../redux/actions';
import EditBookingForm from './EditBookingForm';
import BookingDetailPage from './BookingDetailPage'


class BookingRow extends React.Component {

  state = {
    driverName: "",
    driver_id: 0,
    trip_status: "Booked",
    vehicle_id: 0,
    vehicle_type: "-- --",
    passenger_name: "",
    date: "",
    clicked: false,
    detailClicked: false
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
        obj[`${e.target.name }`] = e.target.value
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

  dateChangeHandler = e => {

    let obj = {}
    
    obj[`${e.target.name }`] = e.target.value
    
    this.props.updateBooking(this.props.booking.id, obj)
    this.setState( {date: new Date(this.props.booking.booking_datetime)} )
    
  }

  driverNameOptions = () => {
    let newArray = [...this.props.drivers]
    return newArray.map((driver) => (<option key={driver.id} value={driver.id}>{driver.name}</option>))
  }

  vehicleNumberOptions = () => {
    let newArray = [...this.props.vehicles]
  return newArray.map((vehicle) => (<option key={vehicle.id} value={vehicle.id}>{vehicle.id} - {vehicle.vehicle_type} - {vehicle.year}</option>))
  }

  clickHandler = () => {
    this.setState((previousState) => ({ detailClicked: !previousState.detailClicked }))
  }

  editBookingClick = () => {
    this.setState((previousState) => ({ clicked: !previousState.clicked }))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  vehicleTypeBgColor = () => {
    switch (this.props.booking.vehicle_type) {
      case "Sedan":
        return "NavajoWhite"
      case "SUV":
        return "LightSteelBlue"
      case "Stretch Limo":
        return "Plum"
      case "Luxury Van":
        return "RosyBrown"
      case "Cargo Van":
        return "Gainsboro"
      case "Extended SUV":
        return "IndianRed" 
      default:
        return "white";
    }
  }

  tripStatusStyleChange = () => {
    switch (this.props.booking.trip_status) {
      case "Dropped":
        return "droppedStatus"
      case "No Show":
        return "noShowStatus"
      case "Cancelled":
        return "cancelledStatus"
      case "Picked Up":
        return "pickedUpStatus"
      default:
        return "defaultStatus";
    }
  }

  closePopUp = () => {
    this.setState((previousState) => ({ clicked: !previousState.clicked }))
  }

  detailClosePopUp = () => {
    this.setState((previousState) => ({ detailClicked: !previousState.detailClicked  }))
  }

  render(){
    return (
      <Fragment>
        {this.state.clicked ? <EditBookingForm routerProps={this.props.routerProps} booking={this.props.booking} closePopUp={this.closePopUp}/> : null}
        {this.state.detailClicked ? <BookingDetailPage routerProps={this.props.routerProps} booking={this.props.booking} detailClosePopUp={this.detailClosePopUp}/> : null}
        <tr className={this.tripStatusStyleChange()}>
          <td className="bookingIdClick" onClick={this.clickHandler}>
            <div >{ this.props.booking.id }</div>
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
            <select style={{ textAlign: "center" }} value={this.state.vehicle_id} onChange={this.bookingVehicleNumberChangeHandler} name="vehicle_id">
              <option value="- - - -">- - - -</option>
              {this.vehicleNumberOptions()}
            </select>
          </td>
          <td >
            <span >{ this.props.booking.account ? this.props.booking.account.name : "-- --" }</span>
          </td>
          <td>
            <form>
              <input type="datetime-local" value={this.props.booking.booking_datetime} name='date' onChange={this.dateChangeHandler} />
            </form>
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
              <option value="--">- - - - -</option>
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
            <div>🗒</div>
          </td>
          <td>
            <button className="button1" onClick={this.editBookingClick} >Edit/View</button>
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


