import React from 'react'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.logIn(this.state, this.props.routerProps)

  //   this.setState({
  //     username: "",
  //     password: ""
  //   })
  // }

//html 5 browser and 

  clickHandler = () => {
    this.props.routerProps.history.push('/dispatch-grid')
  }

  render() {
    return (
      <div style={{textAlign: "center"}} >
        <hr/><br/><br/><br/>
        <div lassName="loginFormDiv">
        <form className="loginForm">
          <label  > <h2>Username</h2> </label>
            <input value={this.state.username} name="username" type="text" placeholder="username" onChange={this.handleChange}></input>
            <br/><br/><br/>
          <label ><h2>Password</h2> </label> 
            <input value={this.state.password} name="password" type="text" placeholder="password" onChange={this.handleChange}></input>
            <br/><br/><br/>
          <button className="button1" onClick={this.clickHandler}>Login</button>
        </form>
        </div>
      </div>
    )
  }
}

export default Login