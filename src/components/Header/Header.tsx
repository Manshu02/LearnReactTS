import React from 'react'
import { useEmployeeContext } from '../context/EmployeeContext'
import { getRoles } from '../../utils/Interface'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { employee, setEmployee } = useEmployeeContext()
  const navigate = useNavigate()
  const logoutUser = () => {
    console.log("Logging Out")
    sessionStorage.clear()
    setEmployee(null)
    navigate("/")
  }
  return (
    <div className='header'>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">{employee ? `${getRoles(employee.role)} Portal` : 'Manage Attendance'}  </a>
          {employee && <button className="btn btn-outline-danger" onClick={logoutUser}>
            Logout
          </button>}
        </div>
      </nav>

    </div>
  )
}

export default Header
