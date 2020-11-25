import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'
// import BookingDetailPage from '../components/BookingDetailPage'

class DispatchGrid extends React.Component {

  state = {
    filtered: "Booked"
  }
  

  bookingsbyDay = (currentDate) => {
    if(currentDate === undefined){
      console.log("hello")
    } else {
      let todaysBookings = this.props.bookings.filter((booking) => {
        return currentDate.toDateString() === (new Date(Date.parse(booking.date))).toDateString()
      })
      return todaysBookings
    }
  }

  renderBookings = () => {
    return this.bookingsbyDay(this.props.currentDate).map((booking) => <BookingRow vehicles={this.props.vehicles} drivers={this.props.drivers} routerProps={this.props.routerProps} key={booking.id} booking={booking}/>)
  }

  updateFilter(type) {
    this.setState({ filtered: type })
  }

  render(){
    console.log(this.renderBookings())
    return(
      <>
        <div style={{ textAlign: "center" }}>
          <label >
            <strong>Filter:</strong>
            <select value={this.state.filtered} onChange={(e)=>this.updateFilter(e.target.value)}>
              <option value="Booked">Booked</option>
              <option value="Dropped">Dropped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>  
        <hr/>
        <div>
          <table style={{textAlign: "center"}}>
            <thead style={{textAlign: "center"}}>
            <tr>
              <th >
                Booking No.
              </th>
              <th>
                Vehicle Type
              </th>
              <th>
                Vehicle No.
              </th>
              <th>
                Account Name
              </th>
              <th>
                Scheduled Pick-up
              </th>
              <th>
                Status
              </th>
              <th>
                Passengers
              </th>
              <th>
                Driver
              </th>
              <th>
                Pick-up Point
              </th>
              <th>
                Drop-off Point
              </th>
              <th>
                Pick-up Time
              </th>
              <th>
                Drop-off Time
              </th>
              <th>
                Edit?
              </th>
            </tr>
            </thead>
            <tbody>{this.renderBookings()}</tbody>
          </table>
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings,
    drivers: state.drivers,
    dispatchers: state.dispatchers,
    vehicles: state.vehicles
  }
}

export default connect(mapStateToProps)(DispatchGrid)
