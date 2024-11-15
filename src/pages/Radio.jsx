import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoShuffleOutline,
  IoRepeatOutline,
  IoListOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { MdSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { albums, queueVariants } from "../data";

const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [originalQueue, setOriginalQueue] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [repeatMode, setRepeatMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const isAudioLoaded = useRef(false);

  const handleSongChange = useCallback(
    (direction) => {
      if (queue.length > 0) {
        const currentIndex = currentSong
          ? queue.findIndex((song) => song.uniqueId === currentSong.uniqueId)
          : -1;
        const newIndex =
          (currentIndex + direction + queue.length) % queue.length;
        setCurrentSong(queue[newIndex]);
        setIsPlaying(true);
        setProgress(0);
      }
    },
    [queue, currentSong]
  );

  const handleNextSong = useCallback(
    () => handleSongChange(1),
    [handleSongChange]
  );
  const handlePrevSong = useCallback(
    () => handleSongChange(-1),
    [handleSongChange]
  );

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
    setOriginalQueue(allSongs);
    if (allSongs.length > 0) {
      setCurrentSong(allSongs[0]);
    }
  }, [albums]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      if (audioRef.current.src !== currentSong.songUrl) {
        audioRef.current.src = currentSong.songUrl;
        isAudioLoaded.current = false;
        audioRef.current.load();
      } else if (!currentSong && audioRef.current) {
        audioRef.current.src = "";
      }
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlayThrough = () => {
      isAudioLoaded.current = true;
      if (isPlaying) {
        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
    };

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleSongEnd = () => {
      if (repeatMode) {
        audio.currentTime = 0;
        audio
          .play()
          .catch((error) => console.error("Error replaying audio:", error));
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [repeatMode, isPlaying, handleNextSong]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRepeat = () => {
    setRepeatMode(!repeatMode);
  };

  const handlePlayPause = useCallback(() => {
    if (!currentSong && queue.length > 0) {
      setCurrentSong(queue[0]);
      setIsPlaying(true);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else if (isAudioLoaded.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          alert("Unable to play the audio. Please try again.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSong, queue, isPlaying]);

  const handleShuffle = () => {
    setShuffleMode(!shuffleMode);
    if (!shuffleMode) {
      const shuffledQueue = [...queue].sort(() => Math.random() - 0.5);
      setQueue(shuffledQueue);
      if (!currentSong) {
        setCurrentSong(shuffledQueue[0]);
      }
    } else {
      setQueue([...originalQueue]);
      if (!currentSong) {
        setCurrentSong(originalQueue[0]);
      }
    }
  };

  const handleSeek = (e) => {
    if (currentSong) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedValue = (x / rect.width) * 100;
      setProgress(clickedValue);
      if (audioRef.current) {
        audioRef.current.currentTime =
          (clickedValue / 100) * audioRef.current.duration;
      }
    }
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };

  const selectSong = (song) => {
    if (currentSong && currentSong.uniqueId === song.uniqueId) {
      handlePlayPause();
    } else {
      const newIndex = queue.findIndex((s) => s.uniqueId === song.uniqueId);
      setCurrentIndex(newIndex);
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  return (
    <motion.div className="bg-black text-white min-h-screen px-4 md:px-8 pt-20 flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:pr-8 mb-8 md:mb-0">
          <motion.div
            transition={{ duration: 0.2, delay: 0 }}
            className="md:absolute md:top-1/2 md:left-[7%] lg:left-[15%] md:-translate-y-1/2 w-full lg:w-[40%] bg-[#252323] rounded-lg p-6 mt-[30%] md:mt-0 max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center mb-6">
              <motion.div
                layoutId="albumCover"
                className="relative w-full h-56 md:h-64 mb-4 overflow-hidden rounded-lg"
              >
                {currentSong ? (
                  <>
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
                      animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    >
                      <img
                        src={currentSong.albumImage}
                        alt={currentSong.albumTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <img
                    src="/img/placeholder.jpg"
                    alt="Placeholder"
                    className="w-full h-auto object-cover filter grayscale"
                  />
                )}
                <div
                  className="absolute top-0 left-0 w-full h-full cursor-pointer"
                  onClick={handleSeek}
                ></div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-semibold">
                  {currentSong ? currentSong.name : "No song selected"}
                </h2>
                <p className="text-[#dfff1d]">
                  {currentSong
                    ? currentSong.albumTitle
                    : "Choose a song to play"}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center items-center space-x-6 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevSong}
                className="text-3xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                <MdSkipPrevious />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="text-5xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextSong}
                className="text-3xl text-[#dfff1d] lg:hover:text-yellow-300 transition-colors"
              >
                <MdOutlineSkipNext />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShuffle}
                className={`text-2xl ${
                  shuffleMode ? "text-[#dfff1d]" : "text-gray-500"
                } lg:hover:text-yellow-300 transition-colors`}
              >
                <IoShuffleOutline />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRepeat}
                className={`text-2xl ${
                  repeatMode ? "text-[#dfff1d]" : "text-gray-500"
                } lg:hover:text-yellow-300 transition-colors`}
              >
                <IoRepeatOutline />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {(showQueue || !isMobile) && (
            <motion.div
              initial={isMobile ? "mobileInitial" : "desktopInitial"}
              animate={isMobile ? "mobileAnimate" : "desktopAnimate"}
              exit={isMobile ? "mobileExit" : "desktopExit"}
              variants={queueVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`lg:w-1/3 bg-[#252323] lg:rounded-lg p-6 overflow-hidden ${
                isMobile
                  ? "fixed inset-x-0 bottom-0 z-20 h-full"
                  : "lg:h-[80vh] fixed inset-0 z-10 lg:relative"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#dfff1d]">Queue</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleQueue}
                  className="lg:hidden text-2xl text-[#dfff1d] hover:text-yellow-300"
                >
                  <IoCloseOutline />
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-[calc(100%-3rem)] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#dfff1d] scrollbar-track-[#252323]"
              >
                <ul className="pb-5">
                  {queue.map((song, index) => (
                    <motion.li
                      key={song.uniqueId}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className={`relative py-2 px-4 rounded-lg mb-2 flex items-center gap-x-2 pr-2 ${
                        currentSong && currentSong.uniqueId === song.uniqueId
                          ? "bg-[#dfff1d] text-black"
                          : "hover:bg-gray-800"
                      }`}
                      onClick={() => selectSong(song)}
                    >
                      <img
                        src={song.albumImage}
                        alt={song.albumTitle}
                        className="w-10 h-10 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <p className="font-semibold">{song.name}</p>
                        <p className="text-sm text-gray-400">
                          {song.albumTitle}
                        </p>
                      </div>
                      <a
                        href={song.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoMdLink
                          size={20}
                          className="hover:scale-105 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleQueue}
        className="lg:hidden fixed bottom-4 right-4 bg-[#dfff1d] text-black p-3 rounded-full shadow-lg"
      >
        <IoListOutline size={24} />
      </motion.button>

      <audio ref={audioRef} />
    </motion.div>
  );
};

export default Radio;
