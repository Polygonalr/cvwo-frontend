import ColorChip from './ColorChip';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Color } from '../../state/types/tagTypes';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

const ColorRadio: React.FC = () => {
    const colors = useAppSelector((state) => state.tags.tagReducer.colors);
    const colorChips = colors.map((color: Color) => <ColorChip key={color.id} color={color.hex} />);
    return <div>{colorChips}</div>;
};

export default ColorRadio;
