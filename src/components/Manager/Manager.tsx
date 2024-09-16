import React, { useRef } from 'react'
import Layout from '../Layout/Layout'
import Dashboard from '../Dashboard/Dashboard'
import { useEmployeeContext } from '../context/EmployeeContext';
import MarkAttendance from '../MarkAttendance/MarkAttendance';
import ViewAttendance from '../ViewAttendance/ViewAttendance';
import ApproveAttendance from '../ApproveAttendance/ApproveAttendance';
import EmployeeSelector from '../EmployeeSelector/EmployeeSelector';
import { EmployeeInterface } from '../../utils/Interface';
import { da } from 'date-fns/locale';

const Manager = () => {
  const menuItems = [
    { label: 'Dashboard', onClick: () => <Dashboard /> },
    { label: 'Mark Attendance', onClick: () => <MarkAttendance /> },
    { label: 'View Attendance', onClick: () => <ViewAttendance heading='Attendance Records' render={renderNode}/> },
    { label: 'Approve Attendance', onClick: () => <EmployeeSelector managerEmployees={employee!.manageEmployees!}  /> },
  ];

 
  const {employee} = useEmployeeContext()
  const renderNode = () => {
    return <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Approved</th>
        </tr>
      </thead>
      <tbody>
        {employee?.attendances.map((record, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{record.date}</td>
            <td>{record.status}</td>
            <td><span className={`badge ${record.isApproved ? 'bg-success' : 'bg-warning'}`}>
              {record.isApproved ? 'Approved' : 'Pending'}
            </span></td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  {console.warn(employee)}
 
  return (
    <Layout menuItems={menuItems} element={<Dashboard/>}/>
  )
}

export default Manager