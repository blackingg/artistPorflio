import { IoCloseOutline, IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-[#252323] p-6 rounded-lg max-w-lg w-[80%] md:w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white lg:text-gray-400 lg:hover:text-white"
        >
          <IoCloseOutline size={28} />
        </button>
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-[#dfff1d]">{album.title}</h3>
        </div>
        <div className="flex gap-5">
          <img
            src={album.image}
            alt={album.title}
            className="m-auto w-36 md:w-48 h-36 md:h-48 rounded-md object-cover transform transition-transform duration-300 hover:scale-105 lg:brightness-50 hover:brightness-100"
          />
          <ul className="max-h-60 w-full overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-[#dfff1d] scrollbar-track-gray-700">
            {album.songs.map((song, index) => (
              <li
                key={index}
                className="py-2 border-b border-gray-700 last:border-b-0 text-white flex justify-between items-center whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <span className="mr-2">{song.name}</span>
                <button
                  onClick={() => togglePlayPause(song)}
                  className="text-sm text-white px-2 py-1 rounded hover:text-[#dfff1d] transition-all duration-300"
                >
                  {currentPlaying === song ? (
                    <IoPauseSharp
                      size={24}
                      color="#dfff1d"
                    />
                  ) : (
                    <IoPlaySharp size={24} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Modal;
