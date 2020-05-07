const Trianglify = require('trianglify')

function generateTrianglify (targetColor, targetVariance, targetCell) {
  const pattern = Trianglify({
    width: 1920,
    height: 1080,
    x_colors: targetColor,
    variance: targetVariance,
    cell_size: targetCell,
    seed: 1
  }).svg({ includeNamespace: true })
  // Take Trianglify SVG pattern and serialize it into XML string
  const patternString = new XMLSerializer().serializeToString(pattern)
  // URL encode the pattern and set into the proper format for SVG background
  const patternMin = 'url("data:image/svg+xml,' + encodeURIComponent(patternString) + '")'
  return patternMin
}

export default generateTrianglify
