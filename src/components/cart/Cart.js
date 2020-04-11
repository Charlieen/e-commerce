import React, { Component } from 'react'
import Title from '../Title';
import {ProductConsumer} from '../../context';
import CartColumns from './CartColumns';
import CartEmpty from './EmptyCart';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    { value =>{
                        const {cart} = value;
                        if(cart.length>0){
                            return (
                               <React.Fragment>
                                <Title name="your" title="cart"/>   
                                <CartColumns/>
                                <CartList value={value}/>
                                <CartTotal value={value}/>
                               </React.Fragment>
                                
                                )
                        }else {
                            return (<EmptyCart/> )
                        }         
                    }
                    }
                </ProductConsumer>
            </section> 
        )
    }
}
