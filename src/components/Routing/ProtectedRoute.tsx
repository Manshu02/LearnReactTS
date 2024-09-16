import React, { useEffect } from 'react'
import { useEmployeeContext } from '../context/EmployeeContext';
import {  useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import { fetchAttendance, fetchEmployeeDetails, fetchManagerEmployees } from '../../utils/Api';
import { RoutesType } from '../../App';
interface ProtectedRouteProps {
    element: React.ReactElement;
    role: number;
    path: string;
    routes: RoutesType[]
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const { employee, setEmployee } = useEmployeeContext()
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate()
// Compares the role of the fetched employee with the role required for the current route (props.role).
// Redirect Based on Role: If the employee's role does not match the required role:
// Find Redirect Path: Searches for a route that matches the employee's role and retrieves its path.
// Navigate to Redirect Path: Redirects the user to the path corresponding to their role.
    useEffect(() => {
        const fetchAndRedirect = async () => {
            if (token) {
                try {
                    const employee = await fetchEmployeeDetails(token);
                    const [attendances, manageEmployees] = await Promise.all([
                        fetchAttendance(employee.employeeCode),
                        employee.role === 1 || employee.role === 2 ? fetchManagerEmployees(employee.employeeCode, employee.role) : Promise.resolve([])
                    ]);
                    console.warn(manageEmployees)
                    if(employee.role == 1) employee.manageEmployees = [...manageEmployees]
                    employee.manageEmployees = [...manageEmployees]
                    employee.attendances = [...attendances]
                    setEmployee(employee);
                    if (employee.role !== props.role) {
                        const redirectPath = props.routes.find(r => r.role === employee.role)?.path! ;
                        console.log(redirectPath)
                        navigate(redirectPath);
                    }
                    else {
                        navigate(props.path);
                    }
                } catch (err) {
                    console.error(err);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        };
        fetchAndRedirect();
    }, [token, navigate, setEmployee, props.path]);
    return (
        // If the user is authenticated (employee exists) and has the correct role for the route (employee.role === props.role), the component specified in props.element (e.g., <Employee />, <Admin />) is displayed.
        employee && employee.role == props.role ? props.element : <Login />
    )
}

export default ProtectedRoute