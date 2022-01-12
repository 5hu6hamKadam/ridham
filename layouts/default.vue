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
          <v-list-item-action v-if="item && item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="item && item.title">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app v-click-outside="onClickOutside">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        v-if="!isSearch"
        class="d-block d-md-none"
        v-text="title"
      />
      <v-toolbar-title class="d-none d-md-block" v-text="title" />
      <v-spacer />
      <v-btn
        fab
        v-if="!isSearch"
        class="d-block d-md-none"
        @click="isSearch = true"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-autocomplete
        color="white"
        class="mt-7 d-md-none"
        v-if="isSearch"
        autofocus
        clearable
        v-model="model"
        :items="searchItems"
        :loading="isLoading"
        :search-input.sync="search"
        placeholder="Start typing to Search"
        prepend-inner-icon="mdi-magnify"
        solo
        @input="onSearchClick($event)"
      ></v-autocomplete>
      <v-autocomplete
        color="white"
        class="mt-7 d-none d-md-flex"
        clearable
        autofocus
        v-model="model2"
        :items="searchItems"
        :loading="isLoading"
        solo
        :search-input.sync="search2"
        placeholder="Start typing to Search"
        prepend-inner-icon="mdi-magnify"
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
      model2: '',
      search: '',
      search2: '',
      isLoading: false,
      isSearch: false,
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
    async search2(query) {
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
      if (slug) {
        this.$router.push({ path: `/songs/${slug}` })
      }
    },
    onClickOutside() {
      console.log('outside')
      if (this.isSearch) {
        this.isSearch = false
      }
    },
  },
}
</script>
