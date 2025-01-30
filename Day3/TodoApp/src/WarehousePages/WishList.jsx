import { Link } from 'react-router-dom'
import { getTodoItemList } from '../services/todo'
import Navbar from '../components/AdminNavbar'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../slices/wishlistSlice'
import { formatDate } from '../utils'

function WishList() {
  return (
    <div>
      <Navbar />

      <div className='container'>
        <h2 className='heading'>WishList</h2>
        <h3>Please implement this functionality on your own.. :) :) :)</h3>
      </div>
    </div>
  )
}

export default WishList
