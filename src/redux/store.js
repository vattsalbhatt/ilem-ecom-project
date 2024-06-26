const { configureStore } = require('@reduxjs/toolkit')
import checkoutReducer from './features/checkout'

export const store = configureStore({
  reducer: {
    checkoutReducer: checkoutReducer,
  },
})
