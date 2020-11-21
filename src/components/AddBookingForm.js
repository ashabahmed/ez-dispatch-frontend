import React from 'react'
import { connect } from 'react-redux';
import { createNewBookingAction } from '../redux/actions';

class AddBookingForm extends React.Component {

  state = {
    pickupDate: null,
    pickupTime: null,
    name: ""
  }

  clickHandler = () => {
    // e.preventDefault()
    this.props.routerProps.history.push('/header')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log("submitting")
    e.preventDefault();
    this.props.submitHandler(this.state)
    // this.props.routerProps.history.push('/header')
  }

  render() {
    console.log(this.props)

    return (
    <div className="form-wrapper">
        <h1>Add Booking Form</h1>
          <form onSubmit={this.handleSubmit}>
            Pick Up Date
            <input type="date" value={this.state.pickupDate} name='pickupDate' onChange={this.handleChange}/>
            Pick Up Time
            <input type="time" value={this.state.pickupTime} name='pickupTime' onChange={this.handleChange}/>
            Name
            <input type="textarea" value={this.state.name} name='name' onChange={this.handleChange}/>

            <button>Create New Booking</button>
          </form>
        
        <button onClick={this.clickHandler}>BACK</button>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return { submitHandler: (newBookingObj) => dispatch(createNewBookingAction(newBookingObj))}
}

export default connect(null, mapDispatchToProps)(AddBookingForm)