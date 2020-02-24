import colors, { colorForId } from './colors'
import capitalize from 'lodash/capitalize'
import { loremIpsum } from 'lorem-ipsum'
import qs from 'qs'

function getOptimizedSrc(url, options) {
  return `https://opt.moovweb.net/?${qs.stringify({ ...options, img: url })}`
}

export default function createProduct(id, numColors = 4) {
  const color = colorForId(id)
  const variants = [color, 'red', 'blue']
  const price = (id % 10) * 10 + 0.99

  const getImg = (size, key = color, ignoreText) =>
    getOptimizedSrc(
      `https://via.placeholder.com/${size}/${colors[key].background}/${
        colors[key].foreground
      }?${'text=' + encodeURIComponent(ignoreText ? ' ' : 'Product ' + id)}`,
      { quality: '80', format: 'webp' }
    )

  return {
    id,
    url: `/p/${id}`,
    name: `Product ${id}`,
    price,
    priceText: `$${price}`,
    rating: (10 - (id % 10)) / 2.0,
    thumbnail: {
      src: getImg(400, color),
      alt: `Product ${id}`,
    },
    media: {
      full: variants.map(key => ({
        src: getImg(600, key),
        alt: `Product ${id}`,
        magnify: {
          height: 1200,
          width: 1200,
          src: getImg(1200, key),
        },
      })),
      thumbnails: variants.map(key => ({
        src: getImg(300, key),
        alt: `Product ${id}`,
      })),
    },
    sizes: [
      { id: 'sm', text: 'SM' },
      { id: 'md', text: 'MD' },
      { id: 'lg', text: 'LG' },
      { id: 'xl', text: 'XL', disabled: true },
      { id: 'xxl', text: 'XXL' },
    ],
    description: loremIpsum({ count: 10 }),
    specs: loremIpsum({ count: 10 }),
    colors: Object.keys(colors)
      .slice(0, numColors)
      .map(name => ({
        text: capitalize(name),
        id: name,
        image: {
          src: getImg(48, name, true),
          alt: name,
        },
        media: {
          full: [name, name, name].map(key => ({
            src: getImg(600, key),
            alt: `Product ${id}`,
            magnify: {
              height: 1200,
              width: 1200,
              src: getImg(1200, key),
            },
          })),
          thumbnails: [name, name, name].map(key => ({
            src: getImg(400, key),
            alt: key,
          })),
          thumbnail: [name].map(key => ({
            src: getImg(400, key),
            alt: `Product ${id}`,
          }))[0],
        },
      })),
  }
}
