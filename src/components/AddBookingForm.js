import React from 'react'
import { connect } from 'react-redux';
import { createNewBookingAction, fetchAccountsAction } from '../redux/actions';

class AddBookingForm extends React.Component {

  state = {
    pickupDate: '',
    pickupTime: '',
    name: ""
  }

  componentDidMount(){
    this.props.getAccounts()
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
            Pick Up Date
            <input type="date" value={this.state.pickupDate} name='pickupDate' onChange={this.handleChange}/>
            <br/> <br/>
            Pick Up Time
            <input type="time" value={this.state.pickupTime} name='pickupTime' onChange={this.handleChange}/>
            <br/> <br/>
            Name
            <input type="textarea" value={this.state.name} name='name' onChange={this.handleChange}/>

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