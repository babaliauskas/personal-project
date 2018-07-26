import React from 'react';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';
import {deleteItem, getCart, total, quantity, empty} from '../../../duck/reducer';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Money from '../../../img/money2.png';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2';


class Cart extends React.Component {
    constructor(){
        super()
        this.state = {
            list:[],
            show: false,
            price: 0
        }
        this.onToken = this.onToken.bind(this);
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
        axios.put(`/api/cart/${id}/${quantity}`)
        .then(response => {
            this.props.quantity(response.data)
        }).catch(err => console.log('Quantity', err))
    }

    handleCheckout = (price) => {
        this.setState({ show: !this.state.show, price })
        console.log(this.state.show)
    }


    onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', { token, amount: this.state.price } ).then(response => { 
            const toast = swal.mixin({
                toast: true,
                position: 'center',
                heightAuto: false,
                showConfirmButton: false,
                background: 'rgb(82, 194, 8)',
                imageUrl: 'http://www.stickpng.com/assets/images/589701f9cba9841eabab6105.png',
                timer: 3000
              });
              
              toast({
                type: 'success',
                title: 'Item added!'
              })
          }).then( () => this.props.history.push('store') );

        axios.delete('/api/cart')
        .then(response => { 
            this.props.empty(response.data)
        })
        .catch(err => console.log(err));
      }
      


        render(){
            // console.log(this.props.cart)
            let sum = [];
            let total = this.props.cart.map( e =>{ return +e.price ? sum.push(+e.price * +e.quantity) : null })
            let summ = sum.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)
            let summm = summ.toFixed(2);


            let list = this.props.cart.map( (product, i) => {
                
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

            <div className='cart-div-hide'>

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
                        <button onClick={()=>this.handleCheckout(summm * 0.8)} >Checkout</button>
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

            <div className={!this.state.show ? 'order' : 'order-2'}>
                <div className='proceed-div'>
                    <img src={Money} alt=""/>
                    <h3 className='cart-back' onClick={this.handleCheckout}>X</h3>
                    <div className='proceed-div-2'> 
                        <h4>Original Price</h4>
                        <h3>{summm}</h3>
                        <h4>Discount</h4>
                        <h3>{(summm * 0.2).toFixed(2)}</h3>
                        <h4>Final Price</h4>
                        <h2>{(summm * 0.8).toFixed(2)}</h2>
                        <button>Place Order</button>
                    
                        <div className='stripe'>
                            <StripeCheckout
                                token={this.onToken}
                                stripeKey='pk_test_FUhDsB3c5yQRnUKpgDSJRTQK'
                                amount={(summm * 0.8) * 100}
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className={this.state.show ? 'cover-cart' : 'cover-cart-2'}></div>\
            
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
    quantity,
    empty
}

export default connect(mapStateToProps, actions) (Cart)
