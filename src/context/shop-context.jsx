import React, { createContext, useState } from 'react'
import PRODUCTS from '../Products'

export const ShopContext=createContext(null)

const getDefaultCart=()=>{
  let cart={}
  for(let i=1;i<PRODUCTS.length+1;i++){
    cart[i]=0
  }
  return cart
}

const ShopContextProvider = (props) => {
  const[cartItems,SetCartItems]=useState(getDefaultCart())

  const getTotalCartAmount=()=>{
    let totalAmount=0
    //Below is how to loop through an object rather than array
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo=PRODUCTS.find((product)=>product.id===Number(item))
        totalAmount+=cartItems[item]*itemInfo.price
      }
    }
    return totalAmount
  }

  const addToCart=(itemId)=>{
SetCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
  }
  const removeFromCart=(itemId)=>{
SetCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  const updateCartItemAmount=(newAmount,itemId)=>{
    SetCartItems((prev)=>({...prev,[itemId]:newAmount}))

  }
const contextValue={cartItems,addToCart,removeFromCart,updateCartItemAmount,getTotalCartAmount}

  return (
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  )
}

export default ShopContextProvider
