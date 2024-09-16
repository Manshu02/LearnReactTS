import React from 'react';
import { EmployeeInterface, getRoles } from '../../utils/Interface';

interface DetailsCardProps {
  employee: EmployeeInterface;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ employee }) => {
  return (
    <div className="card mb-3 w-100">
      <div className="card-body">
        <h5 className="card-title fw-bold">{employee.name}</h5>
        <div className="row">
          <div className="col-md-6">
            <p className="card-text"><strong>Employee Code:</strong> {employee.employeeCode}</p>
          </div>
          <div className="col-md-6">
            <p className="card-text"><strong>Date of Birth:</strong> {employee.dob}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="card-text"><strong>Role:</strong> {getRoles(employee.role)}</p>
          </div>
          <div className="col-md-6">
            <p className="card-text"><strong>Manager:</strong> {employee.manager}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
