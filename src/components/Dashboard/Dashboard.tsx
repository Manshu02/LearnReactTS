import React from 'react'
import DetailsCard from '../Details/Details'
import { useEmployeeContext } from '../context/EmployeeContext'
import Analytics from '../Analytics/Analytics'

const Dashboard: React.FC = () => {
    const { employee } = useEmployeeContext()
    return (
        <>
        {console.error(employee)}
            <DetailsCard employee={employee!} />
            <Analytics attendances={employee?.attendances == undefined ? []: employee!.attendances}/>
        </>
    )
}

export default Dashboard