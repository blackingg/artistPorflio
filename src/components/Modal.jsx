import { IoCloseOutline, IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ album, onClose }) => {
  const modalRef = useRef();
  const audioRef = useRef(null); // Ref for audio element
  const [currentPlaying, setCurrentPlaying] = useState(null); // To track the playing song

  const handleClickOutside = (e) => {
    // Close the modal if the user clicks outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const togglePlayPause = (song) => {
    // Toggle between play and pause for the clicked song
    if (currentPlaying === song) {
      audioRef.current.pause(); // Pause if the current song is playing
      setCurrentPlaying(null);
    } else {
      audioRef.current.src = song.songUrl; // Set the source for the new song
      audioRef.current.play(); // Play the new song
      setCurrentPlaying(song);
    }
  };

  useEffect(() => {
    const handleSongEnd = () => {
      setCurrentPlaying(null); // Reset when the song ends
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50"
        onClick={handleClickOutside}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#252323] p-6 rounded-lg max-w-lg w-[80%] md:w-full relative"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-2 text-white lg:text-gray-400 lg:hover:text-white"
          >
            <IoCloseOutline size={28} />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-left mb-4"
          >
            <h3 className="text-2xl font-bold text-[#dfff1d]">{album.title}</h3>
          </motion.div>
          <div className="flex gap-3 md:gap-5">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={album.image}
              alt={album.title}
              className="m-auto w-28 md:w-48 h-28 md:h-48 rounded-md object-cover transform transition-transform duration-300 hover:scale-[1.02] lg:brightness-50 hover:brightness-100"
            />
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="max-h-40 md:max-h-48 pr-2 md:pr-3 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#dfff1d] scrollbar-track-transparent"
            >
              {album.songs.map((song, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="py-2 border-b border-gray-700 last:border-b-0 text-white flex justify-between items-center"
                >
                  <span className="mr-2 text-sm sm:text-base truncate flex-grow">
                    {song.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePlayPause(song)}
                      className="p-1 rounded transition-all duration-300"
                    >
                      {currentPlaying === song ? (
                        <IoPauseSharp
                          size={20}
                          className="text-[#dfff1d] hover:text-white transition-colors"
                        />
                      ) : (
                        <IoPlaySharp
                          size={20}
                          className="text-white hover:text-[#dfff1d] transition-colors"
                        />
                      )}
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoMdLink
                        size={20}
                        className="text-white hover:text-[#dfff1d] cursor-pointer"
                      />
                    </motion.a>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} />
    </AnimatePresence>
  );
};

export default Modal;
