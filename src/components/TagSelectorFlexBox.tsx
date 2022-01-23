import { useAppSelector, useAppDispatch } from '../state/hooks';
import { Tag, Color } from '../state/types/tagTypes';
import { setSelectedTags } from '../state/actions/tagActions';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from 'react';

const TagChipSelector: React.FC<{ tag: Tag }> = ({ tag }) => {
    // TODO Fix the checkbox icon color and hover background color
    const dispatch = useAppDispatch();
    const color = useAppSelector((state) =>
        state.tags.tagReducer.colors.find((color: Color) => color.id == tag.color_id),
    );
    const selectedTags = useAppSelector((state) => state.tags.tagReducer.selectedTags);
    const isSelected = useAppSelector((state) => state.tags.tagReducer.selectedTags.includes(tag.id));
    const handleOnClick = () => {
        let newSelectedTags = [...selectedTags];
        if (isSelected) {
            newSelectedTags = newSelectedTags.filter((id) => id != tag.id);
        } else {
            newSelectedTags.push(tag.id);
        }
        dispatch(setSelectedTags(newSelectedTags));
    };
    const textColor = 'white';
    const StyleChip = withStyles({
        root: {
            backgroundColor: color.hex,
            color: textColor,
            marginRight: '5px',
        },
        icon: {
            color: 'white',
        },
    })(Chip);
    if (isSelected) {
        return (
            <StyleChip icon={<CheckCircleIcon sx={{ color: 'white' }} />} label={tag.name} onClick={handleOnClick} />
        );
    } else {
        return <StyleChip label={tag.name} onClick={handleOnClick} />;
    }
};

const TagSelectorFlexBox: React.FC = () => {
    const tags = useAppSelector((state) => state.tags.tagReducer.tags);
    const tagArray = tags.map((tag: Tag) => {
        return <TagChipSelector tag={tag} key={tag.id} />;
    });
    return <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{tagArray}</Box>;
};

export default TagSelectorFlexBox;
