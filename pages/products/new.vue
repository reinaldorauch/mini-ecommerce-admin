<script setup>
import { useUserStore } from '../../stores/user';
definePageMeta({middleware: ['auth']});

const userStore = useUserStore();
const config = useRuntimeConfig();
const router = useRouter();

const product = useState(() => ({
  title: null,
  price: null,
  images: [],
  itemsInStock: 0,
}));

async function saveProduct() {
  await $fetch('/product', {
    method: 'POST',
    body: 
    JSON.stringify(product.value),
    headers: userStore.authHeader,
    baseURL: config.public.apiBase,
  });
  await refreshNuxtData('prod-list');
  await router.push('/proucts');
}
</script>
<template>
  <h1>Cadastrar Produto</h1>
  <el-container>
    <el-card>
      <el-form>
        <el-form-item label="Título">
          <el-input v-model="product.title" />
        </el-form-item>
        <el-form-item label="Preço">
          <el-input
            v-model="product.price" 
            data-maska="0.99"
          />
        </el-form-item>
        <el-form-item label="Imagens">
          <el-upload v-model:file-list="product.images" list-type="picture-card"/>
        </el-form-item>
        <el-form-item label="Itens em estoque">
          <el-input-number v-model="product.itemsInStock" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProduct">Salvar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>