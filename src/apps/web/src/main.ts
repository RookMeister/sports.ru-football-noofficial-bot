import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Home from '@web/pages/index.vue'
import Matches from '@web/pages/matches/index.vue'
import Standings from '@web/pages/standings/index.vue'
// css
import './assets/css/vendor.css';

// const routes = [
//   ...Object.entries(import.meta.glob('./pages/**/*.vue')).map(
//     ([p, component]) => {
//       const PAGE_DIR = '../pages';
//       const PAGE_EXT = '.vue';
//       const PAGE_INDEX = 'index';

//       let path = '/' + p.substring(PAGE_DIR.length, p.length - PAGE_EXT.length);

//       path.endsWith(PAGE_INDEX) && (path = path.substring(0, path.length - PAGE_INDEX.length - 1))
//       !path && (path = '/');

//       return { path, component }
//     }
//   )
// ];

const routes = [
  { path: '/bot/', component: Home },
  { path: '/bot/matches/', component: Matches  },
  { path: '/bot/standings/', component: Standings  },
  { path: '/bot/standings/:id/', component: Standings  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
