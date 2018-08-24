import React from 'react';
import Navigation from '../../Navigation/Navigation'
import dino19 from '../../../img/19.png';
import axios from 'axios';

export default class Contact extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async handleSubmit (e) {
       e.preventDefault()
        await axios.post('/api/form', this.state )
        this.setState({
            name: '',
            email: '',
            message: '',
        })
    }


    render(){
    return (
        <div className='contact'>
            <Navigation/>


            <form onSubmit={this.handleSubmit}>
            <div className='email-box'>
            <div className='xa' >
                <div className='contact-input-div'>
                    <input 
                        className='contact-input' 
                        type="text" 
                        placeholder='Name' 
                        name='name' 
                        onChange={this.handleChange} 
                        value={this.state.name}/>
                </div>

                <div className='contact-input-div'>
                    <input 
                        className='contact-input' 
                        type="text" 
                        placeholder='Email'
                        name='email' 
                        onChange={this.handleChange} 
                        value={this.state.email}/>
                </div>

                <div className='contact-input-div'>
                    <textarea 
                        className='contact-text'
                        name="text" 
                        id="" 
                        placeholder='Message' 
                        name='message' 
                        onChange={this.handleChange} 
                        value={this.state.message}></textarea>
                </div>

                <div className='contact-input-div'>
                    <button className='send'>
                        CONTACT US
                    </button>
                </div>
                </div>
                    <img className='contact-img' src={dino19} alt=""/>

            </div>
            </form>     


        </div>
    )
}
}

