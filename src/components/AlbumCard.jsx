import { albums } from "../data";

const AlbumCard = ({ album, onClick }) => (
  <div
    className="flex-none w-48 cursor-pointer overflow-visible"
    onClick={() => onClick(album)}
  >
    <div className="relative">
      <img
        src={album.image}
        alt={album.title}
        className="w-full h-48 rounded-lg object-cover transform transition-transform duration-300 hover:scale-110 lg:brightness-50 hover:brightness-100"
      />
    </div>
    <p className="mt-2 text-sm text-center text-bold">{album.title}</p>
  </div>
);

export default AlbumCard;
