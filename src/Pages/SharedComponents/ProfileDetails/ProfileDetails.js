import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { emptyCart } from '../../../redux/feathers/productsSlice';
import styles from './ProfileDetails.module.css';
import { logoutUser } from '../../../redux/user/userSlice';
import useScreenWidth from '../../../hooks/useScreenWidth';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const {userProfile, token} = useSelector(state=>state.user)
  const navigate = useNavigate();
  // const { loggedInUser, logOut } = useAuth();
  const dispatch = useDispatch();
const screenWidth = useScreenWidth()
const overLayPosition = screenWidth <= 760 ? "top-start" : "bottom-start"
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const signOut = () => {
    dispatch(logoutUser())
    dispatch(emptyCart());
    navigate("/")
  };



  return (
    <div ref={ref}>
      <img style={{ width: '37px', height: '35px', borderRadius: '50%' }} onClick={handleClick} src={userProfile?.profile_image_url ? userProfile?.profile_image_url : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt={userProfile?.first_name} />

      <Overlay show={show} target={target} placement={overLayPosition} container={ref}>
        <Popover id='popover-contained' className={styles.profile__body}>
          <Popover.Body>
            <h6>
              <strong>{userProfile?.first_name}</strong>
            </h6>
            <p>
              <strong>{userProfile?.email}</strong>
            </p>
            <button onClick={signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default ProfileDetails;
