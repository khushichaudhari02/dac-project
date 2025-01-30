import { createSlice } from '@reduxjs/toolkit'

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    itemCount: 0,
  },
  reducers: {
    addToWishlist: (state) => {
      state.itemCount += 1
    },
    removeFromWishlist: (state) => {
      state.itemCount -= 1
    },
  },
})

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions
export default WishlistSlice.reducer
