import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { deleteTagAction } from '../../state/actions/tagActions';
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

const TagChip: React.FC<{ color: string; label: string; padBottom?: boolean; tagId?: number }> = ({
    color,
    label,
    padBottom = false,
    tagId = -1,
}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.userReducer.user);
    let textColor = 'black';
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
        textColor = getContrastYIQ(color);
    }
    let StyleChip;
    if (padBottom) {
        StyleChip = withStyles({
            root: {
                backgroundColor: color,
                color: textColor,
                marginRight: '5px',
                marginBottom: '5px',
            },
        })(Chip);
    } else {
        StyleChip = withStyles({
            root: {
                backgroundColor: color,
                color: textColor,
                marginRight: '5px',
            },
        })(Chip);
    }
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this tag?') && tagId != -1) {
            dispatch(deleteTagAction(tagId));
        }
    };
    if (user && user.role == 1 && tagId != -1) {
        return <StyleChip label={label} size="small" onDelete={handleDelete} />;
    }
    return <StyleChip label={label} size="small" />;
};

export default TagChip;
