import { ref, computed } from "vue";

export default function useFetchData(
  props,
  context,
  initialDataRef,
  url,
  queryParams = {},
  initialLoadingState = true
) {
  const data = ref(initialDataRef);
  const isLoading = ref(initialLoadingState);
  const currentPage = computed(() => props.page);

  const fetchData = async () => {
    let fullUrl = `${url}?page=${currentPage.value}`;

    // Convert queryParams object into a query string
    for (let key in queryParams) {
      fullUrl += `&${key}=${queryParams[key]}`;
    }

    let response = await fetch(fullUrl);

    let fetchedData = await response.json();

    // fetchedData = fetchedData.data.tenks;
    const processedData = fetchedData.map((item) => {
      return { ...item, isLoadingSpinner: true };
    });

    data.value = [...data.value, ...processedData];

    isLoading.value = false;

    context.emit("fetchMore");

    return fetchedData; // Add this line
  };

  return { data, isLoading, fetchData };
}
