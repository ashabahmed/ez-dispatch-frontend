import React from 'react'

const BookingRow = (props) => {
  
  return (
      <tr>
        <td>
          <span>{props.booking.id}</span>
        </td>
        <td>
          <span>{props.booking.vehicle ? props.booking.vehicle.vehicle_type : " "}</span>
        </td>
        <td>
          <span>{props.booking.vehicle ? props.booking.vehicle.id : " "}</span>
        </td>
        <td>
          <span>{props.booking.account ? props.booking.account.name : " "}</span>
        </td>
        <td>
          <span>{new Date(Date.parse(props.booking.date)).toDateString()}</span>
        </td>
        <td>
          <span>{props.booking.trip_status}</span>
        </td>
        <td>
          <span>{props.booking.pick_up_time}</span>
        </td>
        
      </tr>
  )
}

// Booking No: {props.booking.id} | Dispatcher: {props.booking.dispatcher.name} | Account: {props.booking.account.name} | Driver: {props.booking.driver ? props.booking.driver.name : "   "} | Date: {props.booking.date} | Vehcile: {props.booking.vehicle ? props.booking.vehicle.id : "   "} | P/U Address: {props.booking.pick_up_address} | D/O Address: {props.booking.drop_off_address} | Trip Status: {props.booking.trip_status} | Price: ${props.booking.price} | Passenger Name: {props.booking.passenger_name} | Created at: {props.booking.created_at}

export default BookingRow
