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
        <!-- <chart></chart> -->
        <TypeChart v-if="loaded" />
        <div class="reccomended-books" v-for="reccomendedBook in reccomendedBooks" v-bind:key="reccomendedBook.id">
          <ReccomendedBook :reccomendedBook="reccomendedBook"/>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import ReccomendedBook from "~/components/ReccomendedBook.vue"
import Chart from "~/components/Chart.vue"
import TypeChart from "~/components/TypeChart.vue"


@Component({
  components: {
    ReccomendedBook,
    Chart,
    TypeChart,
  },
})

export default class Index extends Vue{
  // vue data
  loaded: boolean = false
  tab: string = "Total"

  // vue lifecycle
  async created(){
    await this.setReccomendedBooks(this.tab)
  }

  // vue getters
  get reccomendedBooks() :any{
    return this.$store.getters['reccomendedBook/reccomendedBooks']
  }

  // vue methods
  async isSelected(selectedTab :string){
    this.loaded = false
    this.tab = selectedTab

    await this.setReccomendedBooks(this.tab)
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
}
</script>
<style lang="scss">
.reccomended-books{
  display: flex;
  height: 100px;
  align-items: center;
}
</style>
