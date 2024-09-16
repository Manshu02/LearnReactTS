
export interface EmployeeInterface {
    employeeCode: string;
    name: string;
    dob: string;
    team: string;
    manager: string;
    password?: string;
    role: number;
    managerCode: string;
    lockAccount: boolean;
    manageEmployees?: EmployeeInterface[]
    attendances: Attendance[]
}
export interface Attendance{
    date: string;
    empCode: string;
    status: string;
    isApproved: boolean;
    isRejected: boolean;
}
export interface MenuInterface{
    label: string;
    onClick: () => React.ReactElement;
}
export const getRoles = (roles: number) =>{
    if(roles == 1) return 'Admin'
    else if( roles == 2) return 'Manager'
    else if (roles == 3) return 'Employee'
    else if (roles == 4) return 'Trainee'
    else return 'Not Defined'
}
