import Vue from "vue";
import VueRouter from "vue-router";
import guildPage from "../pages/guildPage.vue";
import homePage from "../pages/homePage.vue";

const routes = [
  { path: "/home", component: homePage },
  { path: "/", component: guildPage },
];

const router = new VueRouter({
  mode: "history",
  routes, // short for `routes: routes`
});

Vue.use(VueRouter);

export default router;
