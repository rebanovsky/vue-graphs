import { ref, watchEffect } from "vue";
import axios from "axios";

export default function useFetch(endpoint, params = ref({})) {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Extracted fetching logic to a separate function
  const fetchData = () => {
    if (!endpoint.value) return;

    isLoading.value = true;
    axios
      .get(endpoint.value, { params: params.value })
      .then((response) => {
        data.value = response.data;
      })
      .catch((err) => {
        console.error(err);
        error.value = err;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  // Call fetchData on initial setup
  fetchData();

  // Watch changes to endpoint and re-fetch
  watchEffect(() => {
    fetchData();
  });

  return { data, isLoading, error };
}

