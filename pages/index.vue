<script setup lang="ts">
import { useUserStore } from '../stores/user';

definePageMeta({middleware: ['auth']});

const config = useRuntimeConfig();
const userStore = useUserStore();

interface IndexSummary {
  productCount: number
  itemSum: number,
  highestStockProduct: number
  lowestStockProduct: number,
  avgItemsInStock: number
}

const { data: summary, pending } = useLazyAsyncData('summary', () => $fetch<IndexSummary>('/product/summary', {
  headers: userStore.authHeader,
  baseURL: config.public.apiBase
}))

</script>
<template>
  <div v-loading="pending">
    <el-descriptions v-if="summary"  title="Produtos" border>
      <el-descriptions-item label="Cadastrados">{{ summary.productCount }}</el-descriptions-item>
      <el-descriptions-item label="Itens em Estoque">{{ summary.itemSum }}</el-descriptions-item>
      <el-descriptions-item label="Média de items em estoque">{{ summary.avgItemsInStock }}</el-descriptions-item>
      <el-descriptions-item label="Produto com mais estoque">{{ summary.highestStockProduct }}</el-descriptions-item>
      <el-descriptions-item label="Produto com menos estoque">{{ summary.lowestStockProduct }}</el-descriptions-item>
    </el-descriptions>
    <el-skeleton v-else />
  </div>
</template>
