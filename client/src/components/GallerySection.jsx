import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IMG1 from "../assets/day-1.png"
import IMG2 from "../assets/hero-1.png"
import IMG3 from "../assets/hero-2.png"
import IMG4 from "../assets/night-1.png"
import IMG5 from "../assets/night-2.png"
import IMG6 from "../assets/sunrise-1.png"

const GallerySection = () => {
    const images = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (<>
        <div className="text-center text-2xl mb-4"> <h2 className="font-bold text-3xl md:text-5xl mb-2 text-blue-500 ">Our Gallery
        </h2><p className="text-gray-500 text-sm max-w-8xl">See the beauty. Feel the comfort. Live the experience.</p></div>
        <motion.section
            key={images[index]}
            style={{
                backgroundImage: `url(${images[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding:"4px"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-120 w-full flex items-center justify-center border mx-auto  rounded-2xl"
        />

    </>


    );
};
export default GallerySection