import CategorisedList from '../components/CategorisedList';
import LoginModal from '../components/LoginModal';
import LoadingModal from '../components/LoadingModal';
import { fetchUserAction } from '../state/actions/userActions';
import { fetchTasksAction, addTaskAction } from '../state/actions/taskActions';
import { showSuccessSnackbar } from '../state/actions/uiActions';
import { useAppSelector } from '../state/hooks';
import ButtonAppBar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowLoginModal, setShowLoginModal] = useState(false);

    // if (user.initialised === false) {

    // }

    const hideButton = () => {
        setIsShowButton(false);
    };

    const showButton = () => {
        setIsShowButton(true);
    };

    const hideLoginModal = () => {
        setShowLoginModal(false);
    };

    const user = useAppSelector((state) => state.user.userReducer);
    const tasks = useAppSelector((state) => state.tasks.taskReducer);

    useEffect(() => {
        if (!user.isAuthenticated && !user.isLoading) {
            setShowLoginModal(true);
        } else {
            setShowLoginModal(false);
        }
    }, [user.isAuthenticated, user.isLoading]);

    useEffect(() => {
        if (user.isAuthenticated || tasks.fetched) {
            dispatch(fetchTasksAction());
        }
    }, [user.isAuthenticated, tasks.fetched]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token') == 'undefined') {
            localStorage.removeItem('token');
        }
        dispatch(fetchUserAction());
    }, [dispatch]);

    const loginModal = isShowLoginModal ? <LoginModal /> : null;

    return (
        <>
            <ButtonAppBar />
            <CategorisedList />
            {loginModal}
            <LoadingModal />
        </>
    );
};

export default Home;
