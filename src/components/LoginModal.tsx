import { fetchUserAction, submitCredentialsAction } from '../state/actions/userActions';
import { useAppSelector } from '../state/hooks';
import { Button, Modal, Paper, FormControl, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState, useEffect, Dispatch, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { RootState } from '../state/store';

// const useLoginHandler = (username: string, password: string, submitted: boolean) => {
//     const dispatch = useDispatch();
//     const isLoading = useAppSelector((state) => state.user.userReducer.isLoading);
//     // it is better to put the dispatch inside a useEffect rather than outside
//     useEffect(() => {
//         if (!submitted) {
//             return;
//         }
//         dispatch(setAuthenticatedTest());
//     }, [username, password, submitted]);

//     if (isLoading) {
//         console.log('please wait');
//     }
// };

const LoginModal: React.FC = () => {
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);

    const submitCredentials = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const credentials = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };
        dispatch(submitCredentialsAction(credentials.username, credentials.password));
    };
    return (
        <Modal open={true} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '50px' }}>
                <form id="loginForm" onSubmit={submitCredentials}>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                            {'Login'}
                        </Typography>
                        <FormControl component="fieldset">
                            <TextField label="Username" name="username" variant="outlined" required />
                        </FormControl>
                        <FormControl component="fieldset">
                            <TextField type="password" label="Password" name="password" variant="outlined" required />
                        </FormControl>
                        <Button variant="contained" type="submit">
                            {'Login'}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
};

export default LoginModal;
