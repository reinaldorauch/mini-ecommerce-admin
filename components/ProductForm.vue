<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { UploadFile } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user';

const props = defineProps<{edit: Product | null}>();
const emits = defineEmits(['cancelEdit']);

const userStore = useUserStore();
const config = useRuntimeConfig();
const uploadAction = config.public.apiBase + '/image/upload';

interface Product {
  _id?: string
  title: string
  price: string
  images: string[]
  itemsInStock: number
}

const emptyProd = (): Product => props.edit ?? ({
  title: '',
  price: '',
  images: [],
  itemsInStock: 0,
});
const product = useState<Product>(emptyProd);
const imageList = ref<UploadFile[]>([]);

async function saveProduct() {
  try {
    const images = imageList.value
      .filter(f => !!f.response)
      .map(f => (f.response && (f.response as string[])[0]) as string);

    await $fetch('/product' + ((props.edit && ('/' + props.edit._id)) ?? ''), {
      method: props.edit ? 'PUT' : 'POST',
      body: {
        ...product.value,
        images,
        price: product.value.price.replace(',', '.')
      },
      headers: userStore.authHeader,
      baseURL: config.public.apiBase,
    });
    clearNuxtData('prod-list');
    await refreshNuxtData('prod-list');
    product.value = emptyProd();
    imageList.value = [];
    if (props.edit) cancelEdit();
    ElMessage.success(props.edit ? 'Produto editado com sucesso' : 'Produto adicionado com sucesso!');
  } catch (err) {
    ElMessage.error('Não foi possível adicionar o produto');
  }
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('O arquivo deve ser um formato de imagem');
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('O tamanho do arquivo não pode ser maior que 10MB!')
    return false
  }
  return true
}

watchEffect(() => {
  if (props.edit) {
    product.value = props.edit;
    imageList.value = props.edit.images.map((i): UploadFile => {
      const url = new URL(i);
      const uid = getRandomInt(0, 10000);
      const name = url.pathname.split('/').at(-1) ?? uid.toString();
      return {url: i, name, status: 'success', uid}
    });
  } else {
    product.value = emptyProd();
  }
})

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function cancelEdit() {
  emits('cancelEdit');
}
</script>
<template>
  <el-form>
    <el-form-item label="Título">
      <el-input v-model="product.title" />
    </el-form-item>
    <el-form-item label="Preço">
      <el-input
        v-model="product.price"
        v-maska
        data-maska="0,99"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        data-maska-reversed
        data-maska-eager
      >
        <template #prepend>R$</template>
      </el-input>
    </el-form-item>
    <el-form-item label="Imagens">
      <el-upload 
        v-model:file-list="imageList"
        list-type="picture-card" 
        :multiple="true"
        name="image"
        :headers="userStore.authHeader"
        :action="uploadAction"
        :before-upload="beforeUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="Itens em estoque">
      <el-input-number v-model="product.itemsInStock" :min="1" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="props.edit" @click="cancelEdit">Cancelar</el-button>
      <el-button type="primary" @click="saveProduct">Salvar</el-button>
    </el-form-item>
  </el-form>
</template>