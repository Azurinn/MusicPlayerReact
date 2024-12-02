import React, { useRef, useState } from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import ChangeBackgroundButton from "./components/ChangeBackgroundButton/ChangeBackgroundButton.jsx";

function App() {
    const currentAudio = useRef();
    const musicAPI = [
        {
            songName: 'Building Dreams',
            songArtist: 'Aylex',
            songSrc: '../public/songs/Aylex-BuildingDreams.mp3',
            songAvatar: '../public/images/img1.jpeg',
        },
        {
            songName: 'Worlds',
            songArtist: 'Aylex',
            songSrc: '../public/songs/Aylex-Worlds.mp3',
            songAvatar: '../public/images/img2.jpeg',
        },
        {
            songName: 'Lukrembo',
            songArtist: 'Bread',
            songSrc: '../public/songs/Lukrembo-Bread.mp3',
            songAvatar: '../public/images/img3.jpeg',
        },
    ];
    const vidArray = ['../public/videos/video1.mp4', '../public/videos/video2.mp4', '../public/videos/video3.mp4'];

    const [videoIndex, setVideoIndex] = useState(0);

    const handleChangeBackground = () => {
        setVideoIndex((prevIndex) => (prevIndex + 1) % vidArray.length);
    };

    return (
        <div className="container">
            <BackgroundVideo src={vidArray[videoIndex]} />
            <div className="blackScreen"></div>
            <AudioPlayer currentAudio={currentAudio} musicAPI={musicAPI} />
            <ChangeBackgroundButton onChangeBackground={handleChangeBackground} />
        </div>
    );
}

export default App;
