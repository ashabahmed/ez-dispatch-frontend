import React from 'react'
import { connect } from 'react-redux'
import Demo1 from './Demo1'

class BookingDetailPage extends React.Component {

  state= {
    pickUpLat: 0,
    pickUpLong: 0,
    dropOffLat:0,
    dropOffLong: 0,
    bookingPickUp: "",
    bookingDropOff: ""
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  // componentDidMount(){

  // //   let booking = this.gettingBooking()
  // //   if (booking){


  // //   if(booking.location_point === null){
  // //     console.log(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${booking.pick_up_address}&destination=${booking.drop_off_address}&key=`)
  // //     fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${booking.pick_up_address}&destination=${booking.drop_off_address}&key=)
  // //     .then(resp => resp.json())
  // //     .then(test => {
  // //       console.log("tr", test["routes"]["legs"])
  // //       // fetch("http://localhost:3000/bookings/update_booking_request",{
  // //       //   method: "POST",
  // //       //   headers: {
  // //       //     "content-type": "application/json",
  // //       //     accepts: "application/json"
  // //       //   },
  // //       // })
  // //     })
  // //   } else {
  // //     this.setState({
  // //       // pickUpLat: this.props.bookings.location_point.pick_up_latitude,
  // //       // pickUpLong: this.props.bookings.location_point.pick_up_longitude,
  // //       // dropOffLat:this.props.bookings.location_point.drop_off_latitude,
  // //       // dropOffLong: this.props.bookings.location_point.drop_off_longitude
  // //     })
  // //   }
  // // }
  // }

  // componentDidMount(){
  //   pickUpLat: 0,
  //   pickUpLong: 0,
  //   dropOffLat:0,
  //   dropOffLong: 0,
  //   bookingPickUp: "",
  //   bookingDropOff: ""
  // }

  gettingBooking = () => {
    let id = parseInt(this.props.routerProps.match.params.id)
    let foundBooking
    if (this.props.bookings.length > 0 ) {
      foundBooking = this.props.bookings.find(b => b.id === id)
    }
    return foundBooking
  }

  apiOnClick = () => {
    let booking = this.gettingBooking()
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${booking.pick_up_address}&destination=${booking.drop_off_address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
    .then(resp => resp.json())
    .then(test => {
      console.log("tr", test["routes"]["0"]["legs"]["0"])
      let endLocation = test["routes"]["0"]["legs"]["0"]["end_location"]
      let startLocation = test["routes"]["0"]["legs"]["0"]["start_location"]
      let obj = {}
      obj["pick_up_longitude"] = startLocation.lng
      obj["pick_up_latitude"] = startLocation.lat
      obj["drop_off_longitude"] = endLocation.lng
      obj["drop_off_latitude"] = endLocation.lat
      obj["location_found"] = true

      console.log(endLocation.lat, startLocation)
      fetch("http://localhost:3000/bookings/update_booking_location",{
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify({booking: obj, id: booking.id})
      })
      .then(resp => resp.json())
      .then(booking => {this.setState({
        pickUpLat: parseFloat(booking.location_point.pick_up_latitude),
        pickUpLong: parseFloat(booking.location_point.pick_up_longitude),
        dropOffLat: parseFloat(booking.location_point.drop_off_latitude),
        dropOffLong: parseFloat(booking.location_point.drop_off_longitude)
      })})
    })
  }

  render(){
    console.log(this.state)
    if (this.gettingBooking() === undefined) {
      return (<h1>LOADING</h1>)
    } else {
      let booking = this.gettingBooking()
      return(
        <>
          <h1>Booking show page for {booking.account.name}</h1>
          <h3>{booking.date.toString()}</h3>
          <h3>{booking.booking_datetime.toString()}</h3>
          <h3>Pick Up Address: {booking.pick_up_address}</h3>
          <h3>Drop Off Address: {booking.drop_off_address}</h3>
          <button onClick={this.apiOnClick}>checking api</button>

          <div>{booking.location_point && < Demo1 pickUpLat={booking.location_point.pick_up_latitude}  pickUpLong={booking.location_point.pick_up_longitude} dropOffLat={booking.location_point.drop_off_latitude} dropOffLong={booking.location_point.drop_off_longitude}/>}</div>
        </> 
      )
    }
  
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings
  }
}

export default connect(mapStateToProps)(BookingDetailPage)