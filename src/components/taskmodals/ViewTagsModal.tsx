import { closeModal } from '../../state/actions/uiActions';
import { useAppSelector } from '../../state/hooks';
import TagFlexBox from '../TagFlexBox';
import { Button, Modal, Paper, FormControl, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../state/store';
import type { Tag, Color } from '../../state/types/tagTypes';

const ViewTaskModal: React.FC = () => {
    const dispatch = useDispatch();
    const openModal = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            open={openModal == 'viewTags' ? true : false}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} style={{ padding: '25px', minWidth: '450px' }}>
                <Typography variant="h5" component="div">
                    <TagFlexBox showAll={true} />
                </Typography>
            </Paper>
        </Modal>
    );
};

export default ViewTaskModal;
