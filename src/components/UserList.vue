<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/User";
import { useCrudUser } from "../composables/useCrudUser";
import type { userType } from "../composables/useCrudUser";

const userStore = useUserStore();
const { getUserList, deleteUser } = useCrudUser();

// muestro un mensaje mientras los datos se están cargando
const loading = ref<boolean>(true);
// los metodos CRUD, gestionan errores
const error = ref<string>("");
// lista de todos los usuarios
const userList = ref<userType[]>([]);
// la información completa de un solo usuario
const userInfo = ref<userType | boolean>(false);
// usuarios eliminados, se añade un estilo cuando un usuario ha sido eliminado y la API responde con exito
const deletedRowIndex = ref<number[]>([]);

const url = "https://jsonplaceholder.typicode.com/users";

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

const handleDeleteUser = async (
  index: number,
  row: userType
): Promise<void> => {
  userInfo.value = false; // reset, por si está abierto el modal
  const res = await deleteUser(url, index, row);
  if (res) deletedRowIndex.value.push(index);
};

const viewUserInfo = (index: number, row: userType): void => {
  //console.log(index, row);
  if (row) userInfo.value = row;
  else userInfo.value = false;
};

const closeUserInfo = (): void => {
  userInfo.value = false;
};

onMounted(async () => {
  // cuando se monta el componente, se revisa si el Store tiene almacenado el listado de usuarios
  // si lo tiene, se utiliza y no se vuelve a llamar a la API
  // en la primera carga, el Store está vacío y los datos vienen se descargan de la API
  const savedUserList = userStore.getUserList;
  if (savedUserList && savedUserList.length) {
    // console.log("get data from Store");
    loading.value = false;
    userList.value = savedUserList;
  } else {
    // console.log("get data from API");
    const { loading: l, data: d, error: e } = await getUserList(url);
    loading.value = l;
    userStore.setUserList(d); // guarda el listado en el Store
    error.value = e;
    userList.value = d; // guarda el listado en la variable que usa el template
  }
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
        el-button(size='small', type='danger', @click='handleDeleteUser(scope.$index, scope.row)') Delete
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
  .el-table .danger-row
    --el-table-tr-bg-color: var(--el-color-danger-light-9)
    .el-button
      pointer-events: none
      opacity: 0.3

  .el-table .warning-row
    --el-table-tr-bg-color: var(--el-color-warning-light-9)

  .el-table .success-row
    --el-table-tr-bg-color: var(--el-color-success-light-9)

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
