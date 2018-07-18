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
            list:[]
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
                    <div key={product.id}>
                        <table className='cart-table'>
                            <tbody>
                                <tr>
                                    <td><img className='cart-img' src={product.img} alt=""/></td>
                                    <td> <h4>{product.price}</h4></td>

                                    <td><input defaultValue={product.quantity} type="number" onChange={(e)=> this.handleQuant(product.id, e.target.value)}/></td> 

                                    <td><button onClick={() => this.handleDeleteItem(product.id, product.cart_id)}>REMOVE</button></td>
                                    <td> <p>{product.price * product.quantity}</p> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
        })

        return (
            <div>
            <Navigation/>

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
                <h3 className='cart-have'>You Have Something</h3>
            <div className='cart-div-table'> 
                <table className='cart-table'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                </table>
                {list}
            </div>
            </div>
                :
            <h1>Your cart is empty!</h1>
            }
        
            <h3>Total: {summm}</h3>
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