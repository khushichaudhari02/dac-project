import { useState } from 'react';
import { login } from '../services/user';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // get navigate function reference
  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length === 0) {
      toast.warning("Please enter email");
    } else if (password.length === 0) {
      toast.warning("Please enter password");
    } else {
      const result = await login(email, password);
      console.log("Login API Response:", result); // Debugging
  
      if (result.status === "success" && result.data && result.data.token) {
        const token = result.data.token;
        console.log("Token received:", token);
  
        sessionStorage.setItem("token", token);
  
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
          const userRole = decodedToken.role;
  
          toast.success("Welcome to the application");
  
          if (userRole === "admin") {
            navigate("/admin/profile");
          } else if (userRole === "customer") {
            navigate("/customer/profile");
          } else if (userRole === "deliveryAgent") {
            navigate("/delivery/profile");
          } else if (userRole === "warehouseManager") {
            navigate("/warehouse/profile");
          } else {
            toast.error("Unknown user role");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Invalid token received");
        }
      } else {
        toast.error(result.error || "Login failed");
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
