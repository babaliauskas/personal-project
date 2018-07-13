import React from 'react';
import Navigation from '../../Navigation/Navigation'
import './Contact.css'
import dino19 from '../../../img/19.png'

function Contact() {
    return (
        <div className='contact'>
            <Navigation/>

            <div className='email-box'>
                <div>
                    <input className='contact-input' type="text" placeholder='Email'/>
                </div>
                <div>
                    <input className='contact-input' type="text" placeholder='Name'/>
                </div>
                <div>
                    <textarea name="text" id="" cols="30" rows="10" placeholder='Message'></textarea>
                </div>

                <div>
                    <button className='send'>
                        CONTACT US
                    </button>
                </div>
                    <img className='contact-img' src={dino19} alt=""/>

            </div>

        </div>
    )
}

export default Contact