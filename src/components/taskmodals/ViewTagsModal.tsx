import { closeModal, showSuccessSnackbar } from '../../state/actions/uiActions';
import { addTagAction } from '../../state/actions/tagActions';
import { useAppSelector } from '../../state/hooks';
import TagFlexBox from '../TagFlexBox';
import TagChip from '../chips/TagChip';
import { Button, Modal, Paper, FormControl, Grid, TextField, Typography, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';

import type { RootState } from '../../state/store';
import type { Tag, Color } from '../../state/types/tagTypes';

const ViewTagsModal: React.FC = () => {
    const dispatch = useDispatch();
    const openModal = useAppSelector((state: RootState) => state.ui.uiReducer.openModal);
    const colors = useAppSelector((state: RootState) => state.tags.tagReducer.colors);
    const tags = useSelector((state: RootState) => state.tags.tagReducer.tags);
    const hexColorList = colors.map((color: Color) => color.hex);
    const [selectedColor, setSelectedColor] = useState('#c03a3a');
    const [newTagName, setNewTagName] = useState('');
    const handleClose = () => {
        dispatch(closeModal());
    };
    const handleChangeComplete = (color: any, _: any) => {
        setSelectedColor(color.hex);
    };
    const handleAddTag = () => {
        const selectedColorId = colors.find((color: Color) => color.hex == selectedColor).id;
        if (newTagName != '') {
            dispatch(addTagAction(newTagName, selectedColorId));
        }
        setNewTagName('');
    };
    const checkDuplicateTagNames = (): boolean => {
        const tagNames = tags.map((tag: Tag) => tag.name);
        return tagNames.includes(newTagName);
    };

    return (
        <Modal
            open={openModal == 'viewTags' ? true : false}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} style={{ padding: '25px', maxWidth: '550px' }}>
                <Typography variant="h5" component="div" mb={2}>
                    {'Displaying all tags'}
                </Typography>
                <TagFlexBox showAll={true} mb={2} />
                <Divider />
                <Grid container spacing={1} mt={2}>
                    <Grid item xs={9}>
                        <TextField
                            value={newTagName}
                            label="New tag name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            margin="none"
                            onChange={(e) => {
                                setNewTagName(e.target.value);
                            }}
                            error={checkDuplicateTagNames()}
                            inputProps={{ maxLength: 16 }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="success" fullWidth onClick={handleAddTag}>
                            {'Add'}
                        </Button>
                    </Grid>
                    <Grid item xs={7}>
                        <CirclePicker colors={hexColorList} width="100%" onChangeComplete={handleChangeComplete} />
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{ display: 'inline-flex', width: '100%' }}>
                            <div>
                                <Typography variant="body1" component="div" pt={0.5}>
                                    {'Preview:'}
                                </Typography>
                            </div>
                            <Box style={{ flexGrow: 1 }} pt={0.5} ml={0.5}>
                                <TagChip color={selectedColor} label={newTagName == '' ? 'New Tag' : newTagName} />
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};

export default ViewTagsModal;
