<template>
  <div class="app-wrapper">
    <div class="app">
      <navigation />
      <router-view />
      <footer-vue></footer-vue>
    </div>
  </div>
</template>

<script>
import FooterVue from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
    FooterVue,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 144rem;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
</style>
