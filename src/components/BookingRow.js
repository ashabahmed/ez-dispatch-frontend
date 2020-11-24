import React, { Fragment } from 'react'
// import BookingDetailPage from './BookingDetailPage'


class BookingRow extends React.Component {

  state = {
    driverName : "",
    driver: {}
  }
  
  componentDidMount(){
    this.setState({driver: this.props.booking.driver})
  }

  driverNameOptions = () => {
    let fakeObj = {name: " "}
    let newArray = [fakeObj, ...this.props.drivers]
    return newArray.map((driver) => (<option key={driver.id} value={driver.id}>{driver.name}</option>))
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
    switch (this.props.vehicle_type) {
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

  render(){
    // console.log(this.props.vehicle_type)
    return (
      <Fragment>
        <tr >
          <td>
            <span onClick={this.clickHandler}>{ this.props.booking.id }</span>
          </td>
          <td style={ {backgroundColor: this.vehicleTypeBgColor()} }>
            <span>{ this.props.booking.vehicle ? this.props.booking.vehicle.vehicle_type : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.vehicle ? this.props.booking.vehicle.id : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.account ? this.props.booking.account.name : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.date ? new Date(Date.parse(this.props.booking.date)).toLocaleString() : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.trip_status }</span>
          </td>
          <td>
            <span>{ this.props.booking.account.passengers === "" ? this.props.booking.account.name : this.props.booking.passenger_name }</span>
          </td>
          <td>
            <select value={this.state.driverName} onChange={this.handleChange} name="driverName">
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
            <span>{ this.props.booking.pick_up_time ? new Date(Date.parse(this.props.booking.pick_up_time)).toLocaleTimeString() : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.drop_off_time ? new Date(Date.parse(this.props.booking.drop_off_time)).toLocaleTimeString() : "-- --" }</span>
          </td>
          <td>
            <button onClick={this.editBookingClick} className="editBooking">Edit Booking</button>
          </td>
  
        </tr>
        
      </Fragment>
    )
  }

}

export default BookingRow
