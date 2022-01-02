<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="logo py-4">
        <div class="button-container">
          <v-btn value="total" @click="isSelected('Total')">total</v-btn>
          <v-btn value="yearly" @click="isSelected('Yearly')">yearly</v-btn>
          <v-btn value="monthly" @click="isSelected('Monthly')">monthly</v-btn>
        </div>
        <h1>棒グラフと線グラフ</h1>
        <TypeChart v-if="loaded" />
        <div class="reccomended-books" v-for="(reccomendedBook, $index) in reccomendedBooks" :key="$index">
          <ReccomendedBook :reccomendedBook="reccomendedBook" :term="term" />
        </div>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import ReccomendedBook from "~/components/ReccomendedBook.vue"
import Chart from "~/components/Chart.vue"
import TypeChart from "~/components/TypeChart.vue"
import InfiniteLoading from 'vue-infinite-loading'


@Component({
  components: {
    ReccomendedBook,
    Chart,
    TypeChart,
    InfiniteLoading,
  },
})

export default class Index extends Vue{
  // vue data
  loaded: boolean = false       // is vuex state loaded
  booksLoading: boolean = false // is infinite loading done
  term: string = "Total"

  // vue lifecycle
  async created(){
    await this.setReccomendedBooks(this.term)
  }

  // vue getters
  get reccomendedBooks() :any{
    return this.$store.getters['reccomendedBook/reccomendedBooks']
  }

  // vue methods
  async isSelected(selectedTab :string){
    this.loaded = false
    this.term = selectedTab

    await this.setReccomendedBooks(this.term)
  }

  async setReccomendedBooks(term :string){
    const booksAction = `reccomendedBook/set${term}ReccomendedBooks`
    const titlesAction = `reccomendedBook/set${term}TopFiveTitles`
    const topFivePointsAction = `reccomendedBook/set${term}TopFivePoints`

    try{
      await this.$store.dispatch(booksAction)
      await this.$store.dispatch(titlesAction)
      await this.$store.dispatch(topFivePointsAction)
      this.loaded = true
    }catch(e){
      console.error(e)
    }
  }

  async infiniteHandler($state :any){
    if(this.booksLoading) return
    try{
      this.booksLoading = true
      await this.$store.dispatch('reccomendedBook/addReccomendedBooks', { term: this.term })
      $state.loaded()

    }catch(e){
      $state.completed()

    }finally{
      this.booksLoading = false
    }

  }
}
</script>
<style lang="scss">
.reccomended-books{
  display: flex;
  margin: 30px auto;
  padding: auto;
  height: 100px;
  align-items: center;
}
</style>
