<template>
  <v-card v-if="song" :to="`/songs/${song.slug}`">
    <v-img
      :src="song.src"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
      height="200px"
    >
      <v-card-title v-if="song.title">
        {{ song.title }}
      </v-card-title>
    </v-img>
  </v-card>
</template>
<script>
export default {
  props: ['song'],
}
</script>
