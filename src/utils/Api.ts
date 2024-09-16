import { Attendance, EmployeeInterface } from "./Interface";

export const fetchEmployeeDetails = async (token: string): Promise<EmployeeInterface> => {
  const response = await fetch('http://localhost:5000/protected-route', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  console.log(response)
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    const employee: EmployeeInterface = data.user;
    return employee
  } else {
    throw new Error('Failed to fetch employee details');
  }
};
export const fetchAttendance = async (empCode: string): Promise<Attendance[]> => {
  const response = await fetch(`http://localhost:5000/attendance/${empCode}`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    const attendances: Attendance[] = data.attendances
    return attendances
  }
  else {
    throw new Error('Failed to fetch attendance details');

  }
}
export const fetchnAttendance = async (empCode: string): Promise<Attendance[]> => {
  const response = await fetch(`http://localhost:5000/napproved-attendance/${empCode}`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    const attendances: Attendance[] = data.attendances
    return attendances
  }
  else {
    throw new Error('Failed to fetch attendance details');

  }
}
export const fetchManagerEmployees = async (empCode: string, mcode: number): Promise<EmployeeInterface[]> => {
  let response;
  if (mcode == 1) {
    response = await fetch(`http://localhost:5000/admin-employees`)
  }
  else {
    response = await fetch(`http://localhost:5000/managed-employees/${empCode}`)
  }
  if (response!.ok) {
    const data = await response!.json()
    console.log(data)
    const employees: EmployeeInterface[] = data.employees
    return employees
  }
  else {
    throw new Error('Failed to fetch manager employees details');

  }
}
export const fetchAdminEmployees = async (): Promise<EmployeeInterface[]> => {
  const response = await fetch(`http://localhost:5000/admin-employees`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    const employees: EmployeeInterface[] = data.managedEmployees
    return employees
  }
  else {
    throw new Error('Failed to fetch manager employees details');

  }
}
export const approveAttendanceApiCall = async (empCode: string, date: string): Promise<string> => {
  const response = await fetch('http://localhost:5000/approve-attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ empCode, date }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to approve attendance');
  }
};
export const rejectAttendanceApiCall = async (empCode: string, date: string): Promise<string> => {
  const response = await fetch('http://localhost:5000/reject-attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ empCode, date }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to approve attendance');
  }
};

export const addEmployee = async (employee: EmployeeInterface): Promise<string> => {
  const response = await fetch('http://localhost:5000/add-employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update employee');
  }
};
export const updateEmployee = async (employee: EmployeeInterface): Promise<string> => {
  const response = await fetch(`http://localhost:5000/update-employees/${employee.employeeCode}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update employee');
  }
};
export const lockEmployee = async (employee: EmployeeInterface): Promise<string> => {
  const response = await fetch(`http://localhost:5000/lock-employees/${employee.employeeCode}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update employee');
  }
};
export const deleteEmployee = async (employeeCode: string): Promise<string> => {
  const response = await fetch(`http://localhost:5000/delete-employees/${employeeCode}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update employee');
  }
};
