import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { sendMessage } from "./composbles/client";

createApp(App).use(router).use(sendMessage).mount("#app");
