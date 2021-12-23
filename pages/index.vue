<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="logo py-4 d-flex justify-center">
        <v-btn @click="click">components</v-btn>
        <div class="reccomended-books" v-for="reccomendedBook in reccomendedBooks" v-bind:key="reccomendedBook.id">
          <ReccomendedBook :reccomendedBook="reccomendedBook"/>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, } from "nuxt-property-decorator"
import ReccomendedBook from "~/components/ReccomendedBook.vue"

@Component({
  components: {
    ReccomendedBook,
  }
})

export default class Index extends Vue{
  // vue lifecycle
  created(){
    this.$store.dispatch('reccomendedBook/setReccomendedBook')
  }

// vue getters
  get reccomendedBooks() :any{
    return this.$store.getters['reccomendedBook/reccomendedBooks']
  }

  // vue methods
  click(){
    alert("ok")
  }
}
</script>
<style lang="scss">
</style>
