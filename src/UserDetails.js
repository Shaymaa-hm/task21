import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();
      setUser(data.data);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail">
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserDetails;
