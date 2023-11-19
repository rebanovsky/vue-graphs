<template>
  <BarChart :labels="labels" :datasets="datasets" :options="options" />
</template>

<script>
import { ref, computed } from "vue";
import { BarChart } from "vue-chart-3";

export default {
  components: {
    BarChart,
  },
  setup() {
    const labels = ref(["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]);
    const datasets = ref([
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ]);

    const options = computed(() => {
      return {
        responsive: true,
        scales: {
          y: {
            type: "linear", // This defines the type of the scale
            beginAtZero: true,
          },
        },
      };
    });

    return {
      labels,
      datasets,
      options,
    };
  },
};
</script>
