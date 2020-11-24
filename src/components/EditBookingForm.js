import React from 'react'
import { connect } from 'react-redux';
import { fetchAccountsAction, editBookingAction } from '../redux/actions';

class EditBookingForm extends React.Component {

  state = {
    id: null,
    dispatcher: "2",
    date: '',
    pick_up_time: '',
    account: "",
    passenger_name: "",
    passenger_number: "",
    vehicle_type: "",
    pick_up_address: "",
    drop_off_address: "",
    special_notes: "",
    internal_notes: ""
  }

  gettingBooking = () => {
    let id = parseInt(this.props.routerProps.match.params.id)
    let foundBooking
    if (this.props.bookings.length > 0 ) {
      foundBooking = this.props.bookings.find(b => b.id === id)
    }
    return foundBooking
  }

  componentDidMount(){
    let booking = this.gettingBooking()
    
    this.setState({ 
      id: booking.id,
      account: booking.account.name,
      special_notes: booking.special_notes,
      date: booking.booking_date,
      pick_up_time: booking.booking_time
    });
    this.props.getAccounts()
  }

  accountNameOptions = () => {
    let newArray = [...this.props.accounts]
    return newArray.map((account) => (<option key={account.id} value={account.id}>{account.name}</option>))
  }

  clickHandler = () => {
    this.props.routerProps.history.push('/dispatch-grid')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log("submitting")
    e.preventDefault();
    this.props.editBooking(this.state)
    this.props.routerProps.history.push('/dispatch-grid')
  }


  render() {
    console.log(this.state)
    return (
    <div className="form-wrapper">
  
          <h1>Edit Booking Form for Booking Number {this.gettingBooking().id}</h1>
          <form onSubmit={this.handleSubmit} >
            <label>
              Select Account:
              <select value={this.state.account} onChange={this.handleChange} name="account">
                {this.accountNameOptions()}
              </select>
            </label>
            <br/> <br/>
            Pick Up Date: 
            <input type="date" value={this.state.date} name='date' onChange={this.handleChange}/>
            <br/> <br/>
            Pick Up Time: 
            <input type="time" value={this.state.pick_up_time} name='pick_up_time' onChange={this.handleChange}/>
            <br/> <br/>
            Passengers: 
            <input type="text" value={this.state.passenger_name} name='passenger_name' onChange={this.handleChange}/>
            <br/> <br/>
            Passengers Cell Number: 
            <input type="number" value={this.state.passenger_number} name='passenger_number' onChange={this.handleChange}/>
            <br/> <br/>
            Vehicle Type:  
            <input type="text" value={this.state.vehicle_type} name='vehicle_type' onChange={this.handleChange}/>
            <br/> <br/>
            Pick Up Address:  
            <input type="text" value={this.state.pick_up_address} name='pick_up_address' onChange={this.handleChange}/>
            <br/> <br/>
            Drop Off Address:  
            <input type="text" value={this.state.drop_off_address} name='drop_off_address' onChange={this.handleChange}/>
            <br/> <br/>
            Special Notes:  
            <textarea rows="5" cols="28" value={this.state.special_notes} name='special_notes' onChange={this.handleChange}/>
            <br/> <br/>
            Internal Notes:  
            <textarea rows="5" cols="28" value={this.state.internal_notes} name='internal_notes' onChange={this.handleChange}/>
            <br/> <br/>
            <button>Edit Booking</button>

          </form>
          <br/> <br/>
          
          <button onClick={this.clickHandler}>BACK</button>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return { 
    getAccounts: () => dispatch(fetchAccountsAction()),
    editBooking: (editedBookingObj) => dispatch(editBookingAction(editedBookingObj))
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings,
    accounts: state.accounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBookingForm)