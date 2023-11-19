<template>
  <div
    class="entity-header rounded-[8px] h-[60px] flex items-end h-[100%] gap-[20px] p-[8px]"
  >
    <Transition name="fade" mode="out-in">
      <div
        class="flex gap-[16px] relative items-baseline"
        v-if="entity && entity.name && image"
        :key="entity.name"
      >
        <div
          class="flex flex-col"
          :class="
            type === 'company' ? '!w-[32px] !h-[32px]' : 'h-[32px] w-auto'
          "
        >
          <img
            v-if="image"
            :src="image"
            alt=""
            :class="
              type === 'company'
                ? 'rounded-[4px] '
                : 'rounded-[2px] h-[32px] w-auto'
            "
          />
        </div>
        <div
          class="entity-name mb-0 text-[16px] font-medium"
        >
          {{ entity.name }}
        </div>
        <div
          class="entity-name mb-0 text-[16px] flex flex-col font-medium"
        >
          <!-- <Transition name="fade">
            <div
              v-if="isAddWatchlist"
              class="text-[10px] absolute translate-y-[-20px] bg-slate-50 px-[4px] rounded text-slate-700"
            >
              Add to watchlist
            </div>
          </Transition> -->
          <div
            @click="showWatchlistDropdown = !showWatchlistDropdown"
            class="cursor-pointer"
          >
            <font-awesome-icon
              @mouseover="isAddWatchlist = true"
              @mouseout="isAddWatchlist = false"
              class="hover:bg-slate-50 hover:text-slate-700 transition ease duration-100 text-slate-400 px-[4px] py-[4px] rounded"
              :icon="['fas', 'plus']"
            />
          </div>
          <div
            v-if="showWatchlistDropdown"
            ref="dropdownRef"
            class="watchlist-dropdown rounded-[8px] font-normal translate-y-[32px] h-auto w-[160px] absolute bg-slate-100 shadow-boxshlight p-[10px]"
          >
            <div v-if="watchlists.length > 0" class="flex flex-col gap-[8px]">
              <div class="text-[12px] border-b-[1px] border-slate-200 pb-[2px]">
                Add to watchlist
              </div>
              <div
                v-for="watchlist in watchlists"
                :key="watchlist._id"
                @click="addEntityToWatchlist(watchlist)"
                class="p-[6px] font-medium rounded text-[14px] cursor-pointer hover:bg-slate-50"
              >
                {{ watchlist.name }}
              </div>
            </div>
            <div v-else>
              <input
                v-model="newWatchlistName"
                placeholder="Watchlist Name"
                class="w-full p-2 border rounded mb-2"
              />
              <button
                @click="createNewWatchlist"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Create Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import TheGraph from "../../common/graphs/TheGraph.vue";
import { ref, onMounted, toRefs, onBeforeUnmount } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  props: {
    entity: {
      type: Object,
    },
    type: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "image",
    },
    lineChartData: {
      type: Array,
    },
  },
  components: { TheGraph },
  setup(props) {
    const store = useStore(); // Accessing the Vuex store
    const currentUser = store.state.user || store.getters.user; // Accessing the user

    const { entity } = toRefs(props);

    const showWatchlistDropdown = ref(false);
    const watchlists = ref([]);

    const dropdownRef = ref(null);

    const isAddWatchlist = ref(false);

    // Fetch user's watchlists on component mount
    onMounted(async () => {
      if (currentUser) {
        console.log("currentUser: ", currentUser);
        try {
          const response = await axios.get(
            `/api/watchlists/user/${currentUser.user._id}`
          ); // Use the user ID from Vuex
          if (response.data) {
            watchlists.value = response.data;
          }
        } catch (error) {
          console.error("Error fetching watchlists:", error);
        }
      } else {
        console.error("User not found in state.");
      }
      document.addEventListener("mousedown", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });

    const addEntityToWatchlist = async (watchlist) => {
      try {
        const payload = {
          symbol: entity.value.symbol, // Or whichever field contains the ticker symbol
          // ... any other necessary data ...
        };
        const response = await axios.patch(
          `/api/watchlists/${watchlist._id}`,
          payload
        );
        if (response.status === 200) {
          console.log("Successfully added to watchlist:", watchlist.name);
          showWatchlistDropdown.value = false; // Close the dropdown
        } else {
          console.error("Error adding to watchlist:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding to watchlist:", error);
      }
    };

    const newWatchlistName = ref(""); // This is for storing the new watchlist name

    const createNewWatchlist = async () => {
      try {
        const payload = {
          userId: currentUser.user._id,
          name: newWatchlistName.value,
          description: "", // You can also have an input for description if needed
        };
        const response = await axios.post("/api/watchlists", payload);
        if (response.status === 201) {
          console.log("Successfully created new watchlist:", response.data);
          watchlists.value.push(response.data);
          newWatchlistName.value = ""; // Reset the input field
        } else {
          console.error("Error creating new watchlist:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating new watchlist:", error);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showWatchlistDropdown.value = false;
      }
    };

    return {
      showWatchlistDropdown,
      watchlists,
      isAddWatchlist,
      addEntityToWatchlist,
      dropdownRef,
      newWatchlistName,
      createNewWatchlist,
    };
  },
};
</script>

<style scoped>
.tooltip {
  transform: translateY(-100%);
  padding-bottom: 10px; /* To make space for the arrow */
  position: relative;
}

.tooltip::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  bottom: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f5f5f5; /* Adjust this color to match your tooltip's background color */
  transform: translateX(-50%);
}
</style>
