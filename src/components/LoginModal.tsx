import { Button, Modal, Paper, FormControl, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const submitCredentials = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const credentials = {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
    };

    (async () => {
        await fetch(`http://localhost:3001/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((resp) => resp.json())
            .then((data) => {
                localStorage.setItem('token', data.jwt);
            });
    })();
};

const LoginModal: React.FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
    // const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            // onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
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
