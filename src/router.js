import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList,
      name: "CoachesList"
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      name: "CoachDetails",
      props: true,
      children : [
        {
          path: 'contact',
          component: ContactCoach,
          name: "ContactCoach"
        }
      ]
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: {
        requiresAuth: true
      },
      name: "CoachRegister",
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true
      },
      name: "RequestsReceived"
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true
      },
      name: "UserAuth"
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
})

export default router;