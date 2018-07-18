import React, {Component} from 'react';
import './FullInfo.css';
import Navigation from '../Navigation/Navigation'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class FullInfo extends Component {
    constructor(){
        super()
        this.state = {
            list: [],
            more: false,
        }
    }

    componentDidMount() {
        axios.get('/api/miniinfo').then(response => {
            this.setState({ list: response.data })
        })
    }

    dots = () => {
        this.setState({ more: !this.state.more })
    }

    render() {
        console.log(this.state.more)

        let dinosaur = this.state.list.filter(e => {
            // console.log('props.match.params: ', this.props.match.params)
            return e.name.toLowerCase() === this.props.match.params.id })

            let newDinosaur = dinosaur.map( (e,i) => {
            console.log(e.weight, e.food)
            return (
                <div key={i}>
                <div className='fullinfo-name'>
                    {e.name.toUpperCase()}
                </div>
                    <table className='fullinfo-table'>
                        <tr className='fullinfo-table-header' >
                            <th>Weight</th>
                            <th>Height</th>
                            <th>Food</th>
                            <th>Age</th>
                        </tr>
                        <tr className='td'>
                            <td>{e.weight} tons</td>
                            <td>{e.height} meters</td>
                            <td>{e.food}</td>
                            <td>{e.age} Mln Years Ago</td>
                        </tr>
                    </table>

                        <div  className='dots-info'>
                            <p>{e.info.substring(0, 200)}</p> <p onClick={this.dots} className='dots'>...</p>
                        </div>

                        <div className='boxx'>
                            <p className={this.state.more ? 'visible' : 'invisible'}>{e.info} <button className='fullinfo-back-back' onClick={this.dots}>Back </button></p>
                        </div>
                </div>

            )
        })
    return (
        <div className='fullinfo'>
           
            <Navigation />
        <section className='fullinfo-section'>
            <div className='close'>
                <Link to='/home'> <span> X </span> </Link>
            </div>

                        {newDinosaur}

            <div className='fullinfo-button'>
                <Link to='/support'><button className='fullinfo-support'>Support </button></Link>
                <button onClick={() => this.props.history.goBack()} className='fullinfo-back'>Back </button>
            </div>
        </section> 
        </div>

    )
}
}