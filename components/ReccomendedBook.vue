<template>
  <div class="reccomended-book">
    <nuxt-link :to="link">
      <v-img class="image" :src="reccomendedBook.thumbnailUrl" max-height="100" max-width="50" />
    </nuxt-link>
    <div class="rank-container">
      <div v-if="term==='Total'">
        <div>ranking : {{ reccomendedBook.totalRanking }}</div>
        <div>point : {{ reccomendedBook.totalPoint }}</div>
      </div>
      <div v-else-if="term==='Yearly'">
        <div>ranking : {{ reccomendedBook.yearlyRanking }}</div>
        <div>point : {{reccomendedBook.yearlyPoint}}</div>
      </div>
      <div v-else-if="term==='Monthly'">
        <div>ranking : {{ reccomendedBook.monthlyRanking }}</div>
        <div>point : {{ reccomendedBook.monthlyPoint }}</div>
      </div>
    </div>
    <div class="title" @click="toReccomendedBook">{{reccomendedBook.title}}</div>
    <div class="author">{{ reccomendedBook.author }}</div>
    <div class="publication">{{ reccomendedBook.publicationData }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class ReccomendedBook extends Vue {
  @Prop({ type: Object, default: null }) reccomendedBook!: any
  @Prop({ type: String, required: true}) term!: string

  // data
  id = this.reccomendedBook.id

  // methods
  toReccomendedBook(){
    alert(this.id)
  }
  link(){
    return `/book/${this.id}.vue`
  }
}
</script>

<style lang="scss">
// NOTE : postpone implementate
.reccomended-book {
  display: flex;
  display: inline-block;
  text-align: center;
  margin: 20px 0px;
  border: solid white 1px;
  height: 100px;
  width: 100%;

  .image{
    width: 100%;
    margin: 10px 10px;
    float: left;
  }
  .rank-container{
    width: 100%;
  }
  .title{
    width: 100%;
  }
  .author{
    width: 100%;
  }
  .publication{
    width: 100%;
  }
}
</style>
