import Login from './WarehousePages/Login'
import Register from './WarehousePages/Register'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoItemList from './WarehousePages/TodoItemList'
import { Route, Routes } from 'react-router-dom'
import MyItems from './WarehousePages/MyItems'
import Profile from './WarehousePages/Profile'
import AddItem from './WarehousePages/AddItem'
import ChangePassword from './WarehousePages/ChagnePassword'
import WishList from './WarehousePages/WishList'
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
import AdminProfile from './AdminPages/profile'
import DeliveryDashboard from './DeliveryAgent/deliveries'
import DeliveryHistory from './DeliveryAgent/history'
import DeliveryProfile from './DeliveryAgent/profile'
import UserRegister from './WarehousePages/UserRegistration'

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        {/* Warehouse Routes */}
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='warehouse/register' element={<Register />} />
        <Route path='todo-item-list' element={<TodoItemList />} />
        <Route path='my-items' element={<MyItems />} />
        <Route path='warehouse/profile' element={<Profile />} />
        <Route path='add-item' element={<AddItem />} />
        <Route path='change-password' element={<ChangePassword />} />
        <Route path='wishlist' element={<WishList />} />
        <Route path='warehouse/delivery-agent' element={<DeliveryAgents />} />
        <Route path='warehouse/manage-delivery' element={<ManageDeliveries />} />

        {/* Customer routes  */}
        <Route path='customer/place-order' element={<ParcelOrderForm />} />
        <Route path='customer/track-order' element={<CustomerTrackParcle />} />
        <Route path='customer/price-cal' element={<CustomerCalPrice />} />
        <Route path='customer/profile' element={<CustomerProfile />} />

        {/* Admin Routes */}
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
    </div>
  )
}

export default App
