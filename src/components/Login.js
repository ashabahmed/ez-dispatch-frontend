import React from 'react'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.logIn(this.state, this.props.routerProps)

    this.setState({
      username: "",
      password: ""
    })
  }

  clickHandler = (e) => {
    e.preventDefault()
    this.props.routerProps.history.push('/header')
  }

  render() {
    
    return (
      <div className="form-wrapper">
      <form >
        <label className="username" >Username</label>
          <input value={this.state.username} name="username" type="text" placeholder="username" onChange={this.handleChange}></input>
          <br/>
        <label className="password" >Password</label>
          <input value={this.state.password} name="password" type="password" placeholder="password" onChange={this.handleChange}></input>
        <button onClick={this.clickHandler} type="submit">Login</button>
      </form>
    </div>
    )
  }

}

export default Login