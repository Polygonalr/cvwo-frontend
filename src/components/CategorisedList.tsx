import AddTaskModal from './taskmodals/AddTaskModal';
import EditTaskModal from './taskmodals/EditTaskModal';
import ViewTaskModal from './taskmodals/ViewTaskModal';
import ViewTagsModal from './taskmodals/ViewTagsModal';
import TagFlexBox from './TagFlexBox';
import { selectTask } from '../state/actions/taskActions';
import { openModal } from '../state/actions/uiActions';
import { useAppSelector } from '../state/hooks';

import { setSelectedTags } from '../state/actions/tagActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Stack } from '@mui/material';

import type { Task } from '../state/types/taskTypes';

const CardGroup = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    minHeight: '100%',
}));

const CardStack: React.FC<{ status: number }> = ({ status }) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.tasks.taskReducer.tasks);
    const filteredTasks = tasks.filter((task: Task) => task.status === status);
    const renderedTasks = filteredTasks.map((task: Task) => {
        const tag_ids = task.tags.map((tag) => tag.id);
        const openViewTaskModal = () => {
            dispatch(openModal('viewTask'));
            dispatch(setSelectedTags(tag_ids));
            dispatch(selectTask(task.id));
        };
        return (
            <Card variant="outlined" key={task.id} onClick={openViewTaskModal}>
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" align="left">
                            {'#' + task.id + ' ' + task.title}
                        </Typography>
                    </CardContent>
                    {task.tags.length != 0 && (
                        <CardActions>
                            <TagFlexBox tags={task.tags} />
                        </CardActions>
                    )}
                </CardActionArea>
            </Card>
        );
    });
    if (renderedTasks.length === 0) {
        return (
            <Stack spacing={1} mt={2} pb={1}>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {'No tasks here!'}
                </Typography>
            </Stack>
        );
    }
    return (
        <Stack spacing={1} mt={2} pb={1}>
            {renderedTasks}
        </Stack>
    );
};

const CategorisedList: React.FC = () => {
    return (
        <Container maxWidth="xl" style={{ height: '100%' }}>
            <Box sx={{ flex: 1, height: '100%' }} mt={2}>
                <Grid container spacing={2} sx={{ minHeight: '100%' }}>
                    <Grid item xs={4}>
                        <CardGroup>
                            <Typography variant="h5" component="div" mb={2}>
                                {'Pending'}
                            </Typography>
                            <Divider variant="middle" />
                            <CardStack status={0} />
                        </CardGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <CardGroup>
                            <Typography variant="h5" component="div" mb={2}>
                                {'Ongoing'}
                            </Typography>
                            <Divider variant="middle" />
                            <CardStack status={1} />
                        </CardGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <CardGroup>
                            <Typography variant="h5" component="div" mb={2}>
                                {'Completed'}
                            </Typography>
                            <Divider variant="middle" />
                            <CardStack status={2} />
                        </CardGroup>
                    </Grid>
                </Grid>
            </Box>
            <AddTaskModal />
            <EditTaskModal />
            <ViewTaskModal />
            <ViewTagsModal />
        </Container>
    );
};

export default CategorisedList;
