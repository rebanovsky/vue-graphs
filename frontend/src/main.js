import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "./plugins/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueHighlightJS from 'vue3-highlightjs'

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(VueHighlightJS)
app.mount("#app");
