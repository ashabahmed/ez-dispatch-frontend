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
  //   if(this.props.bookings.location_point){

  //   }
  //   this.setState({
  //     pickUpLat: this.props.bookings.location_point.pick_up_latitude,
  //     pickUpLong: this.props.bookings.location_point.pick_up_longitude,
  //     dropOffLat:this.props.bookings.location_point.drop_off_latitude,
  //     dropOffLong: this.props.bookings.location_point.drop_off_longitude
  //   })
  // }

  // gettingBooking = () => {
  //   let id = parseInt(this.props.routerProps.match.params.id)
  //   let foundBooking
  //   if (this.props.bookings.length > 0 ) {
  //     foundBooking = this.props.bookings.find(b => b.id === id)
  //   }
  //   return foundBooking
  // }

  apiOnClick = () => {
    let booking = this.props.booking
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${booking.pick_up_address}&destination=${booking.drop_off_address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log("tr", resp["routes"]["0"]["legs"]["0"]["distance"]["text"])
      let obj = {}
      if (resp['status'] === "OK"){
        obj["location_found"] = true
        let endLocation = resp["routes"]["0"]["legs"]["0"]["end_location"]
        let startLocation = resp["routes"]["0"]["legs"]["0"]["start_location"]
  
        obj["pick_up_longitude"] = startLocation.lng
        obj["pick_up_latitude"] = startLocation.lat
        obj["drop_off_longitude"] = endLocation.lng
        obj["drop_off_latitude"] = endLocation.lat
        
        obj["distance"] = resp["routes"]["0"]["legs"]["0"]["distance"]["text"]
        obj["duration"] = resp["routes"]["0"]["legs"]["0"]["duration"]["text"]
      } else {
        obj["location_found"] = false
      }

    
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
  

    if (this.props.booking === undefined) {
      return (
        <>
          <div className='modal-mask' onClick={() => {this.props.detailClosePopUp()}}>
          </div> 
          <h1>LOADING</h1>
        </>
      )

    } else {
      let booking = this.props.booking
      return(
        <>
          <div className='modal-mask' onClick={() => {this.props.detailClosePopUp()}}>
          </div> 
          <div className="modal-thing columns">
            <h1 className="detailHeader">Details for Booking No.{booking.id}</h1>
            <h3>{booking.date.toString()}</h3>
            <h3>{booking.booking_datetime.toString()}</h3>
            <div className="leftSide">
              <h3 >Pick Up Address: {booking.pick_up_address}</h3>
            </div>
            <div className="rightSide">
              <h3>Drop Off Address: {booking.drop_off_address}</h3>
            </div>
            <button onClick={this.apiOnClick}>Load Map</button>
            <h4>
              { booking.location_point && `Distance: ${booking.location_point.distance}
              Duration: ${booking.location_point.duration}`}
            </h4> 
            <div className="modal-thing columns">
              {booking.location_point && <Demo1 booking={booking} pickUpLat={booking.location_point.pick_up_latitude}  
              pickUpLong={booking.location_point.pick_up_longitude} dropOffLat={booking.location_point.drop_off_latitude} dropOffLong={booking.location_point.drop_off_longitude}/>}
            </div>
          </div>
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