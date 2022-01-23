import React from 'react';
import Chip from '@mui/material/Chip';
import { withStyles } from '@mui/styles';

const getContrastYIQ = (hexcolor: string) => {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 2), 16);
    const b = parseInt(hexcolor.substring(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
};

const TagChip: React.FC<{ color: string; label: string }> = ({ color, label }) => {
    let textColor = 'black';
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
        textColor = getContrastYIQ(color);
    }
    const StyleChip = withStyles({
        root: {
            backgroundColor: color,
            color: textColor,
            marginRight: '5px',
        },
    })(Chip);

    return <StyleChip label={label} size="small" />;
};

export default TagChip;
