import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function WarehouseNavbar() {
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
           Courier Service Management
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
                  to='/warehouse/home'
                  className='nav-link'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/warehouse/Delivery-Agent' className='nav-link'>
                 Delivery Agent
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link to='/wishlist' className='nav-link'>
                  Wishlist ({wishlistItemCount})
                </Link>
              </li> */}
              <li className='nav-item'>
                <Link to='/warehouse/manage-delivery' className='nav-link'>
                  Manage Deliveries
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/warehouse/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link to='/change-password' className='nav-link'>
                  Change Password
                </Link>
              </li> */}
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

export default WarehouseNavbar
