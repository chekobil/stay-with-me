<template lang="pug">
h3 Create new user
el-form(:model="form", label-width="160px")
    el-form-item(label="Name")
        el-input(v-model="form.name") 
    el-form-item(label="Username")
        el-input(v-model="form.username") 
    el-form-item(label="Email")
        el-input(v-model="form.email") 
    el-form-item(label="Phone")
        el-input(v-model="form.phone") 
    el-form-item(label="Website")
        el-input(v-model="form.website") 
    //-
    el-button(type="primary" @click="onSubmit") Create
.response(v-if='responseCreate')
    h3 User created !!
.response(v-if='submiting')
    h3 sendign data ...
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCrudUser } from "../composables/useCrudUser";
const { createUser } = useCrudUser();

const responseCreate = ref<boolean>(false);
const submiting = ref<boolean>(false);

const form = reactive({
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
        lat: '',
        lng: '',
        }
  },
    company: {
        name: '',
        catchPhrase: '',
        bs: ''
    }
})

const url = "https://jsonplaceholder.typicode.com/users";
const onSubmit = async () => {
  submiting.value = true
  responseCreate.value = await createUser(url, form)
  submiting.value = false
}

</script>

<style scoped lang="scss"></style>
