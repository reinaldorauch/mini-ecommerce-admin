<script lang="ts" setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const router = useRouter();
async function logout() {
  userStore.$reset();
  await router.push('/login');
}

async function onItemSelected(index: string) {
  await router.push(index);
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu :mode="'horizontal'" class="main-menu" @select="onItemSelected">
        <el-menu-item index="/">MINI ECOMMERCE ADMIN</el-menu-item>
        <div class="grow"></div>
        <el-menu-item index="/products">Produtos</el-menu-item>
        <el-menu-item @click="logout">Logout</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <NuxtPage/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.main-menu {
  display: flex;
  align-items: center;
}
.grow {
  flex-grow: 1;
}
</style>