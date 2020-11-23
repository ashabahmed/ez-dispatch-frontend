import React from 'react'
import BookingDetailPage from './BookingDetailPage'

// import { NavLink } from 'react-router-dom'

const BookingRow = (props) => {

  const clickHandler = () => {
    
    props.routerProps.history.push(`/bookings/${props.booking.id}`)
  }

  
  return (
  
      <tr onClick={clickHandler}>
        {/* <NavLink className="bookingRowNavLink" to={{ pathname:`/bookings/${props.booking.id}` }}> */}
        <td>
          <span>{ props.booking.id }</span>
        </td>
        <td style={ {backgroundColor: "blue"} }>
          <span>{ props.booking.vehicle ? props.booking.vehicle.vehicle_type : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.vehicle ? props.booking.vehicle.id : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.account ? props.booking.account.name : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.date ? new Date(Date.parse(props.booking.date)).toLocaleString() : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.trip_status }</span>
        </td>
        <td>
          <span>{ props.booking.account.passengers === "" ? props.booking.account.name : props.booking.account.passengers }</span>
        </td>
        <td>
          <span>{ props.booking.driver ? props.booking.driver.name : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.pick_up_address === "" ? "-- --"  : props.booking.pick_up_address }</span>
        </td>
        <td>
        <span>{ props.booking.drop_off_address === "" ? "-- --"  : props.booking.drop_off_address }</span>
        </td>
        <td>
          <span>{ props.booking.pick_up_time ? new Date(Date.parse(props.booking.pick_up_time)).toLocaleTimeString() : "-- --" }</span>
        </td>
        <td>
          <span>{ props.booking.drop_off_time ? new Date(Date.parse(props.booking.drop_off_time)).toLocaleTimeString() : "-- --" }</span>
        </td>
        {/* </NavLink>   */}
      </tr>
    
  )
}

export default BookingRow
