<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  isFavorites: Boolean
})
</script>

<template>
  <div
    class="bg-white relative border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <div @click="onClickFavorite" class="absolute top-8 left-8">
      <img v-if="!isFavorites" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
    </div>
    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <img
        v-if="!isFavorites"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>
