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
const deletedRowIndex = ref<number[]>([]);

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

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: userType;
  rowIndex: number;
}) => {
  if (deletedRowIndex.value.includes(rowIndex)) {
    return "danger-row";
  }
  return "";
};

const deleteUser = async (index: number, row: userType): Promise<void> => {
  try {
    userInfo.value = false;
    const res = await axios.delete(`${url}/${row.id}`);
    console.log(res);
    if (res.status === 200) {
      deletedRowIndex.value.push(index);
    }
  } catch (err: any) {
    console.log(err);
  }
};

const viewUserInfo = (index: number, row: userType): void => {
  console.log(index, row);
  if (row) userInfo.value = row;
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
.user-list(v-else-if='userList && userList.length', :class='{userInfoOpen: userInfo}')
  h3.title User list 
    small (showing {{ userList.length }} results)
  el-table(:data='userList', :row-class-name='tableRowClassName')
    el-table-column(prop="username" label="Username")
    el-table-column(prop="name" label="Name")
    el-table-column(prop="email" label="Email")
    el-table-column(label="Actions")
      template(#default="scope")
        el-button(size='small', @click='viewUserInfo(scope.$index, scope.row)') View
        el-button(size='small', type='danger', @click='deleteUser(scope.$index, scope.row)') Delete
.user-list(v-else-if='error')
  h3.title Error: {{ error }}
.user-list(v-else)
  h3.title No users

.user-info(v-if='userInfo')
  h3 User Info
  pre {{ userInfo }}
  el-button(@click='closeUserInfo') Close

</template>

<style lang="sass">

.el-table .danger-row
  --el-table-tr-bg-color: var(--el-color-danger-light-9)
  .el-button
    pointer-events: none
    opacity: 0.3

.el-table .warning-row
  --el-table-tr-bg-color: var(--el-color-warning-light-9)

.el-table .success-row
  --el-table-tr-bg-color: var(--el-color-success-light-9)



.user-list
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start
  //
  padding: 0
  &.userInfoOpen
    pointer-events: none
    opacity: 0.4
  .title
    color: gray
    font-weight: 900
.user-info
  padding: 2rem 1rem
  position: fixed
  z-index: 2
  top: 3.4rem
  left: 0
  right: 0
  margin: 0 auto
  max-width: min(98vw, 700px)
  border: 1px solid gray
  border-radius: 0.5rem
  background-color: rgb(255,255,255,0.88)
</style>
