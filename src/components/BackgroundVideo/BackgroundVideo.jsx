import React from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = ({ src }) => {
    return (
        <video className="backgroundVideo" src={src} autoPlay muted loop></video>
    );
};

export default BackgroundVideo;