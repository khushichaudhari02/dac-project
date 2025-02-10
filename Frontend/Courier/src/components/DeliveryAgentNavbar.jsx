import { Link, useNavigate } from 'react-router-dom'

function DeliveryAgentNavbar() {
  const navigate = useNavigate()

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
                <Link to='/delivery/deliveries' className='nav-link'>
                   Deliveries
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/delivery/history' className='nav-link'>
                   History
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/delivery/profile' className='nav-link'>
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

export default DeliveryAgentNavbar;
