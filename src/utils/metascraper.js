const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-logo')(),
  // require('metascraper-logo-favicon')(),
  require('metascraper-title')()
])

const superagent = require('superagent')

async function fetchMeta (targetUrl) {
  const { xhr: { response: html }, req: { url } } = await superagent.get(targetUrl)
  const metadata = await metascraper({ html, url })
  // console.log(html)
  // console.log(url)
  console.log(metadata)
  return metadata
}

export default fetchMeta
