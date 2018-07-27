import React from 'react';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class YourTickets extends React.Component {
    constructor(){
        super()
        this.state = {
            tickets: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/tickets')
        .then(response => {
            console.log(response.data)
            this.setState({ tickets: response.data })
        })
        .catch(err => console.log('Your Tickets: ', err))
    }

    render(){

        let tickets = this.state.tickets.map( (e,i) => {
            return (
                <div key={i}>
                <div className='main-tickets main-tickets2'>
                <div className='day-pass' >
                    <p> {e.daypass} DAY PASS</p>
                </div>
                <div className='price-tickets'>
                    <p >PRICE ${e.daypass * 850}</p>
                </div>
                    <img className='img-tickets' src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/logo.png" alt=""/>
                <div className='date-picker'>
                    <p>STARTING DATE: </p>
                    <h1> {e.startingdate.slice(0,10)}</h1>
                </div>

                <div className='sponsor'>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/tesla.png" alt="tesla"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/mcdonalds.png" alt="mcdonalds"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/Starbucks.png" alt="starbucks"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/samsung.png" alt="samsung"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/cc.png" alt="cocacola"/>
                </div>

                <div className='ticket-holder'>
                    <h2>Ticket Holder: </h2>
                    
                        <h1>{e.name} {e.lastname}</h1>
                    
                </div>

                <div className='barcode'>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/barcode.png" alt=""/>
                </div>
            </div>
                </div>
            )
        } )

        return(
            <div className='yourtickets'>
            <Navigation/>
            <div className='buy-your'>
                  <NavLink to='/tickets'><h3>Buy Tickets</h3></NavLink>
                  <h3 id='c'>Your Tickets</h3>
              </div>


                {tickets}
            </div>
        )
    }

}

export default YourTickets;