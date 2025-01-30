import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function AdminNavbar() {
  const navigate = useNavigate()

  // get wishlist item count
  const wishlistItemCount = useSelector((store) => {
    return store.wishlist.itemCount
  })

  const onLogout = () => {
    // remove the token
    sessionStorage.removeItem('token')

    // redirect to login page
    navigate('/login')
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/todo-item-list'>
          ParcelPilot
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  to='/admin/home'
                  className='nav-link'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/orders' className='nav-link'>
                  Orders
                </Link>
              </li>
              
              <li className='nav-item'>
                <Link to='/admin/warehouses' className='nav-link'>
                  Warehouse
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/track-order' className='nav-link'>
                  Track Order
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/price-cal' className='nav-link'>
                  Price Estimation
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              
              <li className='nav-item'>
                <button onClick={onLogout} className='nav-link'>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavbar;
