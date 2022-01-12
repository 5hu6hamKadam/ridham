<template>
  <v-row>
    <v-col cols="12" md="6" order="2"> </v-col>
    <v-col cols="12" md="6" order="1" v-if="song">
      <v-row>
        <v-col cols="12"
          ><v-breadcrumbs class="pa-1" :items="breadcrumbItems"></v-breadcrumbs
        ></v-col>
        <v-col cols="12" class="pt-0">
          <v-img
            :src="song.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            position="left"
          >
          </v-img>
        </v-col>
        <v-col cols="12" class="py-0">
          <h1 class="text-h4" v-if="song.title">{{ song.title }}</h1>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-chip-group>
            <v-chip class="text-capitalize" v-for="tag in song.tags" :key="tag">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12" class="py-1">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="(val, key) in song.info" :key="key">
                  <td class="text-capitalize text-right">{{ key }}</td>
                  <td>{{ val }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12">
          <v-btn outlined color="red" @click="addToFavorites(song)">
            <v-icon left>mdi-heart</v-icon>
            {{ favorite ? 'Remove from' : 'Add to' }} favorites</v-btn
          >
        </v-col>
        <v-col cols="12" class="pt-1">
          <v-divider></v-divider>
        </v-col>
        <v-col class="notes" cols="12" v-html="song.notes"> </v-col>

        <v-btn
          v-if="isIntersecting"
          fab
          class="scroll-to-top-btn"
          @click="toTop()"
        >
          <v-icon>mdi-arrow-up-bold</v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col v-else>
      <v-card>
        <v-card-title>No song found</v-card-title>
      </v-card>
    </v-col>
    <v-col order="3" cols="12" class="pa-0 mt-16">
      <v-footer v-intersect="onIntersect" class="pb-16">
        The articles published on this website is just for educational purposes
        and personal use only. Property and copyrights of songs published on
        this website are of their respective owners. For Copyright infringement
        kindly
        <a class="" href="mailto:1shubhamkadam1@gmail.com">Contact us</a>
      </v-footer>
    </v-col>
  </v-row>
</template>
<script>
import { addFavorite, isFavorite, removeFavorite } from '~/utils/favorites'
export default {
  head() {
    return {
      title: this.song.title,
      description: this.song.title,
    }
  },
  async asyncData({ $content, params }) {
    const song = await $content('songs')
      .where({ slug: { $eq: params.slug } })
      .limit(1)
      .fetch()
    return {
      song: song[0],
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: song[0] && song[0].title,
          disabled: true,
          to: '/',
        },
      ],
      isIntersecting: false,
      favorite: false,
    }
  },
  mounted() {
    this.favorite = isFavorite(this.song)
  },
  methods: {
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    onIntersect(entries, observer) {
      this.isIntersecting = entries[0].isIntersecting
    },
    addToFavorites(song) {
      if (!this.favorite) {
        addFavorite(song)
        this.favorite = true
      } else {
        removeFavorite(song)
        this.favorite = false
      }
    },
  },
}
</script>
<style scoped>
::v-deep .notes p {
  margin-bottom: 0px !important;
  font-family: monospace;
}
::v-deep .scroll-to-top-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
}
</style>
