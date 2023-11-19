<template>
  <div
    class="footer border-t-[1px] text-slate-600 border-slate-300 dark:border-darkupperribbon bg-[#F1F4F6] dark:bg-slate-900"
  >
    <div
      class="footer-object"
    >
      <div class="copyright cursor-default">
        Copyright © 2023 Revalia Capital, Inc. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  setup() {

    return {};
  },
};
</script>

<style>
.footer-object {
  width: 100%;
  margin: 0 0 0 12px;
}

.footer {
  height: 30px;
  width: calc(100vw - 160px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  position: absolute;
  bottom: 0px;
}
</style>
