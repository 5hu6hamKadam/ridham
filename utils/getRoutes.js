export default async () => {
  const { $content } = require('@nuxt/content')
  const files = await $content('songs').only(['slug']).fetch()

  return files.map((s) => `/songs/${s}`)
}
