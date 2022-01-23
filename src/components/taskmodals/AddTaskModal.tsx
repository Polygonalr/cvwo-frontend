import { addTaskAction } from '../../state/actions/taskActions';
import { closeModal } from '../../state/actions/uiActions';
import TagSelectorFlexBox from '../TagSelectorFlexBox';
import { useAppSelector } from '../../state/hooks';
import { Button, Modal, Paper, FormControl, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { RootState } from '../../state/store';

const AddTaskModal: React.FC = () => {
    const dispatch = useDispatch();
    const openModal = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const handleClose = () => {
        dispatch(closeModal());
        cleanFields();
    };
    const selectedTags = useAppSelector((state: RootState) => state.tags.tagReducer.selectedTags);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const submitTask = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(addTaskAction(title, description, selectedTags));
    };

    const cleanFields = (): void => {
        setTitle('');
        setDescription('');
    };

    return (
        <Modal
            open={openModal == 'addTask' ? true : false}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} style={{ padding: '25px', minWidth: '450px' }}>
                <form id="newTaskForm" onSubmit={submitTask}>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                            {'Add new task'}
                        </Typography>
                        <FormControl component="fieldset">
                            <TextField
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                label="Title"
                                name="taskTitle"
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </FormControl>
                        <FormControl component="fieldset">
                            <TextField
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                label="Description"
                                name="description"
                                variant="outlined"
                                required
                                multiline
                                rows={3}
                            />
                        </FormControl>
                        <Typography variant="h6" component="div">
                            {'Tags'}
                        </Typography>
                        <TagSelectorFlexBox />
                        <Button variant="contained" type="submit">
                            {'Add Task'}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
};

export default AddTaskModal;
