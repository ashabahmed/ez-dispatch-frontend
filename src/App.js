import './App.css';
import React from 'react';
import Header from './components/Header'
import { connect } from 'react-redux'
import { fetchBookingsAction } from './redux/actions'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './components/Login'
import AddBookingForm from './components/AddBookingForm'

class App extends React.Component {
  
  state = {
    currentDate: new Date()
  }

  componentDidMount() {
    this.props.getState()
  }

  changeTime = (rubyTime) => {

  }

  dayChangeHandler = (dayNumber) => {
    console.log(dayNumber)
    if(dayNumber === 1 || dayNumber === -1) {
      console.log("testest")
      this.setState({ currentDate: (new Date(this.state.currentDate.setDate(this.state.currentDate.getDate() + dayNumber ))) })
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
          <Route path='/header' render={ routerProps =>  <Header dayChangeHandler={this.dayChangeHandler } currentDate={this.state.currentDate} routerProps={routerProps}/> } />
          <Route path='/' render={ routerProps =>  <Login routerProps={routerProps}/> } />
        </Switch>
      </BrowserRouter>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { getState: () => dispatch(fetchBookingsAction()) }
}



export default connect(null, mapDispatchToProps)(App)

