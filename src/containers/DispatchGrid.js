import React from 'react'
import { connect } from 'react-redux'
import BookingRow from '../components/BookingRow'
// import BookingDetailPage from '../components/BookingDetailPage'

class DispatchGrid extends React.Component {

  state = {
    filtered: "Booked",
    searchValue: ""
  }
  
  bookingsbyDay = (currentDate) => {
    if(currentDate === undefined){
    } else {
      let changeThese = [...this.props.bookings]

      let todaysBookings = changeThese.filter(booking => booking.date === currentDate.toDateString())
      const sorted = todaysBookings.sort((a, b) => a.booking_datetime < b.booking_datetime ? 1 : -1)
      return sorted
    }
  }

  renderBookings = () => {
    let filteredBookings = this.bookingsbyDay(this.props.currentDate)
    if (this.state.filtered === "All"){
    } else if (this.state.filtered === "Booked") {
      filteredBookings = filteredBookings.filter(booking => ["Booked", "Picked Up", "En Route"].includes(booking.trip_status))
    } else {
      filteredBookings = filteredBookings.filter(booking => booking.trip_status === this.state.filtered)
    }
    return filteredBookings
  }

  handleSearchFilterRender = (masterBookings, searchText) => {
    if (searchText === ""){
      return masterBookings
    } else {
      let searchArray = searchText.split(",").map(e=> e.trim()).filter( e => e !=="")
      return masterBookings.filter(booking => {
        return searchArray.includes(`${booking.id}`) || 
        searchArray.some( term => `${booking.account.name.toLowerCase()}`.includes(term)) ||
        searchArray.some( term => `${booking.driver && booking.driver.name.toLowerCase()}`.includes(term))
      })
    }
  }

  mainBookingsRender = () => {
    let masterBookings = this.renderBookings()
    let searchText = this.state.searchValue.toLowerCase()
    let renderList = this.handleSearchFilterRender(masterBookings, searchText)

    masterBookings = renderList.sort((a,b) => a.date > b.date ? 1 : -1)
    return masterBookings.map((booking) => <BookingRow vehicles={this.props.vehicles} drivers={this.props.drivers} routerProps={this.props.routerProps} key={booking.id} booking={booking}/>)
  }

  searchHandler = (e) => {
    const search = e.target.value 
    this.setState({ searchValue: search })
  }

  updateFilter(type) {
    this.setState({ filtered: type })
  }

  render(){

    return(
      <>
        <div style={{ textAlign: "center" }}>
          <label >
            <strong>Filter:</strong>
            <select value={this.state.filtered} onChange={(e)=>this.updateFilter(e.target.value)}>
              <option value="Booked">Booked</option>
              <option value="Dropped">Dropped</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Picked Up">Picked Up</option>
              <option value="En Route">En Route</option>
              <option value="No Show">No Show</option>
              <option value="All">All</option>
            </select>
          </label>
          <div>
            <input value={this.state.searchValue} onChange={this.searchHandler}/>
          </div>
        </div>  
        <hr/>
        <div>
          <table style={{textAlign: "center"}}>
            <thead style={{textAlign: "center"}}>
            <tr>
              <th >
                Booking No.
              </th>
              <th>
                Vehicle Type
              </th>
              <th>
                Vehicle No.
              </th>
              <th>
                Account Name
              </th>
              <th>
                Scheduled Pick-up
              </th>
              <th>
                Status
              </th>
              <th>
                Passengers
              </th>
              <th>
                Driver
              </th>
              <th>
                Pick-up Point
              </th>
              <th>
                Drop-off Point
              </th>
              <th>
                Pick-up Time
              </th>
              <th>
                Drop-off Time
              </th>
              <th>
                Edit?
              </th>
            </tr>
            </thead>
            <tbody>{this.mainBookingsRender()}</tbody>
          </table>
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    bookings: state.bookings,
    drivers: state.drivers,
    dispatchers: state.dispatchers,
    vehicles: state.vehicles
  }
}

export default connect(mapStateToProps)(DispatchGrid)
