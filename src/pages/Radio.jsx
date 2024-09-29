import React, { useState, useEffect, useRef } from "react";
import {
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoShuffleOutline,
  IoRepeatOutline,
  IoListOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { MdSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { albums } from "../data";

const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [repeatMode, setRepeatMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const allSongs = albums.flatMap((album, albumIndex) =>
      album.songs.map((song, songIndex) => ({
        ...song,
        albumTitle: album.title,
        albumImage: album.image,
        uniqueId: `${albumIndex}-${songIndex}`,
        songUrl: song.songUrl,
      }))
    );
    setQueue(allSongs);
    setCurrentSong(allSongs[0]);
  }, []);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.songUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleSongEnd = () => {
      if (repeatMode) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [repeatMode]);

  const handleRepeat = () => {
    setRepeatMode(!repeatMode);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleShuffle = () => {
    setShuffleMode(!shuffleMode);
    if (!shuffleMode) {
      const shuffledQueue = [...queue].sort(() => Math.random() - 0.5);
      setQueue(shuffledQueue);
      setCurrentSong(shuffledQueue[0]);
    } else {
      const orderedQueue = albums.flatMap((album, albumIndex) =>
        album.songs.map((song, songIndex) => ({
          ...song,
          albumTitle: album.title,
          albumImage: album.image,
          uniqueId: `${albumIndex}-${songIndex}`,
          songUrl: song.songUrl,
        }))
      );
      setQueue(orderedQueue);
      setCurrentSong(orderedQueue[0]);
    }
  };

  const handleNextSong = () => {
    const currentIndex = queue.findIndex(
      (song) => song.uniqueId === currentSong.uniqueId
    );
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
    setProgress(0); // Reset progress when changing songs
  };

  const handlePrevSong = () => {
    const currentIndex = queue.findIndex(
      (song) => song.uniqueId === currentSong.uniqueId
    );
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = (x / rect.width) * 100;
    setProgress(clickedValue);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (clickedValue / 100) * audioRef.current.duration;
    }
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-8 pt-20 flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:pr-8 mb-8 md:mb-0">
          <div className="bg-[#252323] rounded-lg p-6 max-w-2xl mx-auto">
            {currentSong && (
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-full h-56 md:h-64 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={currentSong.albumImage}
                    alt={currentSong.albumTitle}
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      clipPath: `inset(0 ${100 - progress}% 0 0)`,
                    }}
                  >
                    <img
                      src={currentSong.albumImage}
                      alt={currentSong.albumTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-full cursor-pointer"
                    onClick={handleSeek}
                  ></div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{currentSong.name}</h2>
                  <p className="text-[#dfff1d]">{currentSong.albumTitle}</p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center space-x-6 mb-8">
              <button
                onClick={handlePrevSong}
                className="text-3xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                <MdSkipPrevious />
              </button>
              <button
                onClick={handlePlayPause}
                className="text-5xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
              </button>
              <button
                onClick={handleNextSong}
                className="text-3xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                <MdOutlineSkipNext />
              </button>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleShuffle}
                className={`text-2xl ${
                  shuffleMode ? "text-[#dfff1d]" : "text-gray-500"
                } lg:hover:text-yellow-300 transition-colors`}
              >
                <IoShuffleOutline />
              </button>
              <button
                onClick={handleRepeat}
                className={`text-2xl ${
                  repeatMode ? "text-[#dfff1d]" : "text-gray-500"
                } lg:hover:text-yellow-300 transition-colors`}
              >
                <IoRepeatOutline />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:w-1/3 bg-[#252323] rounded-lg p-6 overflow-y-auto max-h-screen transition-all duration-300 ease-in-out ${
            showQueue ? "fixed inset-0 z-10 lg:relative" : "hidden lg:block"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#dfff1d]">Queue</h2>
            <button
              onClick={toggleQueue}
              className="lg:hidden text-2xl text-[#dfff1d] lg:hover:text-yellow-300"
            >
              <IoCloseOutline />
            </button>
          </div>
          <ul>
            {queue.map((song) => (
              <li
                key={song.uniqueId}
                className={`py-2 px-4 rounded-lg mb-2 flex items-center ${
                  currentSong && currentSong.uniqueId === song.uniqueId
                    ? "bg-[#dfff1d] text-black"
                    : "lg:hover:bg-gray-800"
                }`}
                onClick={() => setCurrentSong(song)}
              >
                <img
                  src={song.albumImage}
                  alt={song.albumTitle}
                  className="w-10 h-10 object-cover rounded-lg mr-3"
                />
                <div>
                  <p className="font-semibold">{song.name}</p>
                  <p className="text-sm text-gray-400">{song.albumTitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={toggleQueue}
        className="lg:hidden fixed bottom-4 right-4 bg-[#dfff1d] text-black p-3 rounded-full shadow-lg"
      >
        <IoListOutline size={24} />
      </button>

      <audio ref={audioRef} />
    </div>
  );
};

export default Radio;
