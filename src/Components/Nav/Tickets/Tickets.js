import React from 'react';
import Navigation from '../../Navigation/Navigation';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addTicket } from '../../../duck/reducer';
import StripeCheckout from 'react-stripe-checkout';
import 'react-datepicker/dist/react-datepicker.css';

class Tickets extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment(),
        days: 1,
        price: 850,
        name: '',
        lastname: '',
      };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }

    handleDays = val => {
        this.setState({ days: val, price: 850 * val })
    }

    handleTickets = (daypass, startingdate, price, name, lastname) => {
        let tickets = {daypass, startingdate, price, name, lastname}
        axios.post('/api/tickets', tickets)
        .then(response => {
            this.props.addTicket(response.data)
        })
        .catch(err => console.log('handle tickets: ', err))
    }

    onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', { token, amount: this.state.price } )
          .then( () => this.props.history.push('yourtickets'), this.handleTickets(this.state.days, this.state.startDate, this.state.price, this.state.name, this.state.lastname) ) 
          .catch(err => console.log(err));
    }

    handleName = val => {
        this.setState({ name: val })
    }
    
    handleLastName = val => {
        this.setState({ lastname: val })
    }

    render() {
        console.log(this.state.price)
        return (
          <div className='tickets'>
              <Navigation />
              <div className='buy-your'>
                  <h3 style={{ color: 'rgb(243, 155, 23)' }}>Buy Tickets</h3>
                  <Link to='/yourtickets'><h3>Your Tickets</h3></Link>
              </div>

            <div className='main-tickets'>
                <div className='day-pass' >
                    <input value={this.state.days} onChange={e => this.handleDays(e.target.value)} type="number"/>
                    <p>DAY PASS</p>
                </div>
                <div className='price-tickets'>
                    <p >PRICE ${this.state.days * 850}</p>
                </div>
                    <img className='img-tickets' src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/logo.png" alt=""/>
                <div className='date-picker'>
                    <p>STARTING DATE: </p>
                    <DatePicker
                        className='datepicker1'
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                </div>

                <div className='sponsor'>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/tesla.png" alt="tesla"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/mcdonalds.png" alt="mcdonalds"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/Starbucks.png" alt="starbucks"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/samsung.png" alt="samsung"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/cc.png" alt="cocacola"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/disney.png" alt="disney"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/GGLogo.png" alt="GGLogo"/>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/mms_racing.png" alt="M&M"/>
                </div>

                <div className='random-num'>
                   <input 
                        type="text"
                        placeholder='Name'
                        onChange={e => this.handleName(e.target.value)}
                        required
                        />
                    <input 
                        type="text"
                        placeholder='Last name'
                        onChange={ e => this.handleLastName(e.target.value)}
                        required/>
                </div>

                <div className='barcode'>
                    <img src="https://s3-us-west-1.amazonaws.com/l.babaliauskas/barcode.png" alt=""/>
                </div>
            </div>


            <div className='bybis'>
            <button className='tickets-button'>Place Your Order</button>
                <StripeCheckout
                    className='tickets-checkout'
                    token={this.onToken}
                    stripeKey='pk_test_FUhDsB3c5yQRnUKpgDSJRTQK'
                    amount={this.state.price * 100}
                />
            </div>
            


        </div>
      ) 
    }
}

  function mapStateToProps(state) {
      const { tickets } = state
      return {
          tickets
      }
  }

export default connect(mapStateToProps, {addTicket}) (Tickets)