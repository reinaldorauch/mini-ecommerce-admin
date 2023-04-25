<script lang="ts" setup>
const layout = 'empty'
const model = {
  password: '',
  username: ''
}
const loading = useState(() => false);
</script>

<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form class="login-form">
        <el-form-item>
          <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="model.password" placeholder="Password" type="password" prefix-icon="fas fa-user"></el-input>
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