import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: {
      title: 'Home',
    },
    name: 'Home',
    component: Home,
  },
  {
    path: '/blogs',
    meta: {
      title: 'Blogs',
    },
    name: 'Blogs',
    component: () => import('../views/Blogs.vue'),
  },
  {
    path: '/login',
    meta: {
      title: 'Login',
    },
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    meta: {
      title: 'Register',
    },
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/forgot-password',
    meta: {
      title: 'Forgot Password',
    },
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | FireBlogs`;
  next();
});

export default router;
