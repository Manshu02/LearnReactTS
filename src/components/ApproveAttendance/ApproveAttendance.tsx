import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Attendance } from '../../utils/Interface';

interface ApproveInterface {
  attendance: Attendance[];
  render: () => JSX.Element;
}



const ApproveAttendance: React.FC<ApproveInterface> = (props) => {
  const { employee, setEmployee } = useEmployeeContext();



  return (
    <div>
      <h2>Approve Attendance</h2>
      {employee?.manageEmployees?.length !== 0 ? (
        props.render()
      ) : (
        <p>No attendance records available for approval.</p>
      )}
    </div>
  );
}

export default ApproveAttendance;
