import React, { useEffect, useState, useRef } from "react";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ListItemButton from '@mui/material/ListItemButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CircularProgress from '@mui/material/CircularProgress';
export default function Student({ value, index, labelId, setSnack }) {
    let [audio, setAudio] = useState(null);
    let [loading, setLoading] = useState(false);
    let sound = useRef(null);
    
    return (
        <>
            {
                loading ? <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}><CircularProgress /></div> : (
                    <ListItem
                        sx={{borderTop: '0.5px solid rgba(45, 55, 72, 0.2)', borderBottom: '0.5px solid rgba(45, 55, 72, 0.2)', height: '80px' }}
                        disablePadding
                    >
                        <ListItemButton role={undefined}  sx={{display: 'grid', gridTemplateColumns: '1fr', overflowX: 'scroll'}}>
                            <span>
                            <ListItemIcon>
                                <Checkbox
                                sx={{color: 'rgb(156, 163, 175)'}}
                                edge="start"
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                                    </ListItemIcon>
                                {value.name} {value.surname} 
                            </span>
                        </ListItemButton>
                    </ListItem>
                )
            }
            

        </>
)
}