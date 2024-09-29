import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-sm whitespace-nowrap">
      <Link
        to="https://mubarakodetunde-portfolio.netlify.app"
        target="_blank"
      >
        Made by <span className="text-[#ca2d2d]">Mubarak Odetunde</span>
      </Link>
    </div>
  );
};

export default Footer;
