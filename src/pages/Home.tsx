import CategorisedList from '../components/CategorisedList';
import CreateUserModal from '../components/CreateUserModal';
import LoginModal from '../components/LoginModal';
import LoadingModal from '../components/LoadingModal';
import { fetchUserAction } from '../state/actions/userActions';
import { fetchTasksAction, addTaskAction } from '../state/actions/taskActions';
import { fetchTagsAction, fetchColorsAction } from '../state/actions/tagActions';
import { showSuccessSnackbar } from '../state/actions/uiActions';
import { useAppSelector } from '../state/hooks';
import ButtonAppBar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
    const [isShowLoginModal, setShowLoginModal] = useState(false);

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
        if (user.isAuthenticated && !tasks.fetched) {
            dispatch(fetchTasksAction());
            dispatch(fetchTagsAction());
            dispatch(fetchColorsAction());
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
            <div style={{ height: '80vh' }}>
                <ButtonAppBar />
                <CategorisedList />
                {loginModal}
                <CreateUserModal />
                <LoadingModal />
            </div>
        </>
    );
};

export default Home;
