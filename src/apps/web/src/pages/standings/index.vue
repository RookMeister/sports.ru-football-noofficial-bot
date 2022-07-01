<script setup lang="ts">
import { computed } from 'vue';
import TableTournaments from '@web/components/TableTournaments.vue';
import ListTournaments from '@web/components/ListTournaments.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id || '')
</script>

<template>
  <TableTournaments v-if="id" :view="id.toString()" />
  <ListTournaments v-else />
</template>