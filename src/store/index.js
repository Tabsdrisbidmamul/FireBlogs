import Vue from 'vue';
import Vuex from 'vuex';

import blogCardsModule from './blogCards/index';
import authModule from './auth/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogCardsModule,
    authModule,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
