<template>
  <div class="reccomended-book">
    <p>{{reccomendedBook.title}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class ReccomendedBook extends Vue {
  @Prop({ type: Object, default: null }) reccomendedBook!: any
}
</script>

<style lang="scss">
.reccomended-book {
  text-align: center;
  margin: 0 auto;
  margin-left: 20px;
  display: inline-block;
  border: solid white 1px;
}
</style>
