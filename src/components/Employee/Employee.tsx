import React, { useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import MarkAttendance from '../MarkAttendance/MarkAttendance'
import ViewAttendance from '../ViewAttendance/ViewAttendance'
import DetailsCard from '../Details/Details';
import Layout from '../Layout/Layout';
import { useEmployeeContext } from '../context/EmployeeContext';

const Employee: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', onClick: () => <Dashboard /> },
    { label: 'Mark Attendance', onClick: () => <MarkAttendance /> },
    { label: 'View Attendance', onClick: () => <ViewAttendance render={renderNode} heading='Attendance Records'/> },
  ];
  const { employee } = useEmployeeContext()
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
            <td><span className={`badge ${record.isApproved ? 'bg-success' : record.isRejected? 'bg-danger': 'bg-warning'}`}>
              {record.isApproved ? 'Approved' : record.isRejected? 'Rejected': 'Pending'}
            </span></td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  return (
    <>
      <Layout menuItems={menuItems} element={<Dashboard />} />
    </>

  );
};

export default Employee
