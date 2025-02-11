import { useState } from 'react';
import { login } from '../services/user';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from './NavBars/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // get navigate function reference
  const navigate = useNavigate();

  const onLogin = async () => {
    // client side validation
    if (email.length === 0) {
      toast.warning('Please enter email');
    } else if (password.length === 0) {
      toast.warning('Please enter password');
    } else {
      // call the login api and get the result
      const result = await login(email, password);
      console.log(result);
      // check if the result is successful
      if (result.data && result.data.status === 'success') {
        
        // read the token from data
        const token = result.data.token;

        // cache user token
        sessionStorage.setItem('token', token);

        // decode the token to get the user role
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        sessionStorage.setItem('userId',decodedToken.user_id)
        const userRole = decodedToken.authorities; // Adjust this according to your token structure
        
        toast.success('Welcome to the application');

        // redirect based on user role
        if (userRole=== 'ROLE_ADMIN') {
          navigate('/admin/orders');
        } else if (userRole === 'ROLE_CUSTOMER') {
          navigate('/customer/home');
        } else if (userRole === 'ROLE_DELIVERY_AGENT') {
          navigate('/delivery/profile');
        } else if (userRole === 'ROLE_WAREHOUSE_MANAGER') {
          navigate('/warehouse/manage-delivery');
        } else {
          toast.error('Unknown user role');
        }
      } else if(result.error.status==403){
        toast.error("Invalid Email or Password");
      }else{
        toast.error("Login Failed")
      }
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <h2 className='heading'>Login</h2>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <div>
              Don't have an account? <Link to='/register'>Register here</Link>
            </div>
            <div>
              Forgot password?{' '}
              <button className='btn btn-link'>Reset here.</button>
            </div>
            <button onClick={onLogin} className='btn btn-success mt-3'>
              Login
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default Login;
