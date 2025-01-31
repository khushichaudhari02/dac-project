import { useState } from 'react'
import WarehouseNavbar from '../components/warehouseNavbar'
import { toast } from 'react-toastify'
import { createTodoItem } from '../services/todo'
import { useNavigate } from 'react-router-dom'

function AddItem() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const navigate = useNavigate()

  const onAdd = async () => {
    if (title.length == 0) {
      toast.warning('Please enter title')
    } else if (details.length == 0) {
      toast.warning('Please enter details')
    } else {
      const result = await createTodoItem(title, details)
      if (result['status'] == 'success') {
        toast.success('Successfully added a new item')

        // redirect to my items
        navigate('/my-items')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <div>
      <h2 className='heading'>Register</h2>

      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>First Name</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Last Name</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Phone Number</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type='password'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div>
                Already have an account? <Link to='/login'>Login here</Link>
              </div>
              <button onClick={onRegister} className='btn btn-success mt-2'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  )
}



export default AddItem
