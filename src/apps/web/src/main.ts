import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Home from './pages/Home.vue';
import Tournaments from './pages/Tournaments.vue';
import TournamentsId from './pages/TournamentsId.vue';

// css
import './assets/css/vendor.css';

const routes = [
  { path: '/', component: Home },
  { path: '/tournaments', component: Tournaments },
  { path: '/tournaments/:id', name: 'tournamentsId', component: TournamentsId },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
