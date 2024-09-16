import React, { useRef, useState } from 'react'
import { Attendance, EmployeeInterface } from '../../utils/Interface'
import ApproveAttendanceChild from '../ApproveAttendance/ApproveAttendance'
import { approveAttendanceApiCall, fetchnAttendance, rejectAttendanceApiCall } from '../../utils/Api'
import { useEmployeeContext } from '../context/EmployeeContext'
interface EmployeeSelectorProps {
    managerEmployees: EmployeeInterface[]
}
const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ managerEmployees }) => {
    const {employee,setEmployee} = useEmployeeContext()
    const [selectedEmployee,setSelectedEmployee] = useState<EmployeeInterface|null>(null)
    const callAction = async (employee: EmployeeInterface) => {
        const attendances: Attendance[] = await fetchnAttendance(employee.employeeCode)
        employee.attendances = attendances
        setSelectedEmployee(employee)
    }
    const approveAttendance = async (empCode: string, date: string, code: number) => {
        console.log(empCode, date);
        //1 - approve
        //2 - not approve
        if(code == 1) await approveAttendanceApiCall(empCode,date)
        else await rejectAttendanceApiCall(empCode, date);
      
          const updatedEmployees = employee!.manageEmployees!.map((emp) => {
            if (emp.employeeCode === empCode) {
              return {
                ...emp,
                attendances: emp.attendances.map((att) =>
                  att.date === date ? { ...att, isApproved: code == 1, isRejected: code == 2 } : att
                ),
              };
            }
            return emp;
          });
          setEmployee({ ...employee!, manageEmployees: updatedEmployees });
      
          if (selectedEmployee) {
            setSelectedEmployee({
              ...selectedEmployee,
              attendances: selectedEmployee.attendances.map((att) =>
                att.date === date ? { ...att, isApproved: code == 1, isRejected: code == 2 } : att
              ),
            });
          }
      };
      
    const approveNode = () => {
      let value = selectedEmployee?.attendances.length
        console.log(selectedEmployee?.attendances.length)
        return (
          
       selectedEmployee?.attendances.length != 0 ?    <table className="table table-striped">
       <thead>
         <tr>
           <th scope="col">Employee Code</th>
           <th scope="col">Name</th>
           <th scope="col">Date</th>
           <th scope="col">Status</th>
           <th scope="col">Approved</th>
           <th scope="col">Actions</th>
         </tr>
       </thead>
       <tbody>

          { selectedEmployee!.attendances.map((record, index) => (
             <tr key={`${selectedEmployee!.employeeCode}-${index}`}>
               <td>{selectedEmployee!.employeeCode}</td>
               <td>{selectedEmployee!.name}</td>
               <td>{record.date}</td>
               <td>{record.status}</td>
               <td>
                 <span className={`badge ${record.isApproved ? 'bg-success' : record.isRejected ? 'bg-danger' :  'bg-warning'}`}>
                   {record.isApproved ? 'Approved' : record.isRejected ? 'Rejected' : 'Pending'}
                 </span>
               </td>
               <td>
                 {!record.isApproved && !record.isRejected && (
                  <div className='d-flex justify-content-evenly'>
                   <a
                     onClick={() => approveAttendance(selectedEmployee!.employeeCode, record.date, 2)}
                   >
                     <i className="fa-solid fa-xmark"></i>
                   </a>
                   <a
                     onClick={() => approveAttendance(selectedEmployee!.employeeCode, record.date, 1)}
                   >
                     <i className="fa-solid fa-check"></i>
                   </a>
                  </div>
                  
                 )}
               </td>
             </tr>
           ))
         }
       </tbody>
     </table>: <p>No attendance records available for approval.</p>
        );
      };
    return (
        <>
         {!selectedEmployee &&  <div className="employee-selector">
            {managerEmployees.map((employee: EmployeeInterface) => (
                <div
                    key={employee.employeeCode}
                    className="employee-card"
                    onClick={() => callAction(employee)}
                >
                    <div className="card mb-4" style={{cursor: 'pointer'}}>
                        <h5 className="card-header">{employee.employeeCode}</h5>
                        <div className="card-body">
                            <h5 className="card-title">{employee.name}</h5>
                            <p className="card-text">
                                {employee.name} is working in {employee.team}
                            </p>
                        </div>
                    </div>


                </div>
            ))}
        </div>}
        {
            selectedEmployee && <ApproveAttendanceChild attendance={[]} render={approveNode}/>
        }
        </>
      
    )
}

export default EmployeeSelector
