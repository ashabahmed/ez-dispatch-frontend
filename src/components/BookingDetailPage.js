import React from 'react'
import { connect } from 'react-redux'

class BookingDetailPage extends React.Component {

  gettingBooking = () => {
    let id = parseInt(this.props.routerProps.match.params.id)
    let foundBooking
    if (this.props.bookings.length > 0 ) {
      foundBooking = this.props.bookings.find(b => b.id === id)
    }
    return foundBooking
  }

  render(){
    
    return(
    <h1>Booking show page for {this.gettingBooking().account.name}</h1>
    )
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings
  }
}

export default connect(mapStateToProps)(BookingDetailPage)