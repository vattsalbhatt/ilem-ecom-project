import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkoutObj: {
    products: [],
    total: 0,
    mrp: 0,
  },
  addedCartProducts: 0,
  fetchedProducts: [],
}

export const checkout = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutObj: (state, action) => {
      state.checkoutObj = { ...action.payload }
    },
    setAddedCartProducts: (state, action) => {
      state.addedCartProducts = action.payload
    },
    setFetchedProducts: (state, action) => {
      state.fetchedProducts = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCheckoutObj, setAddedCartProducts, setFetchedProducts } =
  checkout.actions

export default checkout.reducer
