import { useAppSelector, useAppDispatch } from '../state/hooks';
import { createUserAction } from '../state/actions/userActions';
import { closeModal } from '../state/actions/uiActions';
import {
    Button,
    Modal,
    Paper,
    FormControl,
    Stack,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from '@mui/material';
import React, { useState } from 'react';

import type { RootState } from '../state/store';

const CreateUserModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const openModal = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(2);
    return (
        <Modal
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={openModal == 'createUser' ? true : false}
            onClose={() => dispatch(closeModal())}
        >
            <Paper elevation={3} style={{ padding: '25px', width: '450px' }}>
                <Stack spacing={2}>
                    <Typography variant="h5" component="div">
                        {'Create new user'}
                    </Typography>
                    <FormControl component="fieldset">
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel id="demo-radio-buttons-group-label">{'Role'}</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setRole(parseInt(e.target.value))}
                            value={role}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Admin" />
                            <FormControlLabel value="2" control={<Radio />} label="User" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch(createUserAction(username, name, password, role))}
                    >
                        {'Create'}
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
};

export default CreateUserModal;
