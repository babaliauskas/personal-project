import React, {Component} from 'react';
import axios from 'axios';
import './MiniInfo.css';


export default class MiniInfo extends Component {
    constructor(){
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        axios.get('/api/miniinfo').then(response => {
            this.setState({ list: response.data })
        })
    }

    render() {
            let dinosaur = this.state.list.filter(e => {
                // console.log('props.match.params: ', this.props.match.path.slice(1))
                return e.name.toLowerCase() === this.props.match.path.slice(1)})
            let newDinosaur = dinosaur.map( (e,i) => {
                return (
                    <div key={i}>
                        <p >
                            {e.miniinfo}
                        </p>
                    </div>
                )
            })
        return (
            <div className='cha'>
                {newDinosaur}          
            </div>
        )
    }
}

