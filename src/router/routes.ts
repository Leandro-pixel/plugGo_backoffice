import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  // LOGIN
  {
    path: '/',
    component: () => import('pages/auth/LoginPage.vue'),
  },

  // ÁREA LOGADA
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    meta: { requiresAuth: true },

    children: [
      {
        path: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
      },

      {
        path: 'stations',
        component: () => import('pages/stations/StationsPage.vue'),
      },

      {
        path: 'charges',
        component: () => import('pages/charges/ChargesPage.vue'),
      },

      {
        path: 'users',
        component: () => import('pages/users/UsersPage.vue'),
      },

      {
        path: 'hosts',
        component: () => import('pages/host/HostPage.vue'),
      },

      {
        path: 'reports',
        component: () => import('pages/reports/ReportsPage.vue'),
      },

      {
        path: 'finance',
        component: () => import('pages/finance/FinancePage.vue'),
      },

      {
        path: 'settings',
        component: () => import('pages/settings/SettingsPage.vue'),
      },

      {
        path: 'support',
        component: () => import('pages/support/SupportPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;