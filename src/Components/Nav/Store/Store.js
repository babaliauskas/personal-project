import React from 'react';
import Navigation from '../../Navigation/Navigation';
import './Store.css';
import axios from 'axios';
import {addItem} from '../../../duck/reducer'
import {connect} from 'react-redux'

class Store extends React.Component {
    constructor(){
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/store').then(response => {
            this.setState({ list: response.data })
        })
    }

    handleHats = () => {
        let item = this.selectedItem.value;
        axios.get(`/api/store/${item}`).then(response => {
            this.setState({ list: response.data})
        }).catch(err => console.log(err))
    }

    handleAddCart = (img, price) => {
        let bla = {img, price}
        axios.post('/api/cart', bla )
        .then(response => {
            this.props.addItem(response.data)
        }).catch(err => console.log(err))
    }


    render() {
        // let selected = this.state.selected;
        let newList = this.state.list.map( ( e,i ) => {
            return (
                <div key={i}>
                    <div className='store-display'>
                       <img className='store-img' src={e.img} alt="img"/>
                        <h4 className='store-price'>{e.price}$</h4>
                        <button onClick={() => this.handleAddCart(e.img, e.price)} className='store-btn'>Add to Cart</button>
                    </div>
                </div>
            )
        } )
        
        return (
        <div className='hm'>
            <Navigation/> 
            <div  className='store-main'>
                <div className='store-select'>
                    <select onChange={(e) => this.handleHats(e.target.value)} ref={selectedItem => {
          this.selectedItem = selectedItem
        }} name="" id="">
                        <option value="Filter">Filter</option>
                        <option value="all">All</option>
                        <option value="hat">Hats</option>
                        <option value="tshirt">Tshirts</option>
                        <option value="socks">Socks</option>
                        <option value="toy">Toys</option>
                        <option value="costume">Costumes</option>
                    </select>
                    {/* <button onClick={() =>this.handleHats('Hats')}>button</button> */}
                </div>
                <div className='store'>
                    {newList}   
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const {user, cart, total} = state
    return {
        user,
        cart,
        total
    }
}

const actions = {
    addItem,
}
 
export default connect(mapStateToProps, actions) (Store)
