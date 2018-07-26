import React from 'react';
import Navigation from '../../Navigation/Navigation';
import {Link} from 'react-router-dom';
import GargoyleosaurusImg from '../../../img/4.png';
import Next from '../../../img/next.png';
import MiniInfo from '../../MiniInfo/MiniInfo';

export default class Gargoyleosaurus extends React.Component {
    render(){
        return (
            <div className='miniinfo'>
            <Navigation />

       <section>
            <div className='miniinfo-div'>
                <div className='close'>
                    <Link to='/home'> <span> X </span> </Link>
                </div>

                <div className='miniinfo-name'>Gargoyleosaurus</div>

                <div className='miniinfo-info'>
                    <MiniInfo {...this.props}/>
                </div>

                <div className='miniinfo-btn'>
                    <img className='miniinfo-img' src={GargoyleosaurusImg} alt=""/>
                    <Link to='/info/gargoyleosaurus'><button>More Info</button></Link>
                </div>
            </div>
       </section>

       <section className='right'>
            <Link to='/mamenchisaurus'> <img className='next' src={Next} alt=""/>  </Link>
        </section>

        <section className='left'>
            <Link to='/daspletosaurus'> <img className='back' src={Next} alt=""/> </Link>
        </section>
    </div>
        )
    }
}