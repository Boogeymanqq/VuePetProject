<script setup>
import { computed, ref, provide, watch, inject } from 'vue'
import axios from 'axios'
import DrowerHead from './DrowerHead.vue'
import CartListitem from './CartListItem.vue'
import InfoBlock from './InfoBlock.vue'

const isCreatingOrder = ref(false)
const orderId = ref(null)
const { cart, closeDrawer } = inject('cart')

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://c0c30412fa2d5ec8.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []

    console.log('data', data)
    orderId.value = data.id

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
</script>
<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <div class="flex-1">
        <DrowerHead />

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
          <InfoBlock
            v-if="!totalPrice && !orderId"
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            image-url="/package-icon.png"
          />
          <InfoBlock
            v-if="orderId"
            title="Заказ оформлен"
            :description="`Ваш заказ №${orderId} скоро будет передан курьерской доставке`"
            image-url="/order-success-icon.png"
          />
        </div>

        <!-- <div v-if="!totalPrice" class="flex h-full items-center">
          <InfoBlock
          v-if="!totalPrice"
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            image-url="/package-icon.png"
          />
        </div> -->
        <CartListitem v-if="totalPrice" />
      </div>

      <div v-if="totalPrice" class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} ₽</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} ₽</b>
          </div>
        </div>

        <button
          :disabled="cartButtonDisabled"
          @click="createOrder"
          class="disabled:bg-slate-300 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
