import { useAppSelector } from '../state/hooks';
import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingModal: React.FC = () => {
    const userIsLoading = useAppSelector((state) => state.user.userReducer.isLoading);
    const tasksIsLoading = useAppSelector((state) => state.tasks.taskReducer.isLoading);

    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        if (userIsLoading || tasksIsLoading) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    }, [userIsLoading, tasksIsLoading]);

    return (
        <Modal open={isShow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Modal>
    );
};

export default LoadingModal;
