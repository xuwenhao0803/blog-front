import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout',
      routes: [
        { path: '/home', component: '@/pages/Home' },
        { path: '/detail/:id', component: '@/pages/Details' },
        {
          path: '/login',
          component: './Login',
        },
        {
          path: '/article',
          component: './Article',
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/articleEdit',
          component: './ArticleEdit',
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/articleEdit/:id',
          component: './ArticleEdit',
        },
        {
          path: '/personal',
          wrappers: ['@/wrappers/auth'],
          component: './Personal',
        },
      ],
    },
  ],
});
