// const searchImages = require('pixabay-api')
const superagent = require('superagent')

async function getImageInfo (query, nb) {
  let imageInfo = {}
  let result = []
  const params = {
    q: query,
    image_type: 'photo',
    key: '16350651-505548621f511531f7acfebee',
    per_page: 6,
    page: nb
  }
  try {
    imageInfo = await superagent.get('https://pixabay.com/api/', params)
    const imageInfoJson = JSON.parse(imageInfo.xhr.response)
    const { total, hits } = imageInfoJson
    result = { total, hits }
  } catch (error) {
    console.log(error)
  }
  return result
}

export default getImageInfo
