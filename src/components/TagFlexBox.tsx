import TagChip from './TagChip';
import { Tag, Color } from '../state/types/tagTypes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import React from 'react';
import Box from '@mui/material/Box';

const TagFlexBox: React.FC<{ tags?: Tag[]; showAll?: boolean }> = ({ tags = [], showAll = false }) => {
    const colors = useAppSelector((state) => state.tags.tagReducer.colors);
    console.log(colors);
    const allTags = useAppSelector((state) => state.tags.tagReducer.tags);
    if (showAll) {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {allTags.map((tag: Tag) => (
                    <TagChip
                        color={colors.find((color: Color) => color.id == tag.color_id).hex}
                        key={tag.id}
                        label={tag.name}
                    />
                ))}
            </Box>
        );
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {tags.map((tag: Tag) => (
                <TagChip
                    color={colors.find((color: Color) => color.id == tag.color_id).hex}
                    key={tag.id}
                    label={tag.name}
                />
            ))}
        </Box>
    );
};

export default TagFlexBox;
