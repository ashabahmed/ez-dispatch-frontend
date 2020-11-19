import React from 'react'


class Header extends React.Component {

  handleClick = (dateChange) => {
    this.props.dayChangeHandler(dateChange)
  }

  render(){
    return (
      <div style={{textAlign: "center"}}>
        <h1 >CHANGE DAYS</h1>
        <button onClick={() => {this.handleClick(-1)}}>Previous Day</button>
        <button onClick={() => {this.handleClick(+1)}}>Next Day</button>
      </div>
    )
  }
} 



export default Header