import React from 'react'

class AddBookingForm extends React.Component {

  state = {
    booking: ""
  }

  render() {
    console.log(this.props.routerProps)
    return (
    <div className="form-wrapper">
        <h1>Add Booking Form</h1>
    </div>
    )
  }

}

export default AddBookingForm