import React from 'react';
import { CSSProperties } from 'react';

const FooterBar = () => {
    const footerStyle: CSSProperties = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(225,225,225,255)',
        color: 'black',
        textAlign: 'center',
        padding: '10px 0',
        fontWeight: "600"
    };

    return (
        <div style={footerStyle}>
            <div>Powered By <a href="https://finnhub.io" target="_blank">Finnhub.io</a></div> 
        </div>
    );
};

export default FooterBar;