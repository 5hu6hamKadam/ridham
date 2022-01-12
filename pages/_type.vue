<template>
  <v-row>
    <template v-if="songs.length">
      <v-col cols="12">
        <h1 class="text-capitalize">{{ $route.params.type }}</h1>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-for="song of songs" :key="song.id">
        <SongItem :song="song" />
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="page" :length="length" circle></v-pagination
      ></v-col>
    </template>
  </v-row>
</template>

<script>
import SongItem from '~/components/SongItem.vue'
import { getFavorites, isFavorite } from '~/utils/favorites'
export default {
  components: { SongItem },
  head() {
    return {
      title: 'Get Hindi and English guitar tabs',
      description: 'Ridham Get hindi and english songs guitar tabs and chords',
    }
  },
  async asyncData({ $content, params }) {
    const page = 1,
      perPage = 10,
      { type } = params
    let length = 0,
      songs = []
    if (type !== 'favorites') {
      length = Math.ceil(
        (
          await $content('songs')
            .only([])
            .where({ tags: { $contains: type } })
            .fetch()
        ).length / perPage
      )
      songs = await $content('songs')
        .only(['title', 'src', 'slug'])
        .limit(perPage)
        .where({ tags: { $contains: type } })
        .skip((page - 1) * perPage)
        .fetch()
    }
    return { songs, page, length, isFavorite: false }
  },
  mounted() {
    if (this.$route.params.type === 'favorites') {
      this.songs = getFavorites()
    }
  },
}
</script>
