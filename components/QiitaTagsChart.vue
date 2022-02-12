<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { HorizontalBar, mixins } from 'vue-chartjs';

@Component({
    extends: HorizontalBar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class QiitaTagsChart extends Mixins(mixins.reactiveProp, HorizontalBar) {
  // vue data


  // vue lifecycle
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.qiitaTagTitles,
      datasets: [
        {
          label: 'Tag count (NOTE : up to 100)',
          backgroundColor: '#4DD0E1',
          data: this.qiitaTagCount,
        }
      ],
    }, {
        scales: {
          xAxes: [{ticks: {min: 0, max: 100}}],
      }
    })
  }
  // vue getters
  get qiitaTagTitles(): any{
    return this.$store.getters['reccomendedBook/qiitaTagTitles']
  }

  get qiitaTagCount(): any{
    return this.$store.getters['reccomendedBook/qiitaTagCount']
  }
}
</script>
