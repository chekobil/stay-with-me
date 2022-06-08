<template lang="pug">
.user-info(v-if='user')
    h3 User Info
    .user-data
        .item
            label Name
            span {{ user.name }}
        el-collapse(accordion)
            el-collapse-item.is-active(title="Info", name="3")
                .item
                    label Username
                    span {{ user.username }}
                .item
                    label Email
                    span {{ user.email }}
                .item
                    label Phone
                    span {{ user.phone }}
                .item
                    label Website
                    span {{ user.website }}
            el-collapse-item(title="Address" name="1")
                .item 
                    label Street
                    span {{ user.address.street }}
                .item 
                    label Suite
                    span {{ user.address.suite }}
                .item 
                    label City
                    span {{ user.address.city }}
                .item 
                    label Zipcode
                    span {{ user.address.zipcode }}
            el-collapse-item(title="Company" name="2")
                .item 
                    span {{ user.company.name }}
                .item 
                    span {{ user.company.catchPhrase }}
                .item 
                    span {{ user.company.bs }}
    //- pre {{ user }}

    el-button(@click="closeUserInfo") Close
.user-info(v-else)
    h3 Error, no data
    el-button(@click="closeUserInfo") Close
</template>

<script setup lang="ts">
import type { userType } from "../composables/useCrudUser";
const props = defineProps<{
    user: userType
}>();
const emit = defineEmits<{
    (e: "close"): void;
}>();

const closeUserInfo = () => {
    emit("close");
};
</script>

<style scoped lang="sass">
.user-data
    .item + .item 
        border-top: 1px solid var(--el-collapse-border-color)
    .item
        max-width: min(90vw, 400px)
        margin: 0 auto
        display: flex
        flex-direction: row 
        justify-content: space-between
        label
            color: gray
            font-size: 0.8rem
        span
            font-size: 1.1rem
            font-weight: 600
.el-collapse-item
    padding: 0 2rem
</style>

