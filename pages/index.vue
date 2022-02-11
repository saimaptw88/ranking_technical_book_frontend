<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="contents-container">
        <div class="term-switch-button">
          <v-btn value="total" @click="isSelected('Total')">total</v-btn>
          <v-btn value="yearly" @click="isSelected('Yearly')">yearly</v-btn>
          <v-btn value="monthly" @click="isSelected('Monthly')">monthly</v-btn>
        </div>
        <v-card-title class="title">棒グラフと線グラフ</v-card-title>
        <RankingChart class="ranking-chart" v-if="loaded" />

        <div class="reccomended-books" v-for="(reccomendedBook, $index) in reccomendedBooks" :key="$index">
          <ReccomendedBook :reccomendedBook="reccomendedBook" :term="term" />
        </div>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </v-card>
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
  margin-top: 100px;
  // background-image: url("@/assets/system_engineer.jpg");
  background-repeat:  no-repeat;
  background-size: 100%;

  .ranking-chart{
    width: 80%;
    margin: 0 auto;
  }
  .reccomended-books{
    display: flex;
    margin: 30px auto;
    padding: auto;
    height: 100px;
    align-items: center;
  }
}
</style>
