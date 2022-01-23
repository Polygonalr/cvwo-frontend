import TagChip from './chips/TagChip';
import { Tag, Color } from '../state/types/tagTypes';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import React from 'react';
import Box from '@mui/material/Box';

const TagFlexBox: React.FC<{ tags?: Tag[]; showAll?: boolean; mb?: number; padBottom?: boolean }> = ({
    tags = [],
    showAll = false,
    mb = 0,
    padBottom = false,
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
                        padBottom={padBottom}
                    />
                ))}
            </Box>
        );
    }
    if (colors.length > 0) {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }} mb={mb}>
                {tags.map((tag: Tag) => (
                    <TagChip
                        color={colors.find((color: Color) => color.id == tag.color_id).hex}
                        key={tag.id}
                        label={tag.name}
                        padBottom={padBottom}
                    />
                ))}
            </Box>
        );
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} mb={mb}>
            {'Colors are still loading!'}
        </Box>
    );
};

export default TagFlexBox;
