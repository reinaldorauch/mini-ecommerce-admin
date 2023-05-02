<script setup lang="ts">
import { useUserStore } from '../stores/user';

definePageMeta({middleware: ['auth']});

const config = useRuntimeConfig();
const userStore = useUserStore();
const { data: profile, error } = await useLazyAsyncData(
  'profile',
  () => $fetch<User>('/auth/profile', {
    baseURL: config.public.apiBase,
    headers: { 'Authorization': 'Bearer ' + userStore.token }
  })
);
</script>
<template>
  <div class="page-index">
    <p>hello from page</p>
    <p v-if="error"><pre>{{ error }}</pre></p>
    <p v-if="profile"><pre>{{ profile.name }}</pre></p>
  </div>
</template>
