import { ref, onMounted, onBeforeUnmount } from "vue";

export function useScreenObserver() {
  const isLargeScreen = ref(window.innerWidth >= 1050);
  const isMediumScreen = ref(window.innerWidth >= 800);

  const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 1050;
    isMediumScreen.value = window.innerWidth >= 800;
  };

  const isMobileDevice = ref(false);
  const screenWidth = ref(window.innerWidth);

  const mediaQuery = window.matchMedia("(max-width: 450px)");

  const handleScreenResize = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    if (mediaQuery.matches) {
      isMobileDevice.value = true;
    } else {
      isMobileDevice.value = false;
    }
    window.addEventListener("resize", handleScreenResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("resize", handleScreenResize);
    mediaQuery.removeEventListener("change", handleScreenResize);
    isMobileDevice.value = false;
    screenWidth.value = 0;
  });

  return { isLargeScreen, isMediumScreen, isMobileDevice };
}
