import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserAddresses } from '../../store/actions';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, address } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserAddresses());
  }, [dispatch]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name || user.username || user.email}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Addresses</h3>
      {address && address.length > 0 ? (
        <ul>
          {address.map((a) => (
            <li key={a.addressId}>{a.addressLine1 || a.fullAddress || JSON.stringify(a)}</li>
          ))}
        </ul>
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  );
};

export default Profile;
