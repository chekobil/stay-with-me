import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userList: [] as any[],
  }),
  getters: {
    getUserList: (state) => state.userList,
  },
  actions: {
    setUserList(list: any[]) {
      this.userList = list;
    },
  },
});
