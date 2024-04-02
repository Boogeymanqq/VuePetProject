<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'

const { addToCart, removeFromCart, cart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

const onChangeSearchInput = (e) => {
  filters.searchQuery = e.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
        // ...item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://c0c30412fa2d5ec8.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://c0c30412fa2d5ec8.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log('error', error)
  }
  // item.isFavorite = !item.isFavorite
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://c0c30412fa2d5ec8.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorite = async () => {
  try {
    const { data: favorites } = await axios.get('https://c0c30412fa2d5ec8.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
    console.log(favorites)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorite()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  if (cart.value.length === 0) {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false
    }))
  }
})

watch(filters, fetchItems)
</script>

<template>
  <div>
    <div class="flex justify-between mb-8 items-center">
      <h2 class="text-3xl font-bold">Все кроссовки:</h2>

      <div class="flex gap-4">
        <select
          @change="onChangeSelect"
          class="py-2 px-3 border rounded outline-none"
          name=""
          id=""
        >
          <option value="name">По названию</option>
          <option value="price">По цене (дешёвые)</option>
          <option value="-price">По цене (дорогие)</option>
        </select>
        <div class="relative">
          <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
          <input
            @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
