import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserDetails from './UserDetails';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  const [users, setUsers] = useState([]);
  
  const getUsers = async (page) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    return data.data;
  };

  const generateUsers = async (destination = 1) => {
    const usersData = await getUsers(destination);
    setUsers(usersData);
  };

  useEffect(() => {
    generateUsers();
  }, []);

  return (
    <Router>
      <div className="App p-2">
        <h1>Users List</h1>
        <div className="users-container row container-fluid">
          {users.map((user) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={user.id}>
              <div className="card">
                <img className="image object-fit-cover" src={user.avatar} alt={user.first_name} />
                <div className="card-body">
                  <h4 className="card-title">{`${user.first_name} ${user.last_name}`}</h4>
                  <p className="card-text">{user.email}</p>
                  <Link to={`/profile/${user.id}`} className="btn btn-primary">Read more</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><button className="page-link" onClick={() => generateUsers(1)}>1</button></li>
              <li className="page-item"><button className="page-link" onClick={() => generateUsers(2)}>2</button></li>
            </ul>
          </nav>
        </div>
      </div>
      <Routes>
        <Route path="/profile/:id" element={<UserDetails />} /> {/* New route for user details */}
      </Routes>
    </Router>
  );
}

export default App;
