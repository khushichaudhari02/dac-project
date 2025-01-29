import { Link } from 'react-router-dom'
import { getTodoItemList } from '../services/todo'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../slices/wishlistSlice'
import { formatDate } from '../utils'

function TodoItemList() {
  const [items, setItems] = useState([])

  // get dispatcher to dispatch an action
  const dispatch = useDispatch()

  const onLoadItems = async () => {
    const result = await getTodoItemList()
    if (result['status'] == 'success') {
      setItems(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    // the function (1st param) will be called as soon as
    // the component gets mounted (loaded)
    console.log('component is mounted...')
    onLoadItems()

    return () => {
      // this function will get called when the component
      // gets unmounted (unloaded)
      console.log('component is unmounted...')
    }
  }, [])

  const onAddItemToWishlist = (id) => {
    dispatch(addToWishlist())
  }

  return (
    <div>
      <Navbar />

      <div className='container'>
        <h2 className='heading'>Todo Item List</h2>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Details</th>
              <th>Date</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item['title']}</td>
                  <td>{item['details']}</td>
                  <td>{formatDate(item['createdTimestamp'])}</td>
                  <td>
                    {item['firstName']} {item['lastName']}
                  </td>
                  <td>
                    <button
                      onClick={onAddItemToWishlist}
                      className='btn btn-success btn-sm'
                    >
                      Add to Wishlist
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodoItemList
