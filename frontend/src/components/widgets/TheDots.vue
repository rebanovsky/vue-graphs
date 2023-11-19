<template>
  <div class="typing-indicator">
    <span class="bg-slate-400"></span>
    <span class="bg-slate-400"></span>
    <span class="bg-slate-400"></span>
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
.typing-indicator {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 20px;
}

.typing-indicator span {
  position: absolute;
  bottom: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
}

.typing-indicator span:nth-child(1) {
  left: 0;
  animation: bounce 1s infinite;
}

.typing-indicator span:nth-child(2) {
  left: 5.5px;
  animation: bounce 1s infinite 0.15s;
}

.typing-indicator span:nth-child(3) {
  left: 11px;
  animation: bounce 1s infinite 0.3s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
}
</style>
