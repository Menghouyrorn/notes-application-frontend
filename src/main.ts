import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import "vue-toast-notification/dist/theme-bootstrap.css";
import ToastPlugin from "vue-toast-notification";

const app = createApp(App);

const pinia = createPinia();
const queryClient = new QueryClient();

app.use(pinia);
app.use(router);
app.use(ToastPlugin);
app.use(VueQueryPlugin, {
  queryClient,
});

app.mount("#app");
