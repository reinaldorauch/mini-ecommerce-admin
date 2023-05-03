<script setup lang="ts">
import { useSearchProductStore} from '../../stores/search-product';
import { useUserStore } from '../../stores/user';

definePageMeta({middleware: ['auth']});

const config = useRuntimeConfig();
const skip = useState<number>(() => 0);
const take = useState<number>(() => 10);
const searchStore = useSearchProductStore();
const userStore = useUserStore();
const productToEdit = ref<Product|null>(null);

const { data: prods, pending } = 
  await useLazyAsyncData(
    'prod-list', 
    () => $fetch<PaginatedResult<Product>>(
      "/product", 
      {
        query: { skip: skip.value, take: take.value, search: searchStore.search },
        baseURL: config.public.apiBase,
      }
    ),
    { watch: [searchStore, take, skip] }
  );

async function editProduct(product: Product) {
  try {
    const originalProd = await $fetch<Product>('/product/' + product._id, {
      baseURL: config.public.apiBase,
      headers: userStore.authHeader
    })
    productToEdit.value = {...originalProd};
  } catch (err: any) {
    console.error(err.stack);
    ElMessage.error('Erro ao buscar o produto original para editar');
  }
}

async function handleRemove(product: Product) {
  try {
    await ElMessageBox.confirm(
      'Tem certeza que deseja remover este produto?',
      'Warning',
      {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }
    );
    await $fetch(
      '/product/' + product._id,
      {
        method: 'DELETE',
        baseURL: config.public.apiBase,
        headers: userStore.authHeader
      }
    );
    await refreshNuxtData('prod-list');
    ElMessage.success('Produto removido com sucesso');
  } catch (err: any) {
    console.error(err.stack);
    ElMessage.error('Erro ao remover o produto');
  }
}
</script>
<template>
  <el-row :gutter="20">
    <el-col :xl="18">
      <h1>Produtos</h1>
      <el-container :loading="pending" v-if="prods" direction="vertical" :style="{gap: '20px'}">
        <el-table :data="prods.data" :border="true">
          <el-table-column prop="title" label="Produto">
            <template #default="s">
              <el-popover placement="right">
                <template #reference>
                  {{ s.row.title }}
                </template>
                <el-image 
                  close-on-press-escape 
                  :src="s.row.images[0]" 
                  :preview-src-list="s.row.images"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="Preço">
            <template #default="scope">
              <Price :price="scope.row.price"/> 
            </template>
          </el-table-column>
          <el-table-column prop="itemsInStock" label="Itens em estoque"/>
          <el-table-column>
            <template #default="s">
              <el-button @click="() => editProduct(s.row)">
                <ElIconEdit />
                Editar
              </el-button>
              <el-button type="danger" @click="() => handleRemove(s.row)">Remover</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="prods.total"></el-pagination>
      </el-container>
    </el-col>
    <el-col :xl="6">
      <div v-if="productToEdit">
        <h2 >Editando o produto: </h2>
        <h3>{{ productToEdit.title }}</h3>
      </div>
      <h2 v-else>Adicionar um produto</h2>
      <ProductForm :edit="productToEdit" @cancelEdit="productToEdit = null"/>
    </el-col>
  </el-row>
</template>