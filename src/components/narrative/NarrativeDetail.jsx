import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, UserPen } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

const NarrativeDetail = ({ narrative }) => {
  const { title, content, publishedAt, images = [], author } = narrative;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 space-y-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-lg sm:text-3xl font-bold text-primary">{title}</h1>
        <motion.div
          className="flex flex-col gap-2 text-sm pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <UserPen size={16} />
            {author?.name}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(new Date(publishedAt))}
          </div>
        </motion.div>
      </motion.div>

      {/* Image Carousel */}
      {images.length > 0 ? (
        <div className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden rounded-sm bg-gray-100">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full h-full object-cover"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm hover:bg-primary/20"
                onClick={goToPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm hover:bg-primary/20"
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </>
          )}

          {images.length > 1 && (
            <motion.div
              className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}

          {images.length <= 5 && images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">Tidak ada gambar.</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="prose max-w-none prose-sm sm:prose-base md:prose-lg 
                   prose-p:mb-6 prose-p:leading-relaxed 
                   prose-headings:mb-4 prose-headings:mt-8
                   prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-2
                   text-gray-700 leading-relaxed"
      >
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="space-y-4 [&>p]:mb-6 [&>h1]:mb-4 [&>h1]:mt-8 
                     [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:mb-4 [&>h3]:mt-6
                     [&>ul]:mb-6 [&>ol]:mb-6 [&>blockquote]:mb-6
                     [&>div]:mb-4 [&>*]:leading-relaxed"
        />
      </motion.div>
    </motion.div>
  );
};

export default NarrativeDetail;
