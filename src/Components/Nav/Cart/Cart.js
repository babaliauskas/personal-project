import React from 'react';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';
import {deleteItem, getCart, total, quantity} from '../../../duck/reducer';
import {connect} from 'react-redux';
import './Cart.css'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
    constructor(){
        super()
        this.state = {
            list:[],
            show: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/cartget').then(response => {
            this.props.getCart( response.data )
        }).catch(err => console.log(err))
    }

    handleDeleteItem = (id, cartId) => {
        axios.delete(`/api/cart/${id}/${cartId}`)
        .then(response => {
            this.props.deleteItem(response.data)
        }).catch(err => console.log(err))
    }

    handleQuant = (id, quantity) => {
        axios.post(`/api/cart/${id}/${quantity}`)
        .then(response => {
            this.props.quantity(response.data)
        }).catch(err => console.log('Quantity', err))
    }


        render(){
            let sum = [];
            let total = this.props.cart.map( e =>{ return +e.price ? sum.push(+e.price * +e.quantity) : null })
            let summ = sum.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)
            let summm = summ.toFixed(2);


            let list = this.props.cart.map( (product, i) => {
                console.log(product.quantity)
                
                return (
                    <div key={product.id} className='items' >
                        <img className='cart-img' src={product.img} alt=""/>
                        <h4>${ (product.price * 0.8).toFixed(2) }</h4>
                        <input className='cart-input' defaultValue={product.quantity} type="number" onChange={(e)=> this.handleQuant(product.id, e.target.value)}/> 
                        <h4 className='render-total' >${((product.price * product.quantity) * 0.8).toFixed(2)}</h4> 
                        <button className='cart-remove' onClick={() => this.handleDeleteItem(product.id, product.cart_id)}>REMOVE</button>
                    </div>
                )
            })
        return (
            <div className='cart'>
            <Navigation/>

            <div className='cart-div'>

            <div className='cart-top'>
                <h3>Here's What You're Getting!</h3>
                <div className='cart-more'>
                    <h3>Want Some More?</h3>
                    <Link to='/store'><h3 className='cart-continue'>Continue Shopping</h3></Link>
                </div>
            </div>

            <div className='line'></div>



            { list[0] 
                ?

            <div>
                <div className='cart-have'>
                    <h2>You Have Something!</h2>
                    <div className='cart-total'>
                        <h3>Total: ${(summm * 0.8).toFixed(2)}</h3>
                        <button>Proceed</button>
                    </div>
                </div>
            <div className='cart-head'> 
                <h3>Item</h3>
                <h3 className='price'>Price</h3>
                <h3 className='quantity'>Quantity</h3>
                <h3 className='total' >Total</h3>
            </div>
            <div className='line'></div>
            <div className='show-list'>
                {list}
            </div>
            </div>
                :
            <h1 className='cart-empty'>Your cart is empty!</h1>
            }
            </div>

            <div className='proceed-div'>
                
                </div>
        </div>
        )
    }
}



function mapStateToProps(state) {
    const {user, cart, total} = state
    return {
        user, cart, total, quantity
    }
}

const actions = {
    deleteItem,
    getCart,
    total,
    quantity
}

export default connect(mapStateToProps, actions) (Cart)