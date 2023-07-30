import CartItem from './CartItem'

export const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
    }
  }

  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })

    return { ...state, cart: tempCart }
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map(cartItem => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter(cartItem => cartItem.amount !== 0)

    //The Above is chaining Method to return item  if  it is  0

    return { ...state, cart: tempCart }
  }
  // this  is  the functionality to add  item  in the cart Array, and  the totals, reduce function  is used  here
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      //iterate over  the array,  get  the Cart total in the Array, and the cartItem
      (cartTotal, cartItem) => {
        console.log(cartTotal, cartItem)
        //from  cartItem, remove  the Amount and  price, by destructuring
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount

        // console.log(price, amount)
        return cartTotal
      },
      {
        total: 0,
        amount: 0
      }
    )
    total = parseFloat(total.toFixed(2)) // this would  limit the  floating  to 2 after Decimal  places

    return { ...state, total, amount }
  }

  return state
}
// switch (action.type) {
//   case 'ACTION_TYPE':
//     return
//   default:
//     return state
// }

export default reducer
