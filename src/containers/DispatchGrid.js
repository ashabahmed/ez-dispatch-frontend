import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'
import { fetchDriversAction } from '../redux/actions'

class DispatchGrid extends React.Component {

  state = {
    todaysBookings: [],
  }
  
  componentDidMount(){
    this.props.getState()
    this.setState({ todaysBookings: this.todaysBookings() })
  }
  
  todaysBookings = (currentDate) => {
    let newArray = [...this.props.bookings]
    
    let todaysBookings = newArray.filter((booking) => currentDate.toDateString() === (new Date(Date.parse(booking.date))).toDateString())
    return todaysBookings
  }

  // changeDate = () => {
    
  //   this.setState({currentDate: this.state.currentDate.setDate(this.props.dayChange)})
  // }
  
  renderBookings = () => {
    return this.todaysBookings(this.props.dayChange).map((booking) => <BookingRow key={booking.id} booking={booking}/>)
  }
  
  render(){
    console.log(this.props)
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
          </tr>
          </thead>
          <tbody>{this.renderBookings()}</tbody>
        </table>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return { getState: () => dispatch(fetchDriversAction()) }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings,
    drivers: state.drivers
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(DispatchGrid)
