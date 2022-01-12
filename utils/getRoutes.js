export default async () => {
  const { $content } = require('@nuxt/content')
  const files = await $content('songs').only(['slug']).fetch()
  console.log(files)
  return files.map((s) => `/songs/${s.slug}`)
}
