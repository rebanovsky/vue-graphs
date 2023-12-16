<template>
  <div
    class="app-wrapper background dark:bg-slate-900 w-[100vw] text-slate-900 dark:text-slate-400 bg-slate-100 overflow-y-auto transition ease"
  >
    <router-view />
  </div>
</template>

<script setup></script>

<style>
body {
  background-color: #000;
}
p {
  padding: 0;
}

input:focus {
  outline: none;
}

select {
  text-align: right;
}

a:hover {
  text-decoration: none;
  text-underline-offset: 2px;
}

html.dark {
  transition: all 0.2s ease;
}

#app {
  font-family: Works Sans, Poppins;
}

a {
  text-decoration: none;
  font-weight: 400;
}
</style>
