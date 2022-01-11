export const addFavorite = (song) => {
  if (process.client) {
    const songs = getFavorites()
    songs && songs.push(song)
    localStorage.setItem('favorites', JSON.stringify(songs))
  }
}

export const removeFavorite = (song) => {
  if (process.client) {
    const songs = getFavorites()
    const list = songs.filter((s) => s && s.slug !== song.slug)
    localStorage.setItem('favorites', JSON.stringify(list))
  }
}
export const getFavorites = () => {
  if (process.client) {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  }
}
export const isFavorite = (song) => {
  if (process.client) {
    return !!getFavorites().find((s) => s.slug === song.slug)
  }
}
