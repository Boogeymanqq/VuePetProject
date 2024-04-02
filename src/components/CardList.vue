<script setup>
// import { inject } from 'vue'
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])

const onClickAdd = () => {
  alert(123)
}

// const addToFavorite = inject('addToFavorite')
</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-10" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :price="item.price"
      :title="item.title"
      :image-url="item.imageUrl"
      :id="item.id"
      :isFavorites="isFavorites"
    />
  </div>
</template>
