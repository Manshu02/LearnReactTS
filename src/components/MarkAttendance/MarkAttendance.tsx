import React, { useEffect, useState } from 'react';
import { Calendar, DateRangePicker } from 'react-date-range';
import { useEmployeeContext } from '../context/EmployeeContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Attendance } from '../../utils/Interface';


const MarkAttendance: React.FC = () => {
  const { employee,setEmployee } = useEmployeeContext();
  const [dates, setDates] = useState<Attendance[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [status, setStatus] = useState<'Present' | 'Absent'>('Present');
  const [multipleDates, setMultipleDates] = useState<boolean>(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as 'Present' | 'Absent');
  };

  const handleSelect = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectMultipleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setSelectionRange({ startDate, endDate, key: 'selection' });
  };

  const addDate = () => {
    if (multipleDates) {
      const rangeStart = new Date(selectionRange.startDate);
      const rangeEnd = new Date(selectionRange.endDate);
      const dateArray: Date[] = [];
      for (
        let date = new Date(rangeStart);
        date <= rangeEnd;
        date.setDate(date.getDate() + 1)
      ) {
        const nDate = new Date(date)
        nDate.setDate(nDate.getDate() + 1)
        dateArray.push(nDate);
      }
      setDates(prevDates => [
        ...prevDates,
        ...dateArray.map(date => ({
          date: date.toISOString().split('T')[0],
          status,
          empCode: employee!.employeeCode,
          isApproved: false,
          isRejected: false
        })),
      ]);
    } else {
      if (currentDate) {
        setDates(prevDates => [...prevDates, { date: new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)).toISOString().split('T')[0], status,empCode: employee!.employeeCode,isApproved: false, isRejected: false }]);
        setCurrentDate(new Date());
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (dates.length == 0) {
      alert("First Click add dates")
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dates,
          empCode: employee?.employeeCode || '',
        }),
      });
      if (response.ok) {
        console.log('Attendance marked successfully');
        console.log(employee,dates)
        setEmployee({...employee!,attendances: [...employee!.attendances,...dates]});
        
        setDates([]);
      } else {
        alert('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const dates = employee?.attendances.map((record: Attendance) => new Date((record.date)))
    setMarkedDates(dates || [])

  }, [employee?.attendances]);
  return (
    <div className="container mt-4">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select className="form-select" value={status} onChange={handleStatusChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={multipleDates}
            onChange={() => setMultipleDates(!multipleDates)}
          />
          <label className="form-check-label">Mark for multiple days</label>
        </div>
        <div className="mb-3">
          {multipleDates ? (
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelectMultipleSelect}
              disabledDates={markedDates}
              maxDate={new Date()}
            />
          ) : (
            <Calendar date={currentDate} onChange={handleSelect} maxDate={new Date()} disabledDates={markedDates}/>
          )}
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-primary me-2" onClick={addDate}>
            Add Date
          </button>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
      <h3>Dates to Mark:</h3>
      <ul className="list-group">
        {dates.map((d, index) => (
          <li key={index} className="list-group-item">
            {d.date} - {d.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkAttendance;
