import React, {useEffect, useState} from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ musicAPI, currentAudio }) => {
    const [currentMusicDetails, setCurrentMusicDetails] = useState(musicAPI[0]);
    const [audioProgress, setAudioProgress] = useState(0);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [musicIndex, setMusicIndex] = useState(0);
    const [musicTotalLength, setMusicTotalLength] = useState('00:00');
    const [musicCurrentTime, setMusicCurrentTime] = useState('00:00');

    useEffect(() => {
        const audio = currentAudio.current;
        if (audio) {
            const updateDuration = () => {
                setMusicTotalLength(formatTime(audio.duration));
            };
            audio.addEventListener('loadedmetadata', updateDuration);
            return () => {
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [currentMusicDetails]);

    const updateCurrentMusicDetails = (index) => {
        const musicObject = musicAPI[index];
        currentAudio.current.src = musicObject.songSrc;
        setCurrentMusicDetails(musicObject);
        setMusicIndex(index);
        setIsAudioPlaying(true);
        currentAudio.current.addEventListener('canplay', () => {
            currentAudio.current.play();
            setIsAudioPlaying(true);
        }, { once: true });
    };

    const handleNextSong = () => {
        const nextIndex = (musicIndex + 1) % musicAPI.length;
        updateCurrentMusicDetails(nextIndex);
    };

    const handlePrevSong = () => {
        const prevIndex = (musicIndex - 1 + musicAPI.length) % musicAPI.length;
        updateCurrentMusicDetails(prevIndex);
    };

    const handleAudioPlay = () => {
        if (currentAudio.current.paused) {
            currentAudio.current.play();
            setIsAudioPlaying(true);
        } else {
            currentAudio.current.pause();
            setIsAudioPlaying(false);
        }
    };

    const handleAudioUpdate = () => {
        const duration = currentAudio.current.duration || 0;
        const currentTime = currentAudio.current.currentTime || 0;
        setMusicTotalLength(formatTime(duration));
        setMusicCurrentTime(formatTime(currentTime));
        setAudioProgress((currentTime / duration) * 100 || 0);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (e) => {
        const progress = e.target.value;
        currentAudio.current.currentTime = (progress / 100) * currentAudio.current.duration;
        setAudioProgress(progress);
    };

    return (
        <div className="music-container">
            <audio
                ref={currentAudio}
                src={currentMusicDetails.songSrc}
                onTimeUpdate={handleAudioUpdate}
                onEnded={handleNextSong}
            ></audio>
            <p className="musicPlayer">Music Player</p>
            <p className="music-Head-Name">{currentMusicDetails.songName}</p>
            <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
            <img
                src={currentMusicDetails.songAvatar}
                id="songAvatar"
                alt={currentMusicDetails.songName}
            />
            <div className="musicTimerDiv">
                <p className="musicCurrentTime">{musicCurrentTime}</p>
                <p className="musicTotalLength">{musicTotalLength}</p>
            </div>
            <input
                type="range"
                className="musicProgressBar"
                value={audioProgress}
                onChange={handleProgressChange}
            />
            <div className="musicControlers">
                <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
                <i
                    className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`}
                    onClick={handleAudioPlay}
                ></i>
                <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
            </div>

        </div>
    );
};

export default AudioPlayer;
