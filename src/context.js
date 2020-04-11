import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

const taxRate = 0.15;

 class ProductProvider extends Component {
     state= {
      //    products:[...storeProducts],  also not work because ,in storeProducts, element is object 
        products:[],
         detailProduct:detailProduct,
         cart:[],
         modalOpen:false,
         modalProduct: detailProduct,
         cartSubTotal:0,
         cartTax:0,
         cartTotal:0
     }
     componentDidMount(){
         this.setProducts();
     }
     setProducts = ()=> {
         let products =[];
       //   storeProducts.forEach(product => products.push(product)); also not work , referent 
       storeProducts.forEach(product =>{
           products.push({
               ...product
           })
       })
         this.setState({products:products});
     }
    getItemById =(id)=>{
        const selectedItem = this.state.products.find(p=>p.id === id);
        return selectedItem;
        
    }

     handleDetail =(id)=>{
       const item = this.getItemById(id);

         this.setState({detailProduct:item});
     }
     addToCart=(id)=>{
        let item = this.getItemById(id);
       const updateProducts =  this.state.products.map(p=>{
           if(p.id === id){
               item.inCart = true;
               item.count =1;
               item.total = p.price;
               return {...p, inCart:true,count:1,total:p.price} 
           }else return p
       });

        this.setState({products:updateProducts,modalProduct:item});
       // debugger;
        const newCart = [...this.state.cart,{...item}];
        this.setState({cart:[...newCart]},()=>{
            this._updateTotal();
        });
    

     }
     openModal = id =>{
         const product = this.getItemById(id);
         this.setState({modalProduct:product,modalOpen:true});
     }

    closeModal = ()=>{
        this.setState({modalOpen:false,modalProduct:{}});
    }
    increment = (id)=>{
       const updateCart = this.state.cart.map(item=>{
            if(item.id === id){
                return {...item, count:item.count+1,total:item.price *(item.count+1)}
            }else return item;
        });
        this.setState({cart:[...updateCart]},()=>{
            this._updateTotal();
        })
        


    }
    decrement = (id)=>{
        const updateCart = this.state.cart.map(item=>{
            if(item.id === id){
                return {...item, count:item.count-1,total:item.price *(item.count-1)}
            }else return item;
        });
        this.setState({cart:[...updateCart]},()=>{
            this._updateTotal();
        }) ;
        
    }

    removeItem =(id)=>{
        debugger;
        const updateCart = this.state.cart.filter(item => item.id !== id); 

        const clearInCarts = this.state.products.map(item=>{
            if(item.id === id){
                return {...item,inCart:false,count:0,total:0}
            }else return item;
        });

        this.setState({cart:[...updateCart],products:clearInCarts},()=>{
            this._updateTotal();
        })
      
    }

    _updateTotal= ()=>{
        
        const cartSubTotal=this.state.cart.map(item=> item.count * item.price).reduce((x,y)=>x+y, 0);
        const cartTax = parseFloat((cartSubTotal * taxRate).toFixed(2)) ;
        const cartTotal= parseFloat((cartSubTotal *(1+ taxRate)).toFixed(2));

        this.setState({cartSubTotal,cartTax,cartTotal});
        // console.log('cartSubTotal,cartTax,cartTotal',cartSubTotal,cartTax,cartTotal);

    }

    clearCart =()=>{
        const clearInCarts = this.state.products.map(item=>{
            if(item.inCart){

                return {...item,inCart:false,count:0,total:0}
            }else return item;
        });
        this.setState({cart:[],products:clearInCarts});
    }
    
    render() {

        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail:this.handleDetail,
                addToCart: this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};

