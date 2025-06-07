import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

const PublicNarrativeDetail = ({ narrative }) => {
  const { title, content, publishedAt, images, author } = narrative;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full p-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <div className="flex items-center gap-3 text-sm pt-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{author.name}</span>
          <span>|</span>
          <span>{formatDate(new Date(publishedAt))}</span>
        </div>
      </div>

      {/* Image Carousel Section */}
      {images.length > 0 ? (
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-sm">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && images.length <= 5 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">Tidak ada gambar.</div>
          </CardContent>
        </Card>
      )}

      {/* Content Section */}
      <div className="prose max-w-none prose-lg">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default PublicNarrativeDetail;
