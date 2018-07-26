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
                
                {/* <div>
                    <label for='name'>Name</label>
                    <input 
                        className='contact-input' 
                        placeholder='Name'
                        type="text"
                        name='name'
                        onChange={this.handleChange}
                        />
                </div>

                <div>
                    <label for='email'>Email</label>
                    <input 
                        className='contact-input' 
                        type="text"
                        placeholder='Email'
                        type='email'
                        name='email'
                        onChange={this.handleChange}
                        />
               </div>
               <div>
                    <textarea for='name'>Message</textarea>
                    <input
                        type='textarea'
                        name='message'
                        onChange={this.handleChange}
                        />
                </div>               

                <button className='send'>Submit</button> */}
            <div className='email-box'>
                <div>
                    <input 
                        className='contact-input' 
                        type="text" 
                        placeholder='Name' 
                        name='name' 
                        onChange={this.handleChange} 
                        value={this.state.name}/>
                </div>

                <div>
                    <input 
                        className='contact-input' 
                        type="text" 
                        placeholder='Email'
                        name='email' 
                        onChange={this.handleChange} 
                        value={this.state.email}/>
                </div>

                <div>
                    <textarea 
                        className='contact-text'
                        name="text" 
                        id="" 
                        cols="30" 
                        rows="10" 
                        placeholder='Message' 
                        name='message' 
                        onChange={this.handleChange} 
                        value={this.state.message}></textarea>
                </div>

                <div>
                    <button className='send'>
                        CONTACT US
                    </button>
                </div>
                    <img className='contact-img' src={dino19} alt=""/>

            </div>
            </form>     


        </div>
    )
}
}

