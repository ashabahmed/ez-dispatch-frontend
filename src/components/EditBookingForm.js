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

  // gettingBooking = () => {
  //   let id = parseInt(this.props.routerProps.match.params.id)
  //   let foundBooking
  //   if (this.props.bookings.length > 0 ) {
  //     foundBooking = this.props.bookings.find(b => b.id === id)
  //   }
  //   return foundBooking
  // }

  componentDidMount(){
    let booking = this.props.booking
    
    this.setState({ 
      id: booking.id,
      account: booking.account.id,
      special_notes: booking.special_notes,
      date: booking.booking_datetime,
      passenger_name: booking.passenger_name,
      passenger_number: booking.account.number,
      vehicle_type: booking.vehicle_type,
      pick_up_address: booking.pick_up_address,
      drop_off_address: booking.drop_off_address,
      internal_notes: booking.internal_notes
      
    });
    this.props.getAccounts()
  }

  
  accountNameOptions = () => {
    let newArray = [...this.props.accounts]
    return newArray.map((account) => (<option key={account.id} value={account.id}>{account.name}</option>))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log("submitting")
    e.preventDefault();
    this.props.editBooking(this.state)
    this.props.closePopUp()
  }

  render() {
    return (
      <>
      <div className='modal-mask' onClick={() => {this.props.closePopUp()}}>
      </div> 
        <div style={{textAlign: "center"}} className="modal-thing">
          <h1>Edit Booking Number {this.props.booking.id}</h1>
          <form className="editBookingForm" onSubmit={this.handleSubmit} >
            
          <label> Select Account</label>
              <select value={this.state.account} onChange={this.handleChange} name="account">
                {this.accountNameOptions()}
              </select>
            <br/> <br/>
            <label>Scheduled Pick-up</label> 
            <input type="datetime-local" value={this.state.date} name='date' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Passengers</label> 
            <input type="text" value={this.state.passenger_name} name='passenger_name' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Passengers Cell Number</label> 
            <input type="text" value={this.state.passenger_number} name='passenger_number' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Vehicle Type</label>  
            <input type="text" value={this.state.vehicle_type} name='vehicle_type' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Pick Up Address</label>  
            <input type="text" value={this.state.pick_up_address} name='pick_up_address' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Drop Off Address</label> 
            <input type="text" value={this.state.drop_off_address} name='drop_off_address' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Special Notes</label>  
            <textarea rows="4" cols="28" value={this.state.special_notes} name='special_notes' onChange={this.handleChange}/>
            <br/> <br/>
            <label>Internal Notes</label> 
            <textarea rows="4" cols="28" value={this.state.internal_notes} name='internal_notes' onChange={this.handleChange}/>
            <br/> <br/>
            <button className="button1">Update Booking</button>
          </form>
          <br/> <br/>
        </div>
        </>
    
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