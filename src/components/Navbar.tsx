import { useAppDispatch, useAppSelector } from '../state/hooks';
import { openModal } from '../state/actions/uiActions';

import * as React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LabelIcon from '@mui/icons-material/Label';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userRole = useAppSelector((state) => state.user.userReducer.user.role);
    const userName = useAppSelector((state) => state.user.userReducer.user.name);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCreateUser = () => {
        setAnchorEl(null);
        dispatch(openModal('createUser'));
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Add a new Task">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                dispatch(openModal('addTask'));
                            }}
                        >
                            <AddBoxIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open tag menu">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                dispatch(openModal('viewTags'));
                            }}
                        >
                            <LabelIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {'Task Management System'}
                    </Typography>

                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>{'Logged in as: ' + userName}</MenuItem>
                            {userRole == 1 && <MenuItem onClick={handleCreateUser}>{'Create User'}</MenuItem>}
                            <MenuItem onClick={handleLogout}>{'Logout'}</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
