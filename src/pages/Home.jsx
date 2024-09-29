import { useState } from "react";
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
      <h2 className="absolute top-1/2 -translate-y-1/2 font-bold mb-4 text-6xl md:text-[11rem] text-[#dfff1d] fire-sans">
        DA FASH
      </h2>
      <div className="absolute w-[60%] bottom-0 right-10 flex gap-4 overflow-x-auto pb-4 text-white scrollbar-thin scrollbar-thumb-[#dfff1d] scrollbar-track-black">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={handleAlbumClick}
          />
        ))}
      </div>

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
