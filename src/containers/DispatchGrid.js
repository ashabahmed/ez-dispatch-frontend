import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'
import { fetchDriversAction, fetchDispatchersAction } from '../redux/actions'
import BookingDetailPage from '../components/BookingDetailPage'

class DispatchGrid extends React.Component {

  state = {
    todaysBookings: []
  }
  
  componentDidMount(){
    this.props.getDrivers()
    this.props.getDispatchers()
    this.setState({ todaysBookings: this.todaysBookings() })
  }
  
  todaysBookings = (currentDate) => {
    if(currentDate === undefined){
      console.log(this.props)
    } else {
      let todaysBookings = this.props.bookings.filter((booking) => {
        return currentDate.toDateString() === (new Date(Date.parse(booking.date))).toDateString()
      })
      return todaysBookings
    }
  }

  renderBookings = () => {
    return this.todaysBookings(this.props.currentDate).map((booking) => <BookingRow key={booking.id} booking={booking}/>)
  }
  
  render(){
    return(
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
          </tr>
          </thead>
          <tbody>{this.renderBookings()}</tbody>
        </table>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    getDrivers: () => dispatch(fetchDriversAction()),
    getDispatchers: () => dispatch(fetchDispatchersAction())
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings,
    drivers: state.drivers,
    dispatchers: state.dispatchers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchGrid)
