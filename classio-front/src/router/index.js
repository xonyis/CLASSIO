import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuthData } from "@/config/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresAuth: true } // ✅ Protéger la route
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }, // ✅ Protéger la route
      children: [
        // /dashboard/profile => Profil
        { path: "dashboardHome", component: () => import('../views/dashboard/DashboardHome.vue'),},
        { path: "profile", component: () => import('../views/dashboard/ProfilView.vue'),
          beforeEnter: (to, from, next) => {
            const auth = getAuthData();
            if (auth.role !== 'ROLE_ADMIN') {
              next('/dashboard/dashboardHome'); // Redirection si pas admin
            } else {
              next();
            }
          }
        },
      ],
    },
  ],
})

// 🔒 Vérification avant d'accéder à une route protégée
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirige vers login si pas connecté
  } else {
    next();
  }
});
export default router
