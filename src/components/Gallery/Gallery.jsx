import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";

const Gallery = () => {
  const galleryData = {
    "2024": [
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791111/ABRAXAS-Gallery24/ooc5jgmm8myaieky4pbt.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791095/ABRAXAS-Gallery24/wamjxelybf8wcyl6dico.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791271/ABRAXAS-Gallery24/j8l7cfxtxgiitoxbh4qz.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791253/ABRAXAS-Gallery24/ndakojgncvvfzoxxvkgi.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791133/ABRAXAS-Gallery24/bbziza0ffuqnqhrg3re5.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791241/ABRAXAS-Gallery24/hpopde3httnqpyvnwn2o.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791127/ABRAXAS-Gallery24/fldhgtujt5fc4npg8bcq.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791081/ABRAXAS-Gallery24/s5zbyqui5zv3b0dfbxbj.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791050/ABRAXAS-Gallery24/ou0mggpmpie6nxze3fvy.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791047/ABRAXAS-Gallery24/vqtswrd0uiia6vuijaxy.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791263/ABRAXAS-Gallery24/tde9p4okprtudkcaazre.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791066/ABRAXAS-Gallery24/yyqwf9x1uymoxz7fnsdk.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712790962/ABRAXAS-Gallery24/pude5plcom6q0xbtq2dy.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712793846/ABRAXAS-Gallery24/tfo3lskopqcx1uccmv6m.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712791247/ABRAXAS-Gallery24/yivjfkaqdkt4sxxb9vo4.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269369/Screenshot_20240818-184421_fdkyb6.png",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269369/Screenshot_20250131-015712_Photos_aq4hzd.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269369/Screenshot_20250131-015648_Photos_foxja7.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269369/Screenshot_20250131-015738_Photos_ub228u.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269370/Screenshot_20250131-015833_Photos_idujq9.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269369/Screenshot_20250131-015755_Photos_yzjgje.jpg"
    ],
    "2023": [
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786020/ABRAXAS-Gallery/p4bfierd3hosdoawdzsy.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786006/ABRAXAS-Gallery/da1doedbfe6wfipyavmj.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786046/ABRAXAS-Gallery/czvg2fqh4pvsxnkezygo.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786102/ABRAXAS-Gallery/isrmwvh6wrzphavwqwz0.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786158/ABRAXAS-Gallery/wwfnjka7a7f79sms8k3h.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786128/ABRAXAS-Gallery/c8bzhu4vs5q7pac4lhg7.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786235/ABRAXAS-Gallery/rg85siezkcvt2bqp0wvz.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786260/ABRAXAS-Gallery/tepp6edaclwjozdlka9c.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786197/ABRAXAS-Gallery/fk5bva4o27pzmhpkasms.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786189/ABRAXAS-Gallery/jkxzltsyrq2ougu3g7yx.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786196/ABRAXAS-Gallery/beojwnkbswr2bp0yqge6.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786183/ABRAXAS-Gallery/j67owgbkvtsjerbotvob.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786228/ABRAXAS-Gallery/tfopj6kz3nyxfhx2s1ae.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786260/ABRAXAS-Gallery/ziuw6xbziugszlap3dvf.jpg",
      "https://res.cloudinary.com/dyq1mioyr/image/upload/v1712786178/ABRAXAS-Gallery/a7txsa3jgy3ibf0hq6gh.jpg"
    ],
    "2025": [
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269372/Screenshot_20250131-015950_Photos_uhykne.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269371/Screenshot_20250131-015927_Photos_l0uv7j.png",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1738269372/Screenshot_20250131-020027_Photos_zxmpqf.png",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082714/WhatsApp_Image_2025-03-27_at_19.04.38_1_plfgii.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082714/WhatsApp_Image_2025-03-27_at_19.04.38_xlyv3m.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082715/WhatsApp_Image_2025-03-27_at_19.04.40_r6nnys.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082717/WhatsApp_Image_2025-03-27_at_19.04.32_1_wrbqpk.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082718/WhatsApp_Image_2025-03-27_at_19.04.33_v61wkt.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082718/WhatsApp_Image_2025-03-27_at_19.04.32_2_syh2b7.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082715/WhatsApp_Image_2025-03-27_at_19.04.35_1_ktbqqe.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082715/WhatsApp_Image_2025-03-27_at_19.04.37_1_htpwyt.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082716/WhatsApp_Image_2025-03-27_at_19.04.37_mg9xlk.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082716/WhatsApp_Image_2025-03-27_at_19.04.35_qlocpd.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082716/WhatsApp_Image_2025-03-27_at_19.04.34_2_bdccj0.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082716/WhatsApp_Image_2025-03-27_at_19.04.34_1_xdtmbb.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082717/WhatsApp_Image_2025-03-27_at_19.04.34_z8lk1v.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082718/WhatsApp_Image_2025-03-27_at_19.04.33_2_okvkys.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082718/WhatsApp_Image_2025-03-27_at_19.04.33_3_md4hsf.jpg",
      "https://res.cloudinary.com/dlw2rmxyi/image/upload/v1743082719/WhatsApp_Image_2025-03-27_at_19.04.33_1_py7ikr.jpg"
    ],
    "2026": []
  };

  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (imageSrc, index) => {
    setSelectedImage(imageSrc);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + galleryData[selectedYear].length) % galleryData[selectedYear].length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryData[selectedYear][newIndex]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % galleryData[selectedYear].length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryData[selectedYear][newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === "ArrowLeft") handlePrevImage(e);
        if (e.key === "ArrowRight") handleNextImage(e);
        if (e.key === "Escape") setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentImageIndex, selectedYear]);

  return (
    // ---- CHANGED: removed h-screen overflow-y-auto so window.scrollTo works ----
    <div className="min-h-screen w-full bg-black overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl md:text-4xl font-bold text-white mb-3 text-center tracking-widest"
        >
          GALLERY
        </h1>
        <div className="w-12 h-px bg-white/20 mx-auto mb-8"></div>

        {/* Year Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {Object.keys(galleryData).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border
                ${selectedYear === year
                  ? "bg-white/10 text-white border-white/30 scale-105"
                  : "bg-transparent text-white/40 border-white/10 hover:bg-white/5 hover:text-white/70"
                }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4"
        >
          <AnimatePresence>
            {galleryData[selectedYear].length === 0 ? (
              <motion.div
                className="col-span-3 text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/30 text-lg">
                  No photos yet for {selectedYear}. Check back soon.
                </p>
              </motion.div>
            ) : (
              galleryData[selectedYear].map((image, index) => (
                <motion.div
                  key={image}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group relative cursor-pointer"
                  onClick={() => handleImageClick(image, index)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] group-hover:border-white/20 transition-all duration-500">

                    {/* Image — zoom + dim on hover */}
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-60"
                    />

                    {/* Gradient overlay slides up from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-2xl" />

                    {/* Top-right counter badge fades in */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-white/70 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {index + 1} / {galleryData[selectedYear].length}
                      </span>
                    </div>

                    {/* Bottom label slides up */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-white/80" />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-white font-medium tracking-wide">
                            View Photo
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
                          <span className="text-white text-xs">↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative w-full max-w-7xl px-4">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-[85vh] object-contain rounded-2xl"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Gallery;