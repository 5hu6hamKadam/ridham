<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-autocomplete
        color="white"
        class="mt-4"
        autofocus
        v-model="model"
        :items="searchItems"
        :loading="isLoading"
        :search-input.sync="search"
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        @input="onSearchClick($event)"
      ></v-autocomplete>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { NAV_ITEMS, APP_NAME } from '~/constants'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      items: NAV_ITEMS,
      title: APP_NAME,
      searchItems: [],
      model: '',
      search: '',
      isLoading: false,
    }
  },
  watch: {
    async search(query) {
      if (!query) {
        this.articles = []
        return
      }

      const items = await this.$content('songs')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .limit(12)
        .search(query)
        .fetch()
      this.searchItems = items.map(({ title, slug }) => ({
        text: title,
        value: slug,
      }))
    },
  },
  methods: {
    onSearchClick(slug) {
      this.$router.push({ path: `/songs/${slug}` })
    },
  },
}
</script>
