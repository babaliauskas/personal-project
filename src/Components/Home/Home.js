import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import dino1 from '../../img/1.png';
import dino2 from '../../img/2.png';
import dino16 from '../../img/16.png';
import dino4 from '../../img/4.png';
import dino5 from '../../img/5.png';
import dino8 from '../../img/8.png';
import dino18 from '../../img/18.png';
import dino17 from '../../img/17.png';
import egg from '../../img/10.png';
import egg2 from '../../img/7.png';


export default class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            egg: true
        }
    }

    handleEgg = () => {
        this.setState ({ egg: !this.state.egg })
    }

    render(){
    return (
        <div className='home'>
            <Navigation/>
            <section className='images'>
                <Link to='/centrosaurus'><img className='dino1 img' src={dino1} alt="Centrosaurus" /></Link> 
                <Link to='/stegosaurus'><img className='dino2 img' src={dino2} alt="Stegosaurus"/> </Link>
                <Link to='/daspletosaurus'><img className='dino5 img' src={dino5} alt="Daspletosaurus"/> </Link>
                <Link to='/mamenchisaurus'><img className='dino8 img' src={dino8} alt="Mamenchisaurus"/> </Link>
                <Link to='/gargoyleosaurus'><img className='dino4 img' src={dino4} alt="Gargoyleosaurus"/> </Link>
                <Link to='/allosaurus'><img className='dino16 img' src={dino16} alt="Allosaurus"/> </Link>
                <Link to='/anchiceratops'><img className='dino17 img' src={dino17} alt="Anchiceratops"/> </Link>
                <Link to='/minmi'><img className='dino18 img' src={dino18} alt="Minmi"/> </Link>
                <img onClick={this.handleEgg} className={this.state.egg ? 'egg' : 'egg-none'} src={egg} alt=""/>
                <img className={this.state.egg ? 'egg2' : 'egg2-show'} src={egg2} alt=""/>
            </section>
        </div>
    )
}
}
