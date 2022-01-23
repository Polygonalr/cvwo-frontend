import TagChip from './chips/TagChip';
import { Tag, Color } from '../state/types/tagTypes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import React from 'react';
import Box from '@mui/material/Box';

const TagFlexBox: React.FC<{ tags?: Tag[]; showAll?: boolean; mb?: number }> = ({
    tags = [],
    showAll = false,
    mb = 0,
}) => {
    const colors = useAppSelector((state) => state.tags.tagReducer.colors);
    const allTags = useAppSelector((state) => state.tags.tagReducer.tags);
    if (showAll) {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }} mb={mb}>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} mb={mb}>
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
