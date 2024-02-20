import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/LoginView.vue';
import Dashboard from '@/views/DashboardView.vue';
import Signup from '@/views/SignupView.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init.js';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		beforeEnter: (_to, _from, next) => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// User is signed in, let them access the route
					next();
				} else {
					// No user is signed in, redirect to login
					next({ name: 'login' });
				}
			});
		}
	},
	{
		path: '/signup',
		name: 'signup',
		component: Signup
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
