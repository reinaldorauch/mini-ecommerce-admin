<script setup lang="ts">
import { useSearchProductStore} from '../../stores/search-product';

definePageMeta({middleware: ['auth']});

const config = useRuntimeConfig();
const skip = useState<number>(() => 0);
const take = useState<number>(() => 10);
const searchStore = useSearchProductStore();


const { data: prods, pending, error } = 
  await useLazyAsyncData(
    'prod-list', 
    () => $fetch<PaginatedResult<Product>>(
      "/product", 
      {
        query: { skip: skip.value, take: take.value, search: searchStore.search },
        baseURL: config.public.apiBase,
      }
    )
  );
</script>
<template>
  <h1>Produtos</h1>
  <NuxtLink to="/products/new">
    <el-link type="primary">Adicionar</el-link>
  </NuxtLink>
  <ul v-if="prods">
    <li v-for="p of prods.data">{{ p.title }}</li>
  </ul>
</template>