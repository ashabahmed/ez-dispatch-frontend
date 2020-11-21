import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'
import { fetchDriversAction, fetchDispatchersAction } from '../redux/actions'

class DispatchGrid extends React.Component {

  state = {
    todaysBookings: [],
  }
  
  componentDidMount(){
    this.props.getDrivers()
    this.props.getDispatchers()
    this.setState({ todaysBookings: this.todaysBookings() })
  }
  
  todaysBookings = (currentDate) => {

    let todaysBookings = this.props.bookings.filter((booking) => {
      return currentDate.toDateString() === (new Date(Date.parse(booking.date))).toDateString()
    })
    return todaysBookings
  }

  // changeDate = () => {
    
  //   this.setState({currentDate: this.state.currentDate.setDate(this.props.dayChange)})
  // }
  
  renderBookings = () => {
    console.log(this.props.currentDate, "INSIDE RENDER BOOKINGS")
    return this.todaysBookings(this.props.currentDate).map((booking) => <BookingRow key={booking.id} booking={booking}/>)
  }
  
  render(){
    console.log(this.props, "DISPATCHGRID")
    return(
      <div>
        <table>
          <thead>
          <tr>
            <th>
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
              Date
            </th>
            <th>
              Status
            </th>
            <th>
              Pick-up Time
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
    dispatchers: state.dispatchers,
    dateFromReducer: state.dateFromReducer
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(DispatchGrid)
