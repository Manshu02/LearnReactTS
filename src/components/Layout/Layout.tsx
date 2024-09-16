import React, { useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Sidebar from '../Sidebar/Sidebar'
import { MenuInterface } from '../../utils/Interface'
interface LayoutProps{
    menuItems: MenuInterface[];
    element: React.ReactElement
}
const Layout:React.FC<LayoutProps> = (props) => {
    const [activeContent, setActiveContent] = useState<JSX.Element | null>(props.element);
  return (
    <div className="container-fluid mt-4">
    <div className="row">
     <Sidebar menuItems={props.menuItems} setActiveContent={setActiveContent}/>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {activeContent || <Dashboard/>}
      </main>
    </div>
  </div>
  )
}

export default Layout