<script lang="ts" setup>
import useStore from 'element-plus/es/components/table/src/store';
import { useUserStore } from '../stores/user';
import { baseURL } from 'nuxt/dist/core/runtime/nitro/paths';

definePageMeta({
  layout: 'empty'
})

const model = useState(() => ({email: null, password: null}));
const loading = useState(() => false);
const userStore = useUserStore();
const router = useRouter();
const config = useRuntimeConfig();

interface LoginResponse {
  accessToken: string
}

async function handleSubmit(ev: Event) {
  ev.preventDefault();
  loading.value = true;

  const {accessToken} = await $fetch<LoginResponse>('/auth/login', {
    method: "post",
    body: JSON.stringify(model.value),
    baseURL: config.public.apiBase
  });

  userStore.$patch({token: accessToken});
  router.push('/');
  loading.value = false;
}
</script>

<template>
  <div class="login">
    <el-card>
      <h1>Mini Ecommerce Admin</h1>
      <h2>Login</h2>
      <el-form class="login-form" @submit="handleSubmit">
        <el-form-item>
          <el-input 
            v-model="model.email"
            type="email"
            placeholder="Email"
            prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="Key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
          <a class="forgot-password" href="/forgot">Forgot password ?</a>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>