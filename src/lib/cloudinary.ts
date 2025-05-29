import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'lumina-creative',
    transformation: [
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  })

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
  }
}

export async function uploadVideo(file: File): Promise<UploadResult> {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: 'video',
    folder: 'lumina-creative/videos',
    transformation: [
      { quality: 'auto' },
      { video_codec: 'auto' }
    ]
  })

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
  }
}

export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
  } = {}
) {
  const { width, height, quality = 'auto', format = 'auto' } = options
  
  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    fetch_format: format,
    crop: 'fill',
    gravity: 'auto'
  })
}