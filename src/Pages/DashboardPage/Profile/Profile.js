import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { emptyCart } from '../../../redux/feathers/productsSlice';
import styles from './Profile.module.css';
import { logoutUser } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const {userProfile} = useSelector(state=>state.user)
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logoutUser())
    dispatch(emptyCart());
    navigate("/")
  };

  return (
    <>
      {userProfile && (
        <section id={styles.my__profile}>
          <Container>
            <h1>My Profile</h1>
            <div className={styles.profile}>
              <img src={userProfile?.profile_image ? userProfile?.profile_image : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt={userProfile?.first_name} />
              <h4>{userProfile?.first_name}</h4>
              <p>{userProfile?.email}</p>
              <button onClick={signOut}>Logout</button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default Profile;
