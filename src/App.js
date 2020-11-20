import './App.css';
import React from 'react';
import Header from './components/Header'
import { connect } from 'react-redux'
import { fetchBookingsAction } from './redux/actions'
import DispatchGrid from './containers/DispatchGrid';
import Login from './components/Login'


class App extends React.Component {
  
  state = {
    currentDate: (new Date())
  }

  componentDidMount() {
    this.props.getState()
  }

  changeTime = (rubyTime) => {

  }

  dayChangeHandler = (dayNumber) => {
    if(dayNumber === 1 || -1){
      this.setState({ currentDate: (new Date(this.state.currentDate.setDate(this.state.currentDate.getDate() + dayNumber ))) })
    } else {
      // this.setState({ currentDate: (new Date())})
    }
    
  }


  render () {
    console.log(this.props)
    return (
      <>
      <Login />
      <Header dayChangeHandler={this.dayChangeHandler}/>
      <DispatchGrid dayChange={this.state.currentDate}/>
  
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { getState: () => dispatch(fetchBookingsAction()) }
}



export default connect(null, mapDispatchToProps)(App)

