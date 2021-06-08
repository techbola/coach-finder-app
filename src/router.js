import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

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
      name: "CoachRegister"
    },
    {
      path: '/requests',
      component: RequestsReceived,
      name: "RequestsReceived"
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
  ]
});

export default router;