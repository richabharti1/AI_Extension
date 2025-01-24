import React, { useEffect, useRef } from 'react';
import { Button, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import  Frame  from 'react-frame-component'; // react-frame-components

// Create a Material UI theme
const theme = createTheme();

function WrappedFrame({children,...props}) {
    const frameAttribute = {...props};
    const frameStyle = frameAttribute.style;
    const iframeRef = useRef();

    useEffect(() => {
        const iframe = iframeRef.current;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Inject Material UI CSS into the iframe
        const link = iframeDocument.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/mui/5.0.0-beta.0/mui.min.css'; // Use a CDN or a local path for your Material UI CSS
        iframeDocument.head.appendChild(link);

        // Optional: You can also add any custom styles you need
    //     const style = iframeDocument.createElement('style');
    //     style.innerHTML = `
    //   body {
    //     font-family: Arial, sans-serif;
    //     padding: 20px;
    //   }
    // `;
    //     iframeDocument.head.appendChild(style);
    }, []);

    return (
        <Frame ref={iframeRef} style={frameStyle}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Frame>
    );
}

export default WrappedFrame;
