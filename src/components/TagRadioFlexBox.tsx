import { setFilteredTag, unsetFilteredTag } from '../state/actions/tagActions';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { Tag, Color } from '../state/types/tagTypes';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';

const TagChipRadio: React.FC<{ tag: Tag }> = ({ tag }) => {
    const dispatch = useAppDispatch();
    const colors = useAppSelector((state) => state.tags.tagReducer.colors);
    const tagColor = colors.length > 1 ? colors.find((color: Color) => color.id == tag.color_id).hex : 'white';
    const selectedFilterTag = useAppSelector((state) => state.tags.tagReducer.selectedFilterTag);
    const handleOnClick = () => {
        if (selectedFilterTag == tag.id) {
            dispatch(unsetFilteredTag());
        } else {
            dispatch(setFilteredTag(tag.id));
        }
    };
    const textColor = 'white';
    const StyleChip = withStyles({
        root: {
            backgroundColor: tagColor,
            color: textColor,
            marginRight: '5px',
        },
        icon: {
            color: 'white',
        },
    })(Chip);
    if (selectedFilterTag == tag.id) {
        return (
            <StyleChip icon={<CheckCircleIcon sx={{ color: 'white' }} />} label={tag.name} onClick={handleOnClick} />
        );
    } else {
        return <StyleChip label={tag.name} onClick={handleOnClick} />;
    }
};

const TagRadioFlexBox: React.FC = () => {
    const tags = useAppSelector((state) => state.tags.tagReducer.tags);
    const tagArray = tags.map((tag: Tag) => {
        return <TagChipRadio tag={tag} key={tag.id} />;
    });
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
            <Typography variant="subtitle2" sx={{ paddingTop: '4px', paddingRight: '4px', color: 'gray' }}>
                {'Filter by Tag: '}
            </Typography>
            {tagArray}
        </Box>
    );
};

export default TagRadioFlexBox;
