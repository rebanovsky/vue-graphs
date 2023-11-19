<template>
  <TheCard :headerName="headerName">
    <div
      class="card-titles flex px-[34px] font-medium justify-end gap-[12px] text-[12px]"
    >
      <div
        class="card-title w-[52px] border-slate-200 h-[12px] border-[0px] flex justify-end"
      >
        est.
      </div>
      <div
        class="card-title w-[52px] border-slate-200 h-[18px] border-[0px] flex justify-end"
      >
        actual
      </div>
    </div>
    <div
      class="overflow-y-auto"
      :style="{ height: `calc(100vh - ${adjustedHeight})` }"
    >
      <div
        class="list-itemz overflow-y-auto px-[8px] flex flex-col gap-[8px] p-[12px]"
      >
        <div
          class="feed-list-item border-[1px] border-box rounded-[10px] h-[64px] border-slate-200 cursor-pointer hover:translate-y-[-1.5px] transition ease duration-300"
          v-for="i in items"
        >
          <div
            class="feed-row flex items-center h-[100%] py-[4px] px-[10px] text-[12px]"
          >
            <div class="flex gap-[8px]">
              <div
                class="feed-row-item border-[0px] border-slate-300 h-[100%] rounded-[8px] w-[36px] h-[36px] flex items-center"
              >
                <img :src="i.logo" class="rounded-[8px]" />
              </div>
              <div class="company-data-wrapper w-[160px]">
                <div class="company-name flex items-center leading-[12px]">
                  <div
                    class="feed-row-item border-[0px] font-semibold border-slate-300 h-[100%] p-[4px] flex items-center"
                  >
                    {{ i.ticker }}
                  </div>
                  <div
                    class="bullet mx-[4px] mt-[1px] font-light text-[10px] cursor-default"
                  >
                    &#x2022;
                  </div>
                  <div class="company-industry truncate">{{ i.industry }}</div>
                </div>
                <div
                  class="feed-row-item truncate text-slate-500 border-[0px] border-slate-300 h-[100%] p-[4px] leading-[12px]"
                >
                  {{ i.name }}
                </div>
              </div>
              <div class="estimations-and-reported flex flex-col">
                <div class="flex gap-[12px]">
                  <div
                    class="feed-row-item w-[52px] border-[0px] leading-[12px] border-slate-300 h-[100%] p-[4px] flex justify-end items-center"
                  >
                    {{ i.revenueEst }}
                  </div>
                  <div
                    class="feed-row-item w-[52px] border-[0px] leading-[12px] border-slate-300 h-[100%] p-[4px] flex justify-end items-center"
                  >
                    {{ i.revenue }}
                  </div>
                </div>
                <div class="eps-numbers flex gap-[12px]">
                  <div
                    class="feed-row-item w-[52px] border-[0px] leading-[12px] border-slate-300 h-[100%] p-[4px] flex justify-end items-center"
                  >
                    {{ i.epsEst }}
                  </div>
                  <div
                    class="feed-row-item w-[52px] border-[0px] leading-[12px] border-slate-300 h-[100%] p-[4px] flex justify-end items-center"
                  >
                    {{ i.eps }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="est-actual-arrows border-slate-300 h-[100%] flex flex-col gap-[8px] justify-center"
            >
              <div class="arrow-revenue mx-[2px] h-[10px] w-[10px]">
                <img
                  class="h-[10px] w-[10px]"
                  :src="triangle"
                  :class="[i.revenue > i.revenueEst ? '' : 'rotate-180']"
                />
              </div>
              <div class="arrow-eps mx-[2px] h-[10px] w-[10px]">
                <img
                  class="h-[10px] w-[10px]"
                  :src="triangle"
                  :class="[i.eps > i.epsEst ? '' : 'rotate-180']"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TheCard>
</template>

<script>
import triangle from "@/assets/icons/triangle_noun.svg";
import { ref } from "vue";
import TheCard from "@/components/common/cards/TheCard.vue";

export default {
  components: { TheCard },
  props: {
    items: {
      type: Array,
    },
    adjustedHeight: {
      type: String,
      default: "270px",
    },
  },
  setup() {
    const headerName = ref("Earnings");
    return { triangle, headerName };
  },
};
</script>

<style lang="scss" scoped></style>
