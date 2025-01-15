import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        short_name: 'Babylytics',
        name: 'Babylytics',
        display: 'standalone',
        start_url: '/',
    }
}
