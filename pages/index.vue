<template>
  <v-row>
    <v-col cols="12">
      <h1>Free Hindi and English songs guitar tabs</h1>
    </v-col>
    <template v-if="songs">
      <v-col cols="12" sm="6" md="4" v-for="song of songs" :key="song.id">
        <SongItem :song="song" />
      </v-col>
    </template>

    <v-col cols="12">
      <v-pagination v-model="page" :length="length" circle></v-pagination
    ></v-col>
  </v-row>
</template>

<script>
import SongItem from '~/components/SongItem.vue'
export default {
  components: { SongItem },
  name: 'IndexPage',
  head() {
    return {
      title: 'Home | Get hindi and english guitar tabs',
      description: 'Ridham Get hindi and english songs guitar tabs and chords',
    }
  },
  async asyncData({ $content }) {
    const page = 1
    const perPage = 10
    const length = Math.ceil(
      (await $content('songs').only([]).fetch()).length / perPage
    )
    const songs = await $content('songs')
      .only(['title', 'src', 'slug'])
      .limit(perPage)
      .skip((page - 1) * perPage)
      .fetch()
    return { songs, page, length }
  },
}
</script>
