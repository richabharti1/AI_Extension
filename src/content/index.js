import {AppBar, CssBaseline, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';


const newElement = document.createElement('div');
newElement.id = 'AI_EXTENSION-123456789';
document.body.appendChild(newElement);
const root = ReactDOM.createRoot(newElement);

const styles = {
    Box: {
        boxSizing: 'border-box',
        position: 'fixed',
        top: 11,
        right: 11,
        border: '3px black solid',
        borderStyle: 'inset',
        boxShadow: '5px 10px 8px #888888',
        width: 300,
        height: 300,
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

        <Box sx={styles.Box}>
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
            <Box sx={{
                width: 300,
                height: 200,
                overflowY: 'auto', // Makes the content scrollable
                padding: 2,
                border: '1px solid #ddd',
                boxShadow: 2,
            }}>
                {imageDescription}
            </Box>
        </Box>
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
