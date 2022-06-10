<script setup lang="ts">
import { toggleDark } from '@/composables'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

const counterStore = useCounterStore()
const userStore = useUserStore()

const counter = computed(() => counterStore.counter)
const doubleCount = computed(() => counterStore.doubleCount)
const users = computed(() => userStore.users)

const increment = () => counterStore.increment()

onMounted(async () => {
  try {
    await userStore.getAllUser()
    console.log('users', users.value)
  } catch (err) {
    console.log('err', err)
  }
})
</script>
<template>
  <header>
    <nav>
      <i @click="toggleDark()" class='bx bx-chevron-left' style="font-size: 36px"></i>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <main>
    <img src="https://s5o.ru/storage/simple/ru/edt/b7/ae/c8/d2/rue2115022372.jpg" alt="" srcset="">
  </main>
    <!-- <h1>666</h1>

    <div>
      <h2>Counter</h2>
      <p>counter : {{ counter }}</p>
      <p>doubleCount : {{ doubleCount }}</p>
      <button @click="increment">
        <IconMdiPlusCircle />
      </button>
    </div> -->

    
    <!-- <ul class="my-4 grid grid-cols-4 gap-6">
      <li
        v-for="user in users"
        :key="user.id"
        class="p-5 rounded-md border border-gray-700 dark:border-white"
      >
        <h3 class="text-lg font-semibold">{{ user.name }}</h3>
        <p class="text-sm tracking-wide truncate">{{ user.email }}</p>
      </li>
    </ul> -->
</template>
