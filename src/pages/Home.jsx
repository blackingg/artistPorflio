import React, { useState } from "react";
import { motion } from "framer-motion";
import AlbumCard from "../components/AlbumCard";
import Modal from "../components/Modal";
import { albums } from "../data";

const HomePage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="bg-black w-screen h-screen overflow-hidden px-10">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 5,
          stiffness: 40,
          restDelta: 0.001,
          duration: 0.3,
        }}
        className="absolute top-1/2 -translate-y-1/2 font-bold mb-4 text-6xl md:text-[11rem] text-[#dfff1d] fire-sans"
      >
        DA FASH
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.2 }}
        className="absolute w-[60%] bottom-7 right-10 flex gap-4 overflow-x-auto pb-4 text-white scrollbar-thin scrollbar-thumb-[#dfff1d] scrollbar-track-black"
      >
        {albums
          .slice()
          .reverse()
          .map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AlbumCard
                album={album}
                onClick={() => handleAlbumClick(album)}
              />
            </motion.div>
          ))}
      </motion.div>

      {selectedAlbum && (
        <Modal
          album={selectedAlbum}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomePage;
