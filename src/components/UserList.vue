<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface userType {
  address: {
    street: string;
    suite: string;
    zipcode: string;
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const loading = ref<boolean>(true);
const error = ref<string>("");
const userList = ref<userType[]>([]);
const userInfo = ref<userType | boolean>(false);

const url = "https://jsonplaceholder.typicode.com/users";
const getUsers = async (): Promise<userType[]> => {
  try {
    const res = await axios.get(url);
    console.log(res.data);
    loading.value = false;
    if (res.status === 200) {
      return res.data;
    }
    return [];
  } catch (err: any) {
    console.log(err);
    loading.value = false;
    error.value = err.message;
    return [];
  }
};
const deleteUser = async (id: number): Promise<void> => {
  const res = await axios.delete(`${url}/${id}`);
  console.log(res);
  if (res.status === 200) {
    console.log("DELETED USER", res.data);
    //return res.data;
  }
};

const viewUserInfo = (id: number): void => {
  const user = userList.value.find((user) => user.id === id);
  console.log(user);
  if (user) userInfo.value = user;
  else userInfo.value = false;
};

const closeUserInfo = (): void => {
  userInfo.value = false;
};

onMounted(async () => {
  userList.value = await getUsers();
});
</script>

<template lang="pug">
.user-list(v-if='loading')
  h3.title Loading ...
.user-list(v-else-if='userList && userList.length')
  h3.title User list 
    small (showing {{ userList.length }} results)
  .list
    .user.titles
      .username Username
      .name Name
      .email Email
    template(v-for='user in userList')
      .user
        .username {{ user.username }}
        .name {{ user.name }}
        .email {{ user.email }}
        .actions 
          button(@click='viewUserInfo(user.id)') view 
          button(@click='deleteUser(user.id)') delete
  .user-info(v-if='userInfo')
    h4 user Info
    button(@click='closeUserInfo') Close
    pre {{ userInfo }}
.user-list(v-else-if='error')
  h3.title Error: {{ error }}
.user-list(v-else)
  h3.title No users

</template>

<style lang="sass">
.user-list
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start
  //
  padding: 0
  .title
    color: gray
    font-weight: 900
  .list
    padding: 0
    width: 100%
    list-style: none
    .user:not(.titles) + .user
      padding-top: 0.8rem
      border-top: 1px solid gray
    .user
      padding: 0 1rem
      margin-bottom: 0.8rem
      //
      display: grid
      grid-template-columns: 2fr 3fr 4fr 1fr
      &.titles
        font-size: 0.8rem
        border-bottom: 1px solid gray
        color: gray
        margin-bottom: 2rem

      > div
        text-align: left
      .username

      .name

      .email
      .actions
        display: flex
        flex-direction: row
</style>
