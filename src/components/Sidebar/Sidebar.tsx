import React from 'react';
import '../../App.css';
import { MenuInterface } from '../../utils/Interface';

export interface SidebarProps {
  menuItems: MenuInterface[];
  setActiveContent: (data: React.ReactElement) => void
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, setActiveContent }) => {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block h-100 sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a
                className="nav-link c"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveContent(item.onClick()!);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
