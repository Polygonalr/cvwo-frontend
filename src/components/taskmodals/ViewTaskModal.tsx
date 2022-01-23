import { closeModal } from '../../state/actions/uiActions';
import { useAppSelector } from '../../state/hooks';
import TagFlexBox from '../TagFlexBox';
import { updateTaskAction } from '../../state/actions/taskActions';
import { Button, Modal, Paper, Box, Stack, Chip, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoopIcon from '@mui/icons-material/Loop';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountCircle from '@mui/icons-material/AccountCircle';
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
    const handleSendToPending = () => {
        dispatch(
            updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 0, selectedTask.tags),
        );
    };
    const handleSendToInProgress = () => {
        dispatch(
            updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 1, selectedTask.tags),
        );
    };
    const handleSendToDone = () => {
        dispatch(
            updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 2, selectedTask.tags),
        );
    };

    return (
        <Modal
            open={openModal == 'viewTask' ? true : false}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} style={{ padding: '25px', maxWidth: '600px' }}>
                <Box sx={{ display: 'flex' }}>
                    <Stack pr={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div">
                            {selectedTask ? '#' + selectedTask.id + ' ' + selectedTask.title : ''}
                        </Typography>
                        <Typography variant="body1" component="div" mt={2}>
                            {selectedTask ? selectedTask.description : ''}
                        </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack pl={2}>
                        <Stack direction="row" spacing={1}>
                            <Tooltip title="Edit the task">
                                <IconButton aria-label="edit the task">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Send to In Progress">
                                <IconButton aria-label="mark as in progress" onClick={handleSendToInProgress}>
                                    <LoopIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as done">
                                <IconButton aria-label="mark as done" onClick={handleSendToDone}>
                                    <CheckBoxIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={1} mt={2} mb={2}>
                            <Typography variant="subtitle2" component="div" pt={0.5} noWrap={true}>
                                {'Created by:'}
                            </Typography>
                            <Chip icon={<AccountCircle />} label={selectedTask ? selectedTask.user : ''} />
                        </Stack>
                        <Divider />
                        <Typography variant="subtitle2" component="div" pt={2} mb={1} noWrap={true}>
                            {'Tags:'}
                        </Typography>
                        <TagFlexBox tags={selectedTask ? selectedTask.tags : []} />
                    </Stack>
                </Box>
            </Paper>
        </Modal>
    );
};

export default ViewTaskModal;
