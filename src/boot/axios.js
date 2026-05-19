// src/boot/axios.js
import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://sua-api.com' });

export default boot(({ app }) => {
  // Faz com que o Axios esteja disponível em todo o app com `this.$axios` e `this.$api`
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
