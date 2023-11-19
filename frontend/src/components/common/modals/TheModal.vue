<template>
  <div
    v-if="showModal"
    class="modal-overlay flex justify-center items-center"
    @click.self="closeModal"
  >
    <div
      class="modal-content bg-slate-100 rounded-[8px] p-[20px] w-[400px]"
      style="height: calc(100vh - 200px)"
    >
      <div class="modal-header flex justify-between">
        <div class="modal-title">{{ modalTitle }}</div>
        <div class="modal-close cursor-pointer hover:bg-slate-50 p-[4px] rounded" @click="closeModal">close</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    modalTitle: {
      type: String,
      default: "Modal title",
    },
  },
  emits: ["update:showModal"],
  methods: {
    closeModal() {
      this.$emit("update:showModal", false);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
}
</style>
