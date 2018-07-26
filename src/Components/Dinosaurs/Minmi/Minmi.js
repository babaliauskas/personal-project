import React from 'react';
import Navigation from '../../Navigation/Navigation';
import {Link} from 'react-router-dom';
import MinmiImg from '../../../img/18.png';
import Next from '../../../img/next.png';
import MiniInfo from '../../MiniInfo/MiniInfo';

export default class Minmi extends React.Component {
    render(){
        return (
            <div className='miniinfo'>
            <Navigation />

       <section>
            <div className='miniinfo-div'>
                <div className='close'>
                    <Link to='/home'> <span> X </span> </Link>
                </div>

                <div className='miniinfo-name'>Minmi</div>

                <div className='miniinfo-info'>
                    <MiniInfo {...this.props}/>
                </div>

                <div className='miniinfo-btn'>
                    <img className='miniinfo-img' src={MinmiImg} alt=""/>
                    <Link to='/info/minmi'><button>More Info</button></Link>
                </div>
            </div>
       </section>

       <section className='right'>
            <Link to='/stegosaurus'> <img className='next' src={Next} alt=""/>  </Link>
        </section>

        <section className='left'>
            <Link to='/mamenchisaurus'> <img className='back' src={Next} alt=""/> </Link>
        </section>
    </div>
        )
    }
}