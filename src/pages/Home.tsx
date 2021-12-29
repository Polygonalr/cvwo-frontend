import BasicList from '../components/BasicList';
import LoginModal from '../components/LoginModal';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const isLoggedIn = async () => {
    return fetch(`http://localhost:3001/api/user_data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((resp) => resp.json());
};

const Home: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowLoginModal, setShowLoginModal] = useState(true);

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

    return (
        <>
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
            <LoginModal open={isShowLoginModal} setOpen={setShowLoginModal} />
        </>
    );
};

export default Home;
