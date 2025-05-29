// src/components/work/project-gallery.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  videos?: string[]
  title: string
}

export function ProjectGallery({ images, videos = [], title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVideo, setIsVideo] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)

  const allMedia = [...images, ...videos]
  const totalMedia = allMedia.length

  const openLightbox = (index: number, isVideoItem = false) => {
    setCurrentIndex(index)
    setIsVideo(isVideoItem)
    setLightboxOpen(true)
    setVideoPlaying(false)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setVideoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalMedia) % totalMedia)
    setIsVideo(currentIndex - 1 >= images.length)
    setVideoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia)
    setIsVideo(currentIndex + 1 >= images.length)
    setVideoPlaying(false)
  }

  const toggleVideoPlay = () => {
    const video = document.getElementById('lightbox-video') as HTMLVideoElement
    if (video) {
      if (videoPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setVideoPlaying(!videoPlaying)
    }
  }

  const toggleVideoMute = () => {
    const video = document.getElementById('lightbox-video') as HTMLVideoElement
    if (video) {
      video.muted = !videoMuted
      setVideoMuted(!videoMuted)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-display font-bold">Project Gallery</h2>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Image */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Card className="overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
              <div className="relative aspect-[16/9]">
                <Image
                  src={images[0]}
                  alt={`${title} - Main image`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Maximize2 className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Additional Images */}
        {images.slice(1).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
          >
            <Card 
              className="overflow-hidden group cursor-pointer" 
              onClick={() => openLightbox(index + 1)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Maximize2 className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Videos */}
        {videos.map((video, index) => (
          <motion.div
            key={`video-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (images.length + index) * 0.1 }}
          >
            <Card 
              className="overflow-hidden group cursor-pointer" 
              onClick={() => openLightbox(images.length + index, true)}
            >
              <div className="relative aspect-[16/9]">
                <video
                  src={video}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              {totalMedia > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToPrevious()
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToNext()
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Media Content */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {currentIndex < images.length ? (
                  // Image
                  <div className="relative max-w-full max-h-full">
                    <Image
                      src={allMedia[currentIndex]}
                      alt={`${title} - Image ${currentIndex + 1}`}
                      width={1200}
                      height={800}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                ) : (
                  // Video
                  <div className="relative max-w-full max-h-full">
                    <video
                      id="lightbox-video"
                      src={allMedia[currentIndex]}
                      className="max-w-full max-h-full object-contain"
                      controls={false}
                      muted={videoMuted}
                      playsInline
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={toggleVideoPlay}
                        >
                          {videoPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={toggleVideoMute}
                        >
                          {videoMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Counter */}
              {totalMedia > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {totalMedia}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}