import Login from './components/Login'
import Register from './components/Register'

// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import TodoItemList from './WarehousePages/TodoItemList'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ContactUs from './components/FooterContent/ContactUs'
// import MyItems from './WarehousePages/MyItems'
import Profile from './WarehousePages/Profile'
// import AddItem from './WarehousePages/AddItem'
// import ChangePassword from './WarehousePages/ChangePassword'
// import WishList from './WarehousePages/WishList'
import DeliveryAgents from './WarehousePages/DeliveryAgent'
import ManageDeliveries from './WarehousePages/ManageDelivery'
import ParcelOrderForm from './CustomerPages/PlaceOrder'
import CustomerCalPrice from './CustomerPages/price'
import CustomerTrackParcle from './CustomerPages/tracking'
import CustomerProfile from './CustomerPages/profile'
import AllOrders from './AdminPages/AllOrders'
import AdminTrackParcle from './AdminPages/tracking'
import AdminCalPrice from './AdminPages/price'
import AllWareHouses from './AdminPages/AllWareHouses'
import AdminProfile from './AdminPages/profile'
import DeliveryDashboard from './DeliveryAgent/deliveries'
import DeliveryHistory from './DeliveryAgent/history'
import DeliveryProfile from './DeliveryAgent/profile'
import Footer from './components/Footer'
import AboutUs from './components/FooterContent/Aboutus'
import PricingPage from './Pricing/pricing'
import RegisterMain from './WarehousePages/RegisterMain'
import TrackingPage from './CustomerPages/tracking'
import AdminDashboard from './AdminPages/AdminDashboard'
import CustomerDashboard from './CustomerPages/CustomerDashboard'
// import CardComponent from './components/commonComponent/MainCardComponent'

import RegisterWarehouses from './WarehousePages/Register'
import LoginWarehouses from './WarehousePages/Login'

function App() {
  

  return (
    <div className='container-fluid'>
      <Routes>
        {/* Warehouse Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='ContactUs' element={<ContactUs />} />

        <Route path='warehouse/register' element={<RegisterWarehouses />} />
        <Route path='warehouse/login' element={<LoginWarehouses />} />
        <Route path='warehouse/profile' element={<Profile />} />
        <Route path='warehouse/delivery-agent' element={<DeliveryAgents />} />
        <Route path='warehouse/manage-delivery' element={<ManageDeliveries />} />

        {/* Customer routes  */}
        <Route path='customer/place-order' element={<ParcelOrderForm />} />
        <Route path='customer/track-order' element={<CustomerTrackParcle />} />
        <Route path='customer/price-cal' element={<CustomerCalPrice />} />
        <Route path='customer/profile' element={<CustomerProfile />} />
        <Route path='customer/home' element={<CustomerDashboard />} />

        {/* Admin Routes */}
        <Route path='admin/home' element={<AdminDashboard />} />
        <Route path='admin/orders' element={<AllOrders />} />
        <Route path='admin/warehouses' element={<AllWareHouses />} />
        <Route path='admin/track-order' element={<AdminTrackParcle />} />
        <Route path='admin/price-cal' element={<AdminCalPrice />} />
        <Route path='admin/profile' element={<AdminProfile />} />


        {/* Delivery Agent */}
        <Route path='delivery/deliveries' element={<DeliveryDashboard/>} />
        <Route path='delivery/history' element={<DeliveryHistory />} />
        <Route path='delivery/profile' element={<DeliveryProfile />} />
        <Route path='AboutUs' element={<AboutUs />} />

        <Route path='pricing' element={<PricingPage />} />
        <Route path='register' element={<RegisterMain/>} />
        <Route path="/track" element={<TrackingPage />} />


        
    
      </Routes>
      <div>
      <Footer/>

    </div>
    </div>
    
    
  )
}

export default App
