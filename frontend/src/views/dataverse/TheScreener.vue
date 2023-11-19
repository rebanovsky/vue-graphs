<template>
  <div
    class="w-[100%] flex flex-col items-center gridlines flex-grow"
  >
    <!-- Filter Controls -->
    <div class="filter-controls flex my-4 space-x-4">
      <select v-model="selectedCountry" placeholder="Select a country">
        <option v-for="country in uniqueCountries" :key="country">
          {{ country }}
        </option>
      </select>

      <select v-model="selectedIndicator">
        <!-- You can customize this further -->
        <option value="gdp">GDP</option>
        <option value="debtpercentage">Debt Percentage</option>
        <option value="creditrating">Credit Rating</option>
      </select>
    </div>

    <!-- Table -->
    <div class="" v-if="financialData">
      <TheTable
        :columns="financialColumns"
        :rows="financialData"
        table-height-adjust="340px"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import TheTable from "@/components/common/tables/TheTable.vue";
import axios from "axios";

export default {
  components: { TheTable },
  setup() {
    const financialColumns = ref([
      {
        key: "country",
        label: "Country",
        format: "text",
        width: "150px",
        alignment: "flex-start",
      },
      {
        key: "gdp",
        label: "GDP (in billions)",
        format: "currency",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "debtpercentage",
        label: "Debt (%)",
        format: "percentage",
        width: "120px",
        alignment: "flex-end",
      },
      {
        key: "creditrating",
        label: "Credit Rating",
        format: "text",
        width: "120px",
        alignment: "flex-end",
      },
    ]);

    // Initialize financialData as an empty array
    const financialData = ref([]);

    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pg");
        financialData.value = response.data; // Update the ref with retrieved data
      } catch (error) {
        console.error("Failed to fetch financial data:", error);
      }
    };

    // Use the onMounted lifecycle hook to trigger the fetchData function
    onMounted(fetchData);

    const selectedCountry = ref("");
    const selectedIndicator = ref("");

    // Computed properties for unique countries and filtered data
    const uniqueCountries = computed(() => {
      if (!financialData.value || financialData.value.length === 0) return [];

      const countriesSet = new Set(
        financialData.value.map((data) => data.country)
      );
      return [...countriesSet];
    });

    const filteredFinancialData = computed(() => {
      return financialData.value.filter((data) => {
        const matchesCountry = selectedCountry.value
          ? data.country === selectedCountry.value
          : true;
        const matchesIndicator = selectedIndicator.value
          ? data[selectedIndicator.value] !== undefined
          : true;

        return matchesCountry && matchesIndicator;
      });
    });

    return {
      financialColumns,
      financialData: filteredFinancialData,
      selectedCountry,
      selectedIndicator,
      uniqueCountries,
    };
  },
};
</script>

<style lang="scss" scoped></style>
