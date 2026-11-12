/**
 * Resolves the backend API base URL dynamically.
 * 
 * Works seamlessly across:
 * - Local development
 * - Local Area Network (LAN / Wi-Fi) devices (e.g. phones, tablets on http://192.168.x.x:5173)
 * - Custom domain names and deployed environments
 * 
 * Prevents hardcoding localhost or fixed loopback IPs so mobile devices
 * on the local network automatically target the hosting computer's IP address.
 */
export function getApiBaseUrl() {
  const envUrl = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    ''
  ).trim()

  // 1. If an environment variable is explicitly provided:
  if (envUrl) {
    // Relative path (e.g. '/api')
    if (envUrl.startsWith('/')) {
      return envUrl.replace(/\/+$/, '')
    }

    try {
      const parsed = new URL(envUrl)
      // If envUrl was configured with a loopback host (localhost / 127.0.0.1)
      // but the user is accessing the site from a mobile phone / LAN device (e.g. 192.168.1.5),
      // dynamically substitute the actual hostname from window.location.
      if (
        typeof window !== 'undefined' &&
        window.location?.hostname &&
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
      ) {
        parsed.hostname = window.location.hostname
        return parsed.origin.replace(/\/+$/, '')
      }
      return envUrl.replace(/\/+$/, '')
    } catch {
      return envUrl.replace(/\/+$/, '')
    }
  }

  // 2. In browser context: dynamically use the current page's hostname with the backend port
  if (typeof window !== 'undefined' && window.location?.hostname) {
    const protocol = window.location.protocol || 'http:'
    const hostname = window.location.hostname
    const port = import.meta.env.VITE_API_PORT || '8000'
    return `${protocol}//${hostname}:${port}`
  }

  return ''
}

