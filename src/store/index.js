import Vue from 'vue';
import Vuex from 'vuex';

import blogCardsModule from './blogCards/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogCardsModule,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
