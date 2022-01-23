import React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';

const ColorChip: React.FC<{ color: string }> = ({ color }) => {
    const CircleButton = styled(Button)({
        backgroundColor: color,
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        padding: 0,
        margin: '0',
    });

    return <CircleButton variant="contained"></CircleButton>;
};

export default ColorChip;
