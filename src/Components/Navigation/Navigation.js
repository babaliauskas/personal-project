import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Sunny from '../../img/sunny.png';
import Clouds from '../../img/clouds.png';
import Rain from '../../img/rain.png';


class Navigation extends Component {
  constructor(){
    super()

    this.state = {
      list: [],
      toggleNav: true,
      weather: false,
      days: ''
    }
  }

  dayOfWeek(dayNumber) {
    switch(dayNumber) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2: 
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
      case 8:
        return 'Monday';
      case 9: 
        return 'Tuesday';
      case 10:
        return 'Wednesday';
      case 11:
        return 'Thursday';
      case 12:
        return 'Friday';
      case 13:
        return 'Saturday';
      default:
        throw 'asdasdasdasdasdas';
    }
  }
  
  testDayOfWeek(index=0) {
    let d = new Date();
    let n = d.getDay();
    let dayName = this.dayOfWeek(n+index);
    return dayName;
  }




  toggleNav = () => {
    this.setState({
      toggleNav: !this.state.toggleNav
    })
  }

  toggleWeather = () => {
    this.setState({ weather: !this.state.weather })
  }

  getWeather = async (e) => {
    console.log(process.env.REACT_APP_WEATHER_API_KEY)
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,ES&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    const data = await api_call.json();
  
    this.testDayOfWeek();
    this.setState({list: data.list})
}



  render() {
    console.log(this.state.toggleNav)

    let neaw = this.state.list.filter( (e, i) => i===0 || i === 7 || i===15 || i===23 || i===31 || i===39)

    let weather = neaw.map( (e,i) => {
      let picture = ''
        { if (e.weather[0].main === 'Clouds')  {
          picture = Clouds
        } else if (e.weather[0].main === 'Rain') {
          picture = Rain
        } else {
          picture = Sunny
        }}
        let daysss = this.testDayOfWeek(i);
        return (
          <div key={i} >
            <h4 className='days'>{daysss}</h4>
            <img className='weather-image' src={picture} alt=""/>
            <h1 className='blaa'>{Math.round(e.main.temp - 273.15)} C</h1>
          </div>
        )
    })
    return (
      <div className="Navigation">
        <header>
          <nav>
              <div className='header-nav'>         
                <a className='header-menu' onClick={ ()=>this.toggleNav()}> 
                  <div className="header-menu-bars">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>  
                </a>
              </div>

          </nav>
        </header>

    <section>
      <div className={this.state.toggleNav ? 'show-nav mobile-nav' : 'mobile-nav'}>
        <div className='hidden-list'>    
            <ul>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/home' ><li>Home</li></NavLink>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/contact' ><li>Contact</li></NavLink>
                <li onClick={this.getWeather} className='navigation-weather' > <p onClick={ ()=>this.toggleWeather()}> Weather </p></li>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/store' ><li>Store</li></NavLink>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/tickets' ><li>Tickets</li></NavLink>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/cart' ><li>Cart</li></NavLink>
                <NavLink activeStyle={{ color: 'rgb(243, 155, 23)' }} to='/photo' ><li>Photo</li></NavLink>
                <a href={`${window.origin}/api/logout`} ><li>Logout</li></a>
            </ul>
        </div>
      </div>
    </section>

    <section className='weatherr' >
      <div className={this.state.weather ? 'nav-weather-list-show ' : 'no nav-weather-list-show'} >
          {weather}
      </div>
    </section>


      </div>
    );
  }
}

export default Navigation;
