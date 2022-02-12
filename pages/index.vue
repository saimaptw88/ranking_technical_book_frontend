<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="6">
      <v-card-title>Overview</v-card-title>
      <v-card-text>This app is for bigginer of system engineers in Japan</v-card-text>
      <v-col class="contents-container">
        <v-layout justify-center>
          <v-btn class="term-btn" @click="isSelected('Total')">total</v-btn>
          <v-btn class="term-btn" @click="isSelected('Yearly')">yearly</v-btn>
          <v-btn class="term-btn" @click="isSelected('Monthly')">monthly</v-btn>
        </v-layout>
        <RankingChart class="ranking-chart" v-if="loaded" />
      </v-col>
      <v-col class="reccomended-books" v-for="(reccomendedBook, $index) in reccomendedBooks" :key="$index">
        <v-card class="reccomended-book" hover>
          <ReccomendedBook :reccomendedBook="reccomendedBook" :term="term" />
        </v-card>
      </v-col>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import ReccomendedBook from "~/components/ReccomendedBook.vue"
import Chart from "~/components/Chart.vue"
import RankingChart from "~/components/RankingChart.vue"
import InfiniteLoading from 'vue-infinite-loading'


@Component({
  components: {
    ReccomendedBook,
    Chart,
    RankingChart,
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
    return this.$store.getters['reccomendedBooks/reccomendedBooks']
  }

  // vue methods
  async isSelected(selectedTab :string){
    this.loaded = false
    this.term = selectedTab

    await this.setReccomendedBooks(this.term)
  }

  isValueSameAsTerm(value: string){
    if(value === this.term) return true;

    return false;
  }

  async setReccomendedBooks(term :string){
    const booksAction = `reccomendedBooks/set${term}ReccomendedBooks`
    const titlesAction = `reccomendedBooks/set${term}TopFiveTitles`
    const topFivePointsAction = `reccomendedBooks/set${term}TopFivePoints`

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
      await this.$store.dispatch('reccomendedBooks/addReccomendedBooks', { term: this.term })
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
.contents-container{
  margin-top: 10px;

  .term-btn{
    width: 30%;
    margin: 0 5px;
  }
  .ranking-chart{
    margin: 10px auto;
  }
  .reccomended-books{
    display: flex;
    padding: auto;
    align-items: center;
  }
}
</style>
