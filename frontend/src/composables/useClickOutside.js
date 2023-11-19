import { onMounted, onUnmounted, ref } from 'vue'

export function useClickOutside(containerRef) {
  const isOutside = ref(false)
  const handleOutsideClick = (e) => {
    if (containerRef.value) {
      isOutside.value = !containerRef.value.contains(e.target)
    }
  }
  onMounted(() => {
    window.addEventListener('click', handleOutsideClick)
  })
  onUnmounted(() => {
    window.removeEventListener('click', handleOutsideClick)
  })
  return isOutside
}