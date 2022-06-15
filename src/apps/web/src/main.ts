import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
// import Home from './pages/Home.vue';
// import Tournaments from './pages/Tournaments.vue';
// import TournamentsId from './pages/TournamentsId.vue';

// css
import './assets/css/vendor.css';

// const routes = [
//   { path: '/', component: Home },
//   { path: '/tournaments', component: Tournaments },
//   { path: '/tournaments/:id', name: 'tournamentsId', component: TournamentsId },
// ]

const routes = [
  // Does not allow string templating, also @/ is resolved to ../
  ...Object.entries(import.meta.glob('./pages/**/*.vue')).map(
    ([p, component]) => {
      const PAGE_DIR = '../pages'
      const PAGE_EXT = '.vue'
      const PAGE_INDEX = 'index'

      let path = '/' + p.substring(PAGE_DIR.length, p.length - PAGE_EXT.length)
      if (path.endsWith(PAGE_INDEX)) {
        path = path.substring(0, path.length - PAGE_INDEX.length - 1)
      }
      if (!path) {
        path = '/'
      }


      return {
        path,
        component,
      }
    },
  ),
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
