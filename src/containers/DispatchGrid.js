import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'

class DispatchGrid extends React.Component {

  state = {
    //change todaysbookings to currentBookings (var and method name)
    todaysBookings: [],
    // currentDate: (new Date()) 
  }
  
  componentDidMount(){
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
    console.log(this.props.dayChange)
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

function mapStateToProps(state){
  return {bookings: state.bookings}
}

export default connect(mapStateToProps)(DispatchGrid)
