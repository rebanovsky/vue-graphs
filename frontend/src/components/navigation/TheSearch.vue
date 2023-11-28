<template>
  <div
    class="searcher flex flex-col justify-center font-normal translate-y-[10px]"
  >
    <div
      :class="
        isInputFocused ? 'border-slate-400 transition' : 'border-slate-300 dark:border-slate-700'
      "
      class="ticker-searcher flex items-center border-[1px] px-[12px] rounded-[20px]"
    >
      <font-awesome-icon
        class="h-[12px] text-slate-400 dark:text-slate-600 transition"
        :icon="['fas', 'magnifying-glass']"
        :class="
          isInputFocused ? 'text-slate-900 dark:text-slate-100 transition' : ''
        "
      />
      <input
        ref="searchRef"
        class="dark:placeholder-slate-500 font-light text-[12px] h-[32px] px-[6px] w-[200px] mx-[5px] bg-slate-100 dark:bg-transparent placeholder-slate-400 transition ease"
        placeholder="Search"
        v-model="searchTerm"
        @input="fetchSuggestions"
        @keydown="handleKeyNavigation"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
    </div>
    <div class="items mt-[20px] w-[100%]">
      <Transition name="search" mode="out-in">
        <div
          class="suggestions-container w-[100%] bg-slate-100 border-[1px] border-slate-300 overflow-y-auto items-row dark:bg-slate-900 shadow-boxshlight dark:border-slate-800 absolute z-20 text-[12px] rounded-[12px]"
          v-if="items.length && searchTerm !== ''"
        >
          <div
            ref="suggestionItem"
            class="suggestion-item px-[12px] py-[8px] flex hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-slate-300 dark:hover:text-slate-800 border-slate-300 dark:border-slate-800 cursor-pointer"
            v-for="(item, index) in items"
            :key="index"
            :class="getClassForSuggestion(index)"
            :style="{
              'background-color':
                selectedIndex === index ? '#selectedColor' : '#normalColor',
            }"
            @click="goToPath(item.path)"
            @mouseover="resetSelectedIndex"
          >
            <div class="flex justify-between w-[100%]">
              <!-- <div class="company-symbol-item w-[40px]">
                <img
                  v-if="item.image"
                  :src="item.image"
                  alt=""
                  class="w-[20px] h-[20px] rounded-[2px]"
                  @error="hideImage"
                />
              </div> -->
              <div class="company-symbol-item w-[50px]">
                {{ item.symbol || item.iso3 }}
              </div>
              <div class="company-name-item w-[240px]">
                <div>
                  {{ item.name }}
                </div>
              </div>
              <div class="search-type font-medium text-slate-400 text-[11px]">
                {{ item.type }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup(props, { emit }) {
    const router = useRouter();

    const searchTerm = ref("");
    const items = ref([]);

    const isInputFocused = ref(false);

    const getClassForSuggestion = (index) => {
      let classes = {
        selected: selectedIndex.value === index,
        "border-b-[1px]": index !== items.value.length - 1,
      };

      return classes;
    };

    async function fetchSuggestions() {
      if (searchTerm.value.trim() === "") {
        items.value = [];
        emit("update", searchTerm.value);
        return;
      }

      try {
        const response = await axios.get("/api/suggestions", {
          params: { search: searchTerm.value },
        });
        items.value = response.data;
        console.log("items.value: ", items.value);
        emit("update", searchTerm.value);
      } catch (error) {
        console.error("Error fetching items:", error);
        items.value = [];
      }
    }

    function goToPath(path) {
      router.push(path);
    }

    function resetSearch() {
      searchTerm.value = "";
    }

    function resetSelectedIndex() {
      selectedIndex.value = -1;
    }

    const searchRef = ref(null);
    const suggestionItem = ref(null);
    const selectedIndex = ref(-1);

    function handleKeyNavigation(event) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          if (selectedIndex.value > 0) {
            selectedIndex.value--;
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (selectedIndex.value < items.value.length - 1) {
            selectedIndex.value++;
          }
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex.value >= 0) {
            navigateToSuggestion(items.value[selectedIndex.value]);
          } else {
            emit("submit", searchTerm.value.toUpperCase()); // emit event on Enter key press
          }
          break;
      }
    }

    function navigateToSuggestion(item) {
      searchTerm.value = "";
      items.value = [];
      emit("suggestionClick", item.symbol);
    }

    const handleOutsideClick = (event) => {
      if (!searchRef.value.contains(event.target)) {
        searchTerm.value = "";
        selectedIndex.value = -1;
      }
      return;
    };

    onMounted(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    const hideImage = (event) => {
      event.target.remove();
    };

    return {
      searchTerm,
      resetSearch,
      goToPath,
      searchRef,
      fetchSuggestions,
      handleKeyNavigation,
      suggestionItem,
      selectedIndex,
      items,
      getClassForSuggestion,
      resetSelectedIndex,
      isInputFocused,
      hideImage,
    };
  },
};
</script>

<style>
.suggestion-item {
  overflow: hidden; /* hides excessive content */
  text-overflow: ellipsis; /* adds ellipsis when content overflows */
}

.company-symbol-item {
  word-break: break-word;
}

.company-name-item {
  white-space: nowrap; /* prevents wrapping to the next line */
}

.selected {
  background-color: #ccc;
}

.search-enter-active,
.search-leave-active {
  transition: all 0.15s ease;
}

.search-enter-to,
.search-leave-from {
  height: auto;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.input > input,
label {
  cursor: pointer;
}

input[type="radio"] {
  -ms-transform: scale(0.7); /* IE 9 */
  -webkit-transform: scale(0.7); /* Chrome, Safari, Opera */
  transform: scale(0.7);
}

.search-option {
  padding: 2px 3px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: 5px 3px;
  -webkit-tap-highlight-color: transparent;
}

.search-option:hover {
  background: rgba(159, 159, 159, 0.1);
}

.search-option input {
  vertical-align: middle;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background: none;
  border: 0;
  box-shadow: inset 0 0 0 1.5px #434f6458;
  appearance: none;
  padding: 0;
  margin: 0;
  transition: box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25);
  pointer-events: none;
}

.search-option input:focus {
  outline: none;
}

.search-option > input[type="radio"] {
  display: none;
}

.search-option span {
  vertical-align: middle;
  display: inline-block;
  line-height: 10px;
  padding: 0 4px;
}

.search-router {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
</style>
