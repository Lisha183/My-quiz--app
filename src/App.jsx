import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  
  console.log('Current user role:', userRole);

  return (
    <div>
    <h1>My App</h1>
    <Login setUser={setUser} setUserRole={setUserRole} />
    {user && (
      <div>
        <p>Welcome, {user.email}</p>
        <p>Role: {userRole}</p>
      </div>
    )}
  </div>
);
};

export default App;

