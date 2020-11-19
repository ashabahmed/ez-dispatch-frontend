import './App.css';
import React from 'react';
import Header from './components/Header'
import { connect } from 'react-redux'
import { fetchAction } from './redux/actions'
import DispatchGrid from './containers/DispatchGrid';



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

    this.setState({ currentDate: (new Date(this.state.currentDate.setDate(this.state.currentDate.getDate() + dayNumber ))) })
  }


  render () {
    console.log(this.state.currentDate)
    return (
      <>
      <Header dayChangeHandler={this.dayChangeHandler}/>
      <DispatchGrid dayChange={this.state.currentDate}/>
  
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { getState: () => dispatch(fetchAction()) }
}

export default connect(null, mapDispatchToProps)(App)

