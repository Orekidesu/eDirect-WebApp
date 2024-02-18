import{ createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/LoginView.vue';
import Dashboard from '@/views/DashboardView.vue';
import About from '@/views/AboutView.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
    {
    path: '/about',
    name: 'about',
    component: About
  },
 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;