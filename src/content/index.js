import {AppBar, CssBaseline, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import WrappedFrame from '../common/WrappedFrame';


const newElement = document.createElement('div');
newElement.id = 'AI_EXTENSION-123456789';
document.body.appendChild(newElement);
const root = ReactDOM.createRoot(newElement);

const styles = {
    frame: {
        boxSizing: 'border-box',
        position: 'fixed',
        top: 11,
        right: 11,
        border: '3px black solid',
        borderStyle: 'inset',
        boxShadow: '5px 10px 8px #888888',
        width: 280,
        height: 180,
        background: 'white',
        zIndex: 2147483647,
        display: 'block !important',
    },
};

let renderCount = 0;


const InjectElement = () => {
    const [imageDescription, setImageDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    renderCount += 1;

    let currentRenderCount = renderCount;
    // console.log("renderCount", renderCount);

    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //     console.log('Listener on Message +. Using renderCount: ', currentRenderCount);
    //     if (message.content === 'imageDescription') {
    //         setImageDescription(message.description);
    //         setShowDescription(true);
    //     }
    // });

    useEffect(() => {
        const messageHandler = (message, sender, sendResponse) => {
            console.log('Listener on Message +. Using renderCount: ', currentRenderCount);
            console.log('imageDescription: ', imageDescription);
            if (message.content === 'imageDescription') {
                setImageDescription(message.description);
                setShowDescription(true);
            }
        };
        chrome.runtime.onMessage.addListener(messageHandler);
        return () => chrome.runtime.onMessage.removeListener(messageHandler);
    }, []);

    const handleClick = () => {
        setImageDescription('');
    };
    return (
        // <WrappedFrame style={styles.frame}>
            <Box sx={styles.frame}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Image Description
                            </Typography>
                            <IconButton color="inherit" onClick={() => {
                                handleClick();
                            }}><CloseIcon/></IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Paper>
                    {imageDescription}
                </Paper>
            </Box>
        // </WrappedFrame>
    );
};

const App = () => {
    return (
        <>
            <CssBaseline/>
            <InjectElement/>;
        </>
    );
};

root.render(<App/>);
