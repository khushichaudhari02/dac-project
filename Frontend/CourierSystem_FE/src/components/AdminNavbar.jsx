// import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/image/logo.png';

function AdminNavbar() {
  const navigate = useNavigate()

  // // get wishlist item count
  // const wishlistItemCount = useSelector((store) => {
  //   return store.wishlist.itemCount
  // })

  const onLogout = () => {
    // remove the token
    sessionStorage.removeItem('token')

    // redirect to login page
    navigate('/login')
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light custom-navbar  " data-bs-theme='dark'>
      <div className="container-fluid">
          
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '10px' }} />
            <span className="fw-bold brand-text" style={{ fontSize: '30px' }}>ParcelPilot</span>
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
                  className='nav-link nav-dark-blue'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/orders' className='nav-link nav-dark-blue'>
                  Orders
                </Link>
              </li>
              
              <li className='nav-item'>
                <Link to='/admin/warehouses' className='nav-link nav-dark-blue'>
                  Warehouse
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/track-order' className='nav-link nav-dark-blue'>
                  Track Order
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/price-cal' className='nav-link nav-dark-blue'>
                  Price Estimation
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/admin/profile' className='nav-link nav-dark-blue'>
                  Profile
                </Link>
              </li>
              
              </ul>

              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">View notifications</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>

        {/* <!-- Profile dropdown --> */}
        <div class="relative ml-3">
          <div>
            <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="size-8 rounded-full" src="" alt="" />
            </button>
          </div>

          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
          <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            {/* <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" --> */}
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
      </nav>

      <style>
        {`
          .custom-navbar {
            background-color: rgb(175, 196, 249) !important;
            height: 100px;
          }

          .brand-text {
            font-size: 30px;
            color: #003366;
          } 

          .navbar-nav {
              display: flex;
              justify-content: flex-end;
            }

            .nav-dark-blue {
            color: #003366 !important; /* Dark Blue */
            font-weight: bold;
          }

          .nav-dark-blue:hover {
            color: #002244 !important; /* Slightly darker shade on hover */
          }
        `}
      </style>
    </div>
  )
}

export default AdminNavbar;
