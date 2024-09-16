import React, { useState } from 'react';
import { EmployeeInterface } from '../../utils/Interface'; 
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  payload?: EmployeeInterface;
  token?: string
}

interface LoginRequest {
  employeeCode: string;
  password: string;
}

const Login: React.FC = () => {
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [employee, setEmployeeFetch] = useState<EmployeeInterface>()
  const navigate = useNavigate()
  const {setEmployee} = useEmployeeContext()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const requestData: LoginRequest = {
      employeeCode,
      password
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result: LoginResponse = await response.json();

      if (response.ok && result.success) {
        console.log(result.payload)
        setEmployee(result.payload!);
        sessionStorage.setItem("token",result.token!)
        if (result.payload!.role === 1) {
          navigate('/admin');
        } else if (result.payload!.role === 2) {
          navigate('/manager');
        }
         else if (result.payload!.role === 3) {
          navigate('/employee');
        }
        setMessage(result.message || 'Login successful');
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <form className="w-50 mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employeeCode" className="form-label">
            Employee Code
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeCode"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {message && <div className="mt-3 alert alert-success">{message}</div>}
        {error && <div className="mt-3 alert alert-danger">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
