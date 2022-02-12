<template>
  <v-row justify="center" align="center">
    <v-col cols="10" md="9" sm="8">
      <v-card class="contents">
        <div class="rankings">
          <div class="ranking">
            <div id="kind">Total Ranking</div>
            <div id="rank">{{totalRanking}}</div>
          </div>
          <div class="ranking">
            <div id="kind">Yearly Ranking</div>
            <div id="rank">{{yearlyRanking}}</div>
          </div>
          <div class="ranking">
            <div id="kind">Monthly Ranking</div>
            <div id="rank">{{monthlyRanking}}</div>
          </div>
        </div>
        <v-divider class="divid" />

        <div class="intro-content">
          <img :src="thumbnailUrl" @click="amazonLink" />
          <div class="book-explain">
            <h1 id="book-title" @click="amazonLink">{{ title }}</h1>
            <div id="author">著者 : {{ authors }}</div>
            <div id="pulication-data">出版日 : {{ publicationData }}</div>
          </div>
        </div>

        <div class="explanation-content">
          <h2>本書紹介</h2>
          <div>{{ explanation }}</div>
        </div>
        <ScrollToTop />
        <v-divider class="divid" />

        <div class="qiita-content">
          <h2>Total LGTM : {{ qiitaLgtm }}</h2>
          <h2>Qiita Tags</h2>
          <QiitaTagsChart />
          <h2>紹介されている記事</h2>
          <ul v-for="(title, index) in qiitaTitles" :key="index">
            <li>{{title}}</li>
          </ul>
        </div>
        <v-btn @click="amazonLink" elevation="10" v-show="buttonActive" class="affiliate-btn white--text" color="#fca13c">Amazon</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import { Context } from '@nuxt/types'
import QiitaTagsChart from "~/components/QiitaTagsChart.vue"
import ScrollToTop from "~/components/ScrollToTop.vue"

@Component({
  components: {
    QiitaTagsChart,
    ScrollToTop,
  },
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
    const qiitaTagTitles = store.getters['reccomendedBook/qiitaTagTitles']
    const totalRanking = store.getters['reccomendedBook/totalRanking']
    const yearlyRanking = store.getters['reccomendedBook/yearlyRanking']
    const monthlyRanking = store.getters['reccomendedBook/monthlyRanking']

    return{
      title: title,
      authors: authors,
      publicationData: publicationData,
      explanation: explanation,
      thumbnailUrl: thumbnailUrl,
      affiliateUrl: affiliateUrl,
      qiitaLgtm: qiitaLgtm,
      qiitaTitles: qiitaTitles,
      qiitaTags: qiitaTags,
      qiitaTagTitles: qiitaTagTitles,
      totalRanking: totalRanking,
      yearlyRanking: yearlyRanking,
      monthlyRanking: monthlyRanking,
    }
  }
})
export default class Id extends Vue{
  //vue data
  buttonActive: boolean = false
  scroll = 0

  // vue lifecycle
  mounted(){
    window.addEventListener('scroll', this.scrollWindow)
  }

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
  get qiitaTagTitles(){
    return this.$store.getters['reccomendedBook/qiitaTagTitles']
  }
  get totalRanking(){
    return this.$store.getters['reccomendedBook/totalRanking']
  }
  get yearlyRanking(){
    return this.$store.getters['reccomendedBook/yearlyRanking']
  }
  get monthlyRanking(){
    return this.$store.getters['reccomendedBook/monthlyRanking']
  }

  // vue methods
  scrollWindow(){
    const top = 100
    this.scroll = window.scrollY

    if(top <= this.scroll){
      this.buttonActive = true
    }else{
      this.buttonActive = false
    }
  }
  amazonLink(){
    window.location.href = this.affiliateUrl
  }
}
</script>
<style lang="scss">
.contents{
  padding: 10px;

  .rankings{
    height: 60px;
    padding-top: 10px;
    padding: auto;

    .ranking{
      display: inline-block;
      margin-right: 20px;

      div{
        display: inline-block;
      }
      #kind{
        font-size: small;
        color: #757575;
      }
      #rank{
        font-size: 30px;
      }
    }
  }
  .intro-content{
    margin-top: 20px;
    height: 200px;
    font-family: 'Noto Sans JP', sans-serif;

    img{
      max-width: 30%;
    }
    .book-explain{
      margin-left: 20px;
      max-height: 180px;
      max-width: 70%;
      display: inline-block;
      vertical-align: top;
    }
  }
  .qiita-content{
    li{
      padding: 5px 0;
    }
  }
  .divid{
    margin: 20px 0;
  }
  .affiliate-btn{
    position: fixed;
    bottom: 50px;
    padding: 0 1em;
    min-width: 100px;
    width: 20%;
    left: 40%;
  }
}
</style>
