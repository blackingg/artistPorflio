import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeIn", delay: 0.2 }}
      className="absolute bottom-0 lg:bottom-1 left-1/2 -translate-x-1/2 text-white text-sm whitespace-nowrap"
    >
      <Link
        to="https://mubarakodetunde-portfolio.netlify.app"
        target="_blank"
      >
        Made by <span className="text-[#ca2d2d]">Mubarak Odetunde</span>
      </Link>
    </motion.div>
  );
};

export default Footer;
