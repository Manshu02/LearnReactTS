import React from 'react'

import { useEmployeeContext } from '../context/EmployeeContext';
import { Attendance } from '../../utils/Interface';
interface AttendanceProps {
  render: () => JSX.Element
  heading: string
}
const ViewAttendance: React.FC<AttendanceProps> = ({ render, heading }) => {
  const { employee } = useEmployeeContext();
  return (
    <div>
      <h2>{heading}</h2>
      {employee!.attendances.length != 0 ? (
        render()
      ) : (
        <p>No attendance records available.</p>
      )}
    </div>
  )
}

export default ViewAttendance
