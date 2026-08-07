/**
 * On-demand library loading.
 *
 * Chart.js, Leaflet and AOS used to be imported eagerly by main.js, so all
 * three shipped on every one of the 41 pages. In practice Chart.js is used on
 * 7 pages, Leaflet on 3, and AOS on none (no page carries a `data-aos`
 * attribute). Each is now fetched only when the page actually contains the
 * element that needs it, as a separate chunk Vite code-splits out.
 *
 * Usage:
 *
 *   const Chart = await loadChart()
 *   new Chart(ctx, config)
 *
 * Each loader caches its promise, so concurrent callers share one request.
 */

const cache = new Map()

function once(key, loader) {
  if (!cache.has(key)) {
    cache.set(
      key,
      loader().catch((err) => {
        cache.delete(key)
        throw err
      })
    )
  }
  return cache.get(key)
}

/** Chart.js with all controllers registered. Resolves to the Chart class. */
export function loadChart() {
  return once('chart', async () => {
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)
    return Chart
  })
}

/** Leaflet plus its stylesheet. Resolves to the L namespace. */
export function loadLeaflet() {
  return once('leaflet', async () => {
    const [L] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
    return L.default ?? L
  })
}

/** AOS plus its stylesheet. Resolves to the AOS namespace. */
export function loadAOS() {
  return once('aos', async () => {
    const [AOS] = await Promise.all([import('aos'), import('aos/dist/aos.css')])
    return AOS.default ?? AOS
  })
}

export default { loadChart, loadLeaflet, loadAOS }
