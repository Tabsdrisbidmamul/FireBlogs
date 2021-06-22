import Vue from 'vue';
import VueRouter from 'vue-router';
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
    path: '/create-post',
    meta: {
      title: 'Create Post',
    },
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue'),
  },
  {
    path: '/preview-post',
    meta: {
      title: 'Preview Blog Post',
    },
    name: 'BlogPreview',
    component: () => import('../views/BlogPreview.vue'),
  },
  {
    path: '/login',
    meta: {
      title: 'Login',
    },
    name: 'Login',
    component: () => import('../views/Login.vue'),
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
  {
    path: '/profile',
    meta: {
      title: 'Profile',
    },
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/admin',
    meta: {
      title: 'Admin',
    },
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
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
