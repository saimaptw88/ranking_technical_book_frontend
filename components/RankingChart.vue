<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Bar, mixins } from 'vue-chartjs';

@Component({
    extends: Bar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class RankingChart extends Mixins(mixins.reactiveProp, Bar) {

  // vue lifecycle
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.titles,
      datasets: [
        {
          label: 'Book Point',
          backgroundColor: '#B2EBF2',
          borderColor: '#4DD0E1',
          borderWidth: 1,
          data: this.points,
        }
      ],
    }, {
        scales: {
          yAxes: [{ticks: {min: 0}}],
      }
    })
  }
  // vue getters
  get topFiveBooks(): any{
    return this.$store.getters["reccomendedBooks/topFiveBooks"]
  }

  get titles(): any{
    return this.$store.getters["reccomendedBooks/titles"]
  }

  get points(): any{
    return this.$store.getters['reccomendedBooks/points']
  }
}
</script>
