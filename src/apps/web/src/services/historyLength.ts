import { ref } from 'vue';
import { useRouter } from 'vue-router'

// by convention, composable function names start with "use"
export function getHistoryLength() {
  const router = useRouter();
  // state encapsulated and managed by the composable
  const length = ref(0)

  // a composable can update its managed state over time.
  function update(len: number) {
    length.value = len
  }

  router.afterEach((to, from, failure) => {
    update(window.history.length)
  })

  // expose managed state as return value
  return { length }
}