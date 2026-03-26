import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      {user ? (
        <div className="space-y-3">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </main>
  );
};

export default Profile;
