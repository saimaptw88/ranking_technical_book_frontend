<template>
  <v-app dark>
    <v-navigation-drawer
      dark
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
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
    <v-app-bar :clipped-left="clipped" color="cyan" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-circle-outline',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-application-brackets-outline',
          title: 'App Design',
          to: '/appDesign',
        },
        {
          icon: 'mdi-account',
          title: 'Developer',
          to: '/developer',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ranking of Technical Books',
    }
  },
}
</script>
<style lang="scss">

</style>
