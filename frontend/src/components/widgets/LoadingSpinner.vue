<template>
  <div class="spinner-wrapper">
    <div class="the-spinner"></div>
  </div>
</template>

<script></script>

<style>
.spinner-wrapper {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.the-spinner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid rgb(255 123 0);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.6s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
