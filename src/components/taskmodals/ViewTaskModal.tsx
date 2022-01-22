import { closeModal } from '../../state/actions/uiActions';
import { useAppSelector } from '../../state/hooks';
import { Button, Modal, Paper, FormControl, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../state/store';
import type { Task } from '../../state/types/taskTypes';

const ViewTaskModal: React.FC = () => {
    const dispatch = useDispatch();
    const openModal = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const tasks = useAppSelector((state: RootState) => state.tasks.taskReducer.tasks);
    const selectedTaskId = useAppSelector((state: RootState) => state.tasks.taskReducer.selectedTask);
    const selectedTask = tasks.find((task: Task) => task.id == selectedTaskId);
    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            open={openModal == 'viewTask' ? true : false}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} style={{ padding: '25px', minWidth: '450px' }}>
                <Typography variant="h5" component="div">
                    {selectedTask ? selectedTask.title : ''}
                </Typography>
            </Paper>
        </Modal>
    );
};

export default ViewTaskModal;
