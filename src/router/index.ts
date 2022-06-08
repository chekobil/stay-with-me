import { createRouter, createWebHashHistory } from "vue-router";
import UserList from "../components/UserList.vue";
import CreateUser from "../components/CreateUser.vue";

const routes = [
  {
    path: "/",
    redirect: `/users`,
  },
  {
    name: "UserList",
    path: `/users`,
    component: UserList,
  },
  {
    name: "CreateUser",
    path: `/create`,
    component: CreateUser,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

export default router;
