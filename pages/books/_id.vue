<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="6">
      <div class="intro-content">
        <img :src="thumbnailUrl" />
        <div class="book-explain">
          <div>totalRanking, yearlyRanking, monthlyRanking</div>
          <div>{{ title }}</div>
          <div>著者 : {{ authors }}</div>
          <div>出版日 : {{ publicationData }}</div>
        </div>
      </div>
      <v-divider />
      <div class="qiita-content">
        <div>LGTM : {{ qiitaLgtm }}</div>
        <div>qiitaTags : {{ qiitaTags }}</div>
        <div>qiitaTitles : {{ qiitaTitles }}</div>
      </div>
      <v-divider />
      <div class="explanation-content">
        <div>explanation : {{ explanation }}</div>
        <div>affiliateUrl : {{ affiliateUrl }}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import { Context } from '@nuxt/types'

@Component({
  async asyncData(context: Context) {
    const { store, route } = context

    const bookId = route.params.id  // dose get data?
    await store.dispatch("reccomendedBook/setReccomendedBook", bookId)

    const title = store.getters['reccomendedBook/title']
    const authors = store.getters['reccomendedBook/authors']
    const publicationData = store.getters['reccomendedBook/publicationData']
    const explanation = store.getters['reccomendedBook/explanation']
    const thumbnailUrl = store.getters['reccomendedBook/thumbnailUrl']
    const affiliateUrl = store.getters['reccomendedBook/affiliateUrl']
    const qiitaLgtm = store.getters['reccomendedBook/qiitaLgtm']
    const qiitaTitles = store.getters['reccomendedBook/qiitaTitles']
    const qiitaTags = store.getters['reccomendedBook/qiitaTags']

    return{
      title: title,
      authors: authors,
      publicationData: publicationData,
      explanation: explanation,
      thumbnailUrl: thumbnailUrl,
      affiliateUrl: affiliateUrl,
      qiitaLgtm: qiitaLgtm,
      qiitaTitles: qiitaTitles,
      qiitaTags: qiitaTags
    }
  }
})
export default class Id extends Vue{
  // vue getters
  get title(){
    return this.$store.getters['reccomendedBook/title']
  }
  get authors(){
    return this.$store.getters['reccomendedBook/authors']
  }
  get publicationData(){
    return this.$store.getters['reccomendedBook/publicationData']
  }
  get explanation(){
    return this.$store.getters['reccomendedBook/explanation']
  }
  get thumbnailUrl(){
    return this.$store.getters['reccomendedBook/thumbnailUrl']
  }
  get affiliateUrl(){
    return this.$store.getters['reccomendedBook/affiliateUrl']
  }
  get qiitaLgtm(){
    return this.$store.getters['reccomendedBook/qiitaLgtm']
  }
  get qiitaTitles(){
    return this.$store.getters['reccomendedBook/qiitaTitles']
  }
  get qiitaTags(){
    return this.$store.getters['reccomendedBook/qiitaTags']
  }
}
</script>
<style lang="scss">
.intro-content{
  height: 200px;
  img{
    float: left;
  }
  .book-explain{
    float: right;
  }
}
</style>
