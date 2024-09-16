import React, { useEffect, useState } from 'react';
import { EmployeeInterface } from '../../utils/Interface';
import { useEmployeeContext } from '../context/EmployeeContext';
import { addEmployee, deleteEmployee, lockEmployee, updateEmployee } from '../../utils/Api';

const ManageEmployee: React.FC = () => {
    const { employee, setEmployee } = useEmployeeContext();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface | null>(null);

    const handleEditEmployee = (employee: EmployeeInterface) => {
        setCurrentEmployee(employee);
        setIsEditing(true);
    };

    const handleDeleteEmployee = async (employeeCode: string) => {
        let updatedEmployees: EmployeeInterface[] = [...(employee?.manageEmployees || [])];
        const findIndex = employee?.manageEmployees!.findIndex(curr => curr.employeeCode === employeeCode);
        updatedEmployees.splice(findIndex!, 1);
        setEmployee({ ...employee!, manageEmployees: [...updatedEmployees] });
        await deleteEmployee(employeeCode);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setCurrentEmployee(null);
    };

    const handleSaveEmployee = async () => {
        let updatedEmployees: EmployeeInterface[] = [...(employee?.manageEmployees || [])];

        const index = updatedEmployees.findIndex(curr => curr.employeeCode === currentEmployee?.employeeCode);

        if (index !== -1 && currentEmployee) {
            updatedEmployees[index] = currentEmployee;
            await updateEmployee(currentEmployee);
        } else if (currentEmployee) {
            updatedEmployees.push(currentEmployee);
            await addEmployee(currentEmployee);
        }

        setEmployee({ ...employee!, manageEmployees: [...updatedEmployees] });
        handleCloseModal();
    };
    const handleLock = async (em: EmployeeInterface) => {
        let updatedEmployees: EmployeeInterface[] = [...(employee?.manageEmployees || [])];
        console.warn(updatedEmployees)
        const index = updatedEmployees.findIndex(curr => curr.employeeCode === em?.employeeCode);
        console.log(updatedEmployees)
        updatedEmployees[index].lockAccount = !updatedEmployees[index].lockAccount;
        await lockEmployee(em)
        setEmployee({ ...employee!, manageEmployees: [...updatedEmployees] })
    }

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={() => setIsEditing(true)}>
                Add Employee
            </button>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Sno.</th>
                            <th scope="col">Employee Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Team</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Manager Code</th>
                            <th scope="col">Lock Account</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee?.manageEmployees!.map((emp, index) => (
                            <tr key={emp.employeeCode}>
                                <td>{index + 1}</td>
                                <td>{emp.employeeCode}</td>
                                <td>{emp.name}</td>
                                <td>{emp.dob}</td>
                                <td>{emp.team}</td>
                                <td>{emp.manager}</td>
                                <td>{emp.password}</td>
                                <td>{emp.role}</td>
                                <td>{emp.managerCode}</td>
                                <td>
                                    <a onClick={() => handleLock(emp)}>
                                        {emp.lockAccount ? <i className="fa-solid fa-lock-open"></i> : <i className="fa-solid fa-lock"></i>}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        style={{ marginRight: '1rem' }}
                                        onClick={() => handleEditEmployee(emp)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a
                                        onClick={() => handleDeleteEmployee(emp.employeeCode)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditing && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentEmployee ? 'Edit Employee' : 'Add Employee'}</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Employee Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentEmployee?.employeeCode || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    employeeCode: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentEmployee?.name || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    name: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>DOB</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={currentEmployee?.dob || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    dob: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Team</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentEmployee?.team || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    team: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Manager</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentEmployee?.manager || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    manager: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={currentEmployee?.password || ''}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    password: e.target.value,
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={currentEmployee?.role || 0}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    role: parseInt(e.target.value),
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Manager Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentEmployee?.managerCode}
                                            onChange={(e) =>
                                                setCurrentEmployee({
                                                    ...currentEmployee,
                                                    managerCode: e.target.value
                                                } as EmployeeInterface)
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveEmployee}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageEmployee;
