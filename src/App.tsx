import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { EmployeeProvider } from './components/context/EmployeeContext';
import Employee from './components/Employee/Employee';
import Admin from './components/Admin/Admin';
import Manager from './components/Manager/Manager';
import ProtectedRoute from './components/Routing/ProtectedRoute';
export interface RoutesType {
  path: string;
  element: React.ReactElement
  role: number;
}

// Routes
const routes: RoutesType[] = [
  { path: "/employee", element: <Employee />, role: 3 },
  { path: "/manager", element: <Manager />, role: 2 },
  { path: "/admin", element: <Admin />, role: 1 },
  { path: "/", element: <Login />, role: 0 },

]
const App: React.FC = () => {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            {routes.map((curr) => (
              <Route path={curr.path} element={<ProtectedRoute routes={routes} element={curr.element} role={curr.role} path={curr.path} />} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </EmployeeProvider>
  );
};

export default App;
