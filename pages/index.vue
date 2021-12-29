<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="logo py-4">
        <h1>棒グラフと線グラフ</h1>
        <chart></chart>
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
import Chart from "~/components/Chart.vue"


@Component({
  components: {
    ReccomendedBook,
    Chart,
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
.reccomended-books{
  display: flex;
  height: 100px;
  align-items: center;
}
</style>
