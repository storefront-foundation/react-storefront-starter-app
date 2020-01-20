import colors from './colors'

export default function createMedia(id, color) {
  return {
    full: [color].map(key => ({
      src: `https://via.placeholder.com/600x600/${colors[key].background}/${
        colors[key].foreground
      }?text=${encodeURIComponent('Product ' + id)}`,
      alt: `Product ${id}`,
      magnify: {
        height: 1200,
        width: 1200,
        src: `https://via.placeholder.com/1200x1200/${colors[key].background}/${
          colors[key].foreground
        }?text=${encodeURIComponent('Product ' + id)}`,
      },
    })),
    thumbnails: [color].map(key => ({
      src: `https://via.placeholder.com/400x400/${colors[key].background}?text=${encodeURIComponent(
        `Product ${id}`
      )}`,
      alt: key,
    })),
  }
}
