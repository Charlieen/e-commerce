import React from 'react';
import {Link} from 'react-router-dom';

export default function CartTotal({value}) {
   // console.log('value',value);
    const{cartTax,cartSubTotal,cartTotal,clearCart} = value;

    return (
        <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">  
                <Link to="/" >
                    <button className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                    onClick={()=>clearCart()}
                    type="button">
                        clear cart
                    </button>
                </Link>  
                <h5>
                <span className="text-title">subtotal: </span>
                 <strong> ${cartSubTotal}</strong>             
                </h5>
                <h5>
                <span className="text-title">tax: </span>
                 <strong> ${cartTax}</strong>             
                </h5>
                <h5>
                <span className="text-title">cartotal: </span>
                 <strong> ${cartTotal}</strong>             
                </h5>
                </div>
            </div>
            </div>
        </React.Fragment>
       
    )
}
