<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';

  export default defineComponent({
    props: basicProps,
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      onMounted(() => {
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: [
              '1month',
              '2month',
              '3month',
              '4month',
              '5month',
              '6month',
              '7month',
              '8month',
              '9month',
              '10month',
              '11month',
              '12month',
            ],
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
              type: 'bar',
              barMaxWidth: 80,
            },
          ],
        });
      });
      return { chartRef };
    },
  });
</script>
