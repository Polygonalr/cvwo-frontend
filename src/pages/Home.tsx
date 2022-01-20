import BasicList from '../components/BasicList';
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
        dispatch(fetchUserAction());
    }, [dispatch]);

    const loginModal = isShowLoginModal ? <LoginModal /> : null;

    return (
        <>
            <ButtonAppBar />
            <h3>{"Welcome to CVWO's sample react app! Here's a basic list for you to experiment with."}</h3>
            <br />
            <BasicList />
            <br />
            <Typewriter
                onInit={(typewriter) => {
                    hideButton();
                    typewriter
                        .changeDelay(80)
                        .pauseFor(1500)
                        .typeString("It's a little plain isn't it?")
                        .callFunction(showButton)
                        .start();
                }}
            />
            <br />
            {isShowButton && (
                <Button variant="contained" color="primary" component={Link} to="/styled">
                    {'Yes'}
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(addTaskAction('title2 test', 'description 2 test'))}
            >
                {'testdispatch'}
            </Button>
            {loginModal}
            <LoadingModal />
        </>
    );
};

export default Home;
