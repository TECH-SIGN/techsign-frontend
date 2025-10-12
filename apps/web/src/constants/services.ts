import shortVideo from '../assets/short.mp4'

export type ServiceItem = {
  id: string
  title: string
  videoSrc: string
  poster?: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    videoSrc: shortVideo,
  },
  {
    id: 'backend-cloud',
    title: 'Backend & Cloud',
    videoSrc: shortVideo,
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    videoSrc: shortVideo,
  },
]
