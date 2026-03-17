import { motion } from "framer-motion";
import SUNSET from "../assets/sunrise-1.png"
import NIGHT from "../assets/night-1.png"
import SUNRISE from "../assets/night-2.png"
import DAY from "../assets/day-1.png"
import { useTheme } from "../context/ThemeContext";

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const hour=new Date().getHours()
//   const backgroundImage = isDarkMode ? HERO_DARK : HERO_LIGHT;
  const backgroundImage = isDarkMode
  ? hour < 19 ? SUNSET : NIGHT
  : hour < 8 ? SUNRISE : DAY;


  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.8s ease-in-out", // smooth switch
      }}
      className="relative overflow-hidden mb-10 h-[80vh] w-full flex items-center justify-center"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent dark:from-gray-900/80 dark:via-gray-800/60 transition-all duration-500" />

      {/* Hero Text */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-white z-10 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-200">
          Explore luxury hotels, resorts, and cozy homestays across the world — 
          book your next adventure today.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300">
          Book Now
        </button>
      </motion.div>

      {/* Floating Glow Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-1/3 w-72 h-72 bg-blue-400/30 dark:bg-purple-500/30 blur-3xl rounded-full -z-10"
      />
    </section>
  );
};

export default HeroSection;
