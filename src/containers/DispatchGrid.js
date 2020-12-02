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
    console.log(this.mainBookingsRender().length)
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
            <input placeholder="Search Booking" className="searchBar" value={this.state.searchValue} onChange={this.searchHandler}/>
          </div>
        </div>  
        <hr/>
        <div className="dispatchGrid" >
          <table style={{textAlign: "center"}}>
            <thead style={{textAlign: "center"}} className="sticky-column">
            <tr>
              <th className="sticky-column">Booking No.
              </th>
              <th className="sticky-column">
                Vehicle Type
              </th>
              <th className="sticky-column">
                Vehicle No.
              </th>
              <th className="sticky-column">
                Account Name
              </th>
              <th className="sticky-column">
                Scheduled Time
              </th>
              <th className="sticky-column">
                Status
              </th>
              <th className="sticky-column">
                Passengers
              </th>
              <th className="sticky-column">
                Driver
              </th>
              <th className="sticky-column">
                P/U Point
              </th>
              <th className="sticky-column">
                D/O Point
              </th>
              <th className="sticky-column">
                P/U Time
              </th>
              <th className="sticky-column">
                D/O Time
              </th>
              <th className="sticky-column">
                Notes
              </th>
              <th className="sticky-column">
                Edit/View
              </th>
            </tr>
            </thead>
            <tbody>{this.mainBookingsRender()}</tbody>
          </table>
        </div>
        <p style={{ textAlign: "center" }}> <b>Total Reservations: {this.mainBookingsRender().length}</b></p>
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
