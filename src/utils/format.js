export function parseNum(str) {
  if (typeof str === 'number') return str
  if (!str) return 0
  const num = parseFloat(String(str).replace(/,/g, ''))
  return isNaN(num) ? 0 : num
}

export function formatDollar(num, compact = false, minFrac = 0, maxFrac = 2) {
  const n = parseNum(num)
  if (compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      minimumFractionDigits: minFrac,
      maximumFractionDigits: maxFrac,
    }).format(n)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  }).format(n)
}

export function formatLargeNumber(num) {
  const n = parseNum(num)
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatNumber(num) {
  const n = parseNum(num)
  return new Intl.NumberFormat('en-US').format(n)
}

export function formatPrecision(num, minFrac = 0, maxFrac = 2) {
  const n = parseNum(num)
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  }).format(n)
}

export const partialNumRegexp = /^(\d+\.?\d*|\.\d*)$/

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function copyText(text) {
  navigator.clipboard.writeText(text).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  })
}




