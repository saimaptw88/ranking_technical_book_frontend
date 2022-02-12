<template>
  <v-btn fab class="return-btn white--text cyan lighten-2" v-show="buttonActive" @click="returnTop">TOP</v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component

export default class ScrollToTop extends Vue{

  // vue data
  buttonActive: boolean = true
  scroll = 0

  // vue lifecycle
  mounted(){
    window.addEventListener('scroll', this.scrollWindow)
  }

  // methods
  returnTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  scrollWindow(){
    const top = 100
    this.scroll = window.scrollY

    if(top <= this.scroll){
      this.buttonActive = true
    }else{
      this.buttonActive = false
    }
  }
}
</script>

<style lang="scss">
.return-btn{
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
