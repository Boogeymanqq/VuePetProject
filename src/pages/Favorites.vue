<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://c0c30412fa2d5ec8.mokky.dev/favorites?_relations=items'
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    <h1>Мои Закладки</h1>
    <CardList :items="favorites" is-favorites />
  </div>
</template>
