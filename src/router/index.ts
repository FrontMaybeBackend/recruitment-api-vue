import { createRouter, createWebHistory } from 'vue-router'
import FormView from "@/views/FormView.vue";
import ApplicationsList from "@/views/ApplicationsList.vue";
import EditView from "@/views/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/formularz',
      name: 'formularz aplikacji',
      component: FormView,
    },
    {
      path: '/lista',
      name: 'lista aplikacji',
      component: ApplicationsList,
    },
    {
      path: '/edit/:id',
      name: 'edycja aplikacji',
      component: EditView,
    }
  ],
})

export default router
