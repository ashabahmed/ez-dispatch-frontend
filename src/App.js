import './App.css';
import React from 'react';
import Header from './components/Header'
import { connect } from 'react-redux'
import { fetchBookingsAction, fetchDriversAction, fetchDispatchersAction, fetchVehiclesAction } from './redux/actions'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './components/Login'
import AddBookingForm from './components/AddBookingForm'


class App extends React.Component {
  
  state = {
    currentDate: new Date()
  }

  componentDidMount() {
    this.props.getBookings()
    this.props.getDrivers()
    this.props.getDispatchers()
    this.props.getVehicles()
  }


  dayChangeHandler = (dayNumber) => {
    if(dayNumber === 1 || dayNumber === -1) {
      this.setState({ currentDate: (new Date(this.state.currentDate.setDate(this.state.currentDate.getDate() + dayNumber )))})
    } else {
      this.setState({ currentDate: new Date() })
    }
  }


  render () {
    
    return (
      <>
      <BrowserRouter>
        <Switch> 
          <Route path='/add-booking' render={ routerProps =>  <AddBookingForm routerProps={routerProps}/> } />
          <Route path='/dispatch-grid' render={ 
            routerProps =>  <Header dayChangeHandler={this.dayChangeHandler } currentDate={this.state.currentDate} routerProps={routerProps}/> 
            } />
          <Route path='/' render={ routerProps =>  <Login routerProps={routerProps}/> } />
        </Switch>
      </BrowserRouter>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    getBookings: () => dispatch(fetchBookingsAction()),
    getDrivers: () => dispatch(fetchDriversAction()),
    getDispatchers: () => dispatch(fetchDispatchersAction()),
    getVehicles: () => dispatch(fetchVehiclesAction()) 
    
  }
}



export default connect(null, mapDispatchToProps)(App)

