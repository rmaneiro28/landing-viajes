import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ src, alt, className = '', containerClassName = '', priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}>
      {/* Skeleton/Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 shimmer z-0"></div>
      )}

      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full h-full object-cover relative z-10 transition-transform duration-1000 ${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default OptimizedImage;
