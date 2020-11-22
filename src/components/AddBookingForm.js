import React from 'react'
import { connect } from 'react-redux';
import { createNewBookingAction, fetchAccountsAction } from '../redux/actions';

class AddBookingForm extends React.Component {

  state = {
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

  componentDidMount(){
    this.props.getAccounts()
  }

  clickHandler = () => {
    this.props.routerProps.history.push('/header')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log("submitting")
    e.preventDefault();
    this.props.submitHandler(this.state)
    this.props.routerProps.history.push('/header')
  }

  // filterAccountName = () => {
  //   let name= "Latasha Towne"
  //   let newArray = [...this.props.accounts]
  //   let filteredName = newArray.filter((account => {
  //     return account.name === name }))
  //   console.log(filteredName)
  //   if(filteredName[0].name === undefined){
  //     console.log("LOADING")
  //   } else {
  //     console.log(filteredName[0].name)
  //   }  
    
  // }

  render() {
    // console.log(this.filterAccountName())
    return (
    <div className="form-wrapper">
        <h1>Add Booking Form</h1>
          <form onSubmit={this.handleSubmit}>
            Account Name:
            <input type="text" value={this.state.account} name='account' onChange={this.handleChange}/>
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
            <input type="text" value={this.state.special_notes} name='special_notes' onChange={this.handleChange}/>
            <br/> <br/>
            Internal Notes:  
            <input type="textarea" value={this.state.internal_notes} name='internal_notes' onChange={this.handleChange}/>
            <br/> <br/>
            <button>Create New Booking</button>
          </form>
          <br/> <br/>
          {/* <h1>{this.filterAccountName()}</h1> */}
          <button onClick={this.clickHandler}>BACK</button>
    </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return { 
    submitHandler: (newBookingObj) => dispatch(createNewBookingAction(newBookingObj)),
    getAccounts: () => dispatch(fetchAccountsAction())
  }
}

function mapStateToProps(state){
  return {
    accounts: state.accounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookingForm)