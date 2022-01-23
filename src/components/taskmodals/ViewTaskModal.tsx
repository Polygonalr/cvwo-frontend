import { openModal, closeModal } from '../../state/actions/uiActions';
import { useAppSelector } from '../../state/hooks';
import TagFlexBox from '../TagFlexBox';
import { updateTaskAction, selectTask } from '../../state/actions/taskActions';
import { Button, Modal, Paper, Box, Stack, Chip, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoopIcon from '@mui/icons-material/Loop';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountCircle from '@mui/icons-material/AccountCircle';
import type { RootState } from '../../state/store';
import type { Task } from '../../state/types/taskTypes';
import type { Tag } from '../../state/types/tagTypes';

const ViewTaskModal: React.FC = () => {
    const dispatch = useDispatch();
    const openModalState = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const tasks = useAppSelector((state: RootState) => state.tasks.taskReducer.tasks);
    const selectedTaskId = useAppSelector((state: RootState) => state.tasks.taskReducer.selectedTask);
    const selectedTask = tasks.find((task: Task) => task.id == selectedTaskId);
    const user = useAppSelector((state: RootState) => state.user.userReducer.user);
    const handleClose = () => {
        dispatch(closeModal());
        dispatch(selectTask(selectedTaskId));
    };
    const handleEditTask = () => {
        dispatch(openModal('editTask'));
    };
    const handleSendToPending = () => {
        const tag_ids = selectedTask.tags.map((tag: Tag) => tag.id);
        dispatch(updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 0, tag_ids));
    };
    const handleSendToInProgress = () => {
        const tag_ids = selectedTask.tags.map((tag: Tag) => tag.id);
        dispatch(updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 1, tag_ids));
    };
    const handleSendToDone = () => {
        const tag_ids = selectedTask.tags.map((tag: Tag) => tag.id);
        dispatch(updateTaskAction(selectedTask.id, selectedTask.title, selectedTask.ddescription, 2, tag_ids));
    };

    return (
        <Modal
            open={openModalState == 'viewTask' ? true : false}
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
                        {user && selectedTask && (user.id == selectedTask.user_id || user.role == 1) && (
                            <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit the task">
                                    <IconButton aria-label="edit the task" onClick={handleEditTask}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                {selectedTask && selectedTask.status != 0 && (
                                    <Tooltip title="Mark as pending">
                                        <IconButton aria-label="mark as pending" onClick={handleSendToPending}>
                                            <PauseCircleOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {selectedTask && selectedTask.status != 1 && (
                                    <Tooltip title="Send to In Progress">
                                        <IconButton aria-label="mark as in progress" onClick={handleSendToInProgress}>
                                            <LoopIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {selectedTask && selectedTask.status != 2 && (
                                    <Tooltip title="Mark as done">
                                        <IconButton aria-label="mark as done" onClick={handleSendToDone}>
                                            <CheckBoxIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Stack>
                        )}
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
                        <TagFlexBox tags={selectedTask ? selectedTask.tags : []} padBottom={true} />
                    </Stack>
                </Box>
            </Paper>
        </Modal>
    );
};

export default ViewTaskModal;
