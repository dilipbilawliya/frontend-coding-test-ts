import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'
import PokemonList from '../views/PokemonList.vue'
import PokemonDetails from '../views/PokemonDetails.vue'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '', // Empty path as it's relative to the parent route
    name: 'Home',
    component: Home,
  },
  {
    path: 'pokemon-list', // Adjusted path to be more descriptive
    name: 'PokemonList',
    component: PokemonList,
  },
  {
    path: 'pokemon/:id', // Dynamic parameter for PokemonDetails
    name: 'PokemonDetails',
    component: PokemonDetails,
    props: true, // To pass route params as props to the component
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*', // Error route and catch-all route
    name: 'Error',
    component: Error,
  },
  {
    path: '/',
    component: LayoutMain,
    children: mainRoutes,
  },
]

export default function initializeRouter(app: App): Router {
  const router: Router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)

  return router
}
