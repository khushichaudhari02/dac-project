import Home from './components/Home'
import Login from './WarehousePages/Login'
import Register from './WarehousePages/Register'
import Footer from './components/Footer'
import AboutUs from './components/FooterContent/Aboutus'
import ContactUs from './components/FooterContent/ContactUs'


import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import TodoItemList from './WarehousePages/TodoItemList'
import { Route, Routes } from 'react-router-dom'
// import MyItems from './WarehousePages/MyItems'
import Profile from './WarehousePages/Profile'
// import AddItem from './WarehousePages/AddItem'
import ChangePassword from './WarehousePages/ChagnePassword'
// import WishList from './WarehousePages/WishList'
import DeliveryAgents from './WarehousePages/DeliveryAgent'
import ManageDeliveries from './WarehousePages/manageDelivery'
import ParcelOrderForm from './CustomerPages/PlaceOrder'
import CustomerCalPrice from './CustomerPages/price'
import CustomerTrackParcle from './CustomerPages/tracking'
import CustomerProfile from './CustomerPages/profile'
import AllOrders from './AdminPages/AllOrders'
import AdminTrackParcle from './AdminPages/tracking'
import AdminCalPrice from './AdminPages/price'
import AllWareHouses from './AdminPages/AllWareHouses'
import AdminDashboard from './AdminPages/AdminDashboard'
import AdminProfile from './AdminPages/profile'
import DeliveryDashboard from './DeliveryAgent/deliveries'
import DeliveryHistory from './DeliveryAgent/history'
import DeliveryProfile from './DeliveryAgent/profile'
import UserRegister from './WarehousePages/UserRegistration'
import CustomerHistory from './CustomerPages/history'
import CustomerDashboard from './CustomerPages/CustomerDashboard'

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        {/* Warehouse Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='warehouse/register' element={<Register />} />
        <Route path='ContactUs' element={<ContactUs />} />
        <Route path='AboutUs' element={<AboutUs />} />

        {/* <Route path='todo-item-list' element={<TodoItemList />} /> */}
        {/* <Route path='my-items' element={<MyItems />} /> */}
        <Route path='warehouse/profile' element={<Profile />} />
        {/* <Route path='add-item' element={<AddItem />} /> */}
        <Route path='change-password' element={<ChangePassword />} />
        {/* <Route path='wishlist' element={<WishList />} /> */}

        
        <Route path='warehouse/delivery-agent' element={<DeliveryAgents />} />
        <Route path='warehouse/manage-delivery' element={<ManageDeliveries />} />

        {/* Customer routes  */}
        <Route path='customer/home' element={<CustomerDashboard />} />
        <Route path='customer/place-order' element={<ParcelOrderForm />} />
        <Route path='customer/track-order' element={<CustomerTrackParcle />} />
        <Route path='customer/price-cal' element={<CustomerCalPrice />} />
        <Route path='customer/profile' element={<CustomerProfile />} />
        <Route path='customer/history' element={<CustomerHistory />} />

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

      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
