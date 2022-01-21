import React from 'react';
import Chip from '@mui/material/Chip';
import { withStyles } from '@mui/styles';

const TagChip: React.FC<{ color: string; label: string }> = ({ color, label }) => {
    const StyleChip = withStyles({
        root: {
            backgroundColor: color,
        },
    })(Chip);

    return <StyleChip label={label} />;
};

export default TagChip;
