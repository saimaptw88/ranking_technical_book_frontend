<template>
  <v-row justify="center" align="center">
    <v-col cols="10" md="9" sm="8">
      <v-card-title>Overview</v-card-title>
      <v-card-text>This app is for bigginer of system engineers in Japan</v-card-text>
      <v-col class="contents-container">
        <v-layout justify-center>
          <v-btn class="term-btn" @click="isSelected('Total')">total</v-btn>
          <v-btn class="term-btn" @click="isSelected('Yearly')">yearly</v-btn>
          <v-btn class="term-btn" @click="isSelected('Monthly')">monthly</v-btn>
        </v-layout>
        <RankingChart class="ranking-chart" v-if="chart" />
      </v-col>
      <v-col class="reccomended-books" v-for="(reccomendedBook, $index) in reccomendedBooks" :key="$index">
        <v-card class="reccomended-book" hover>
          <ReccomendedBook :reccomendedBook="reccomendedBook" :term="term" />
        </v-card>
      </v-col>
      <infinite-loading v-if="!loading" @infinite="infiniteHandler"></infinite-loading>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import ReccomendedBook from "~/components/ReccomendedBook.vue"
import RankingChart from "~/components/RankingChart.vue"
import InfiniteLoading from 'vue-infinite-loading'


@Component({
  components: {
    ReccomendedBook,
    RankingChart,
    InfiniteLoading,
  },
})

export default class Index extends Vue{
  // vue data
  loading: boolean = true // is vuex state loaded
  chart: boolean = false // chart
  term: string = "Total"

  // vue lifecycle
  async created(){
    await this.setReccomendedBooks(this.term)

    this.chart =true
  }

  // vue getters
  get reccomendedBooks() :any{
    return this.$store.getters['reccomendedBooks/reccomendedBooks']
  }

  // vue methods
  async isSelected(selectedTab :string){
    this.loading = true
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
    }catch(e){
      console.error(e)
      alert("ERROR : cannnot get reccomended books")
    }finally{
      this.loading = false
    }
  }

  async infiniteHandler($state :any){
    try{
      await this.$store.dispatch('reccomendedBooks/addReccomendedBooks', { term: this.term })
      $state.loaded()
    }catch(e){
      $state.completed()
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
