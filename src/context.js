import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialSate = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate)

  const clearCat = () => {
    //declare  the action
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = id => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = id => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = id => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  useEffect(() => {
    console.log('hello')

    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCat,
        remove,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
