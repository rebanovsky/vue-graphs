import { ref, onMounted } from "vue";

export default function useScroll() {
  const isScrolledTop = ref(false);
  const isScrolledBottom = ref(false);
  const tableContainer = ref(null);
  const isFetching = ref(false);
  const page = ref(1);
  let debounceTimeout;

  const checkScrollPosition = () => {
    const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;

    isScrolledTop.value = scrollTop > 0;
    isScrolledBottom.value = scrollTop + clientHeight <= scrollHeight;
  };

  const handleScrollShadow = () => {
    checkScrollPosition();
  };

  const handleScroll = (event) => {
    const target = event.target;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;
    const threshold = 40; // Adjust this value to control how close to the bottom the user should be before refetching
    const shouldFetch = scrollHeight - scrollTop - clientHeight <= threshold;

    if (shouldFetch) {
      isFetching.value = true;
      if (debounceTimeout) clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        page.value += 1;
      }, 300); // Adjust the debounce time as needed
    }
  };

  const handleFetchMore = () => {
    isFetching.value = false;
  };

  onMounted(() => {
    checkScrollPosition();
    tableContainer.value.addEventListener("scroll", handleScrollShadow);
    document
      .querySelector(".table-container")
      .addEventListener("scroll", handleScroll);
  });

  return {
    tableContainer,
    isScrolledTop,
    isScrolledBottom,
    handleScrollShadow,
    handleFetchMore,
    isFetching,
    page,
  };
}
