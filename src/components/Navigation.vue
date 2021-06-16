<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>

      <div class="nav-links">
        <transition name="desktop-nav" mode="out-in">
          <ul v-show="!mobile">
            <router-link class="link" to="#">Home</router-link>
            <router-link class="link" to="#">Blogs</router-link>
            <router-link class="link" to="#">Create Post</router-link>
            <router-link class="link" to="#">Login/Register</router-link>
          </ul>
        </transition>
      </div>
    </nav>

    <transition name="menu-icon-nav">
      <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    </transition>

    <transition name="mobile-nav" mode="out-in">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" to="#">Home</router-link>
        <router-link class="link" to="#">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link class="link" to="#">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg';

export default {
  name: 'navigation',
  components: {
    menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 2px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 300ms color ease;

    &:hover {
      color: #1eb8b8;
    }
  }
}

nav {
  display: flex;
  // justify-content: space-between;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }
  }

  .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;

    ul {
      margin-right: 32px;

      .link {
        &:not(:last-child) {
          margin-right: 32px;
        }
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;

  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0;
    color: #fff;
  }
}

.menu-icon-nav-enter-active {
  animation-name: fade-spinner;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  // animation-iteration-count: 2;
}
.menu-icon-nav-leave-active {
  animation-name: fade-spinner;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;
  // animation-iteration-count: 2;
  animation-direction: reverse;
}

.desktop-nav-enter-active {
  transition: all 0.3s ease-out;
}
.desktop-nav-leave-active {
  transition: all 0.3s ease-in;
}

.desktop-nav-enter {
  opacity: 0;
  transform: translateX(250px);
}

.desktop-nav-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.desktop-nav-leave-to {
  opacity: 0;
  transform: translateX(250px);
}

.desktop-nav-leave {
  opacity: 1;
  transform: translateX(0);
}

.mobile-nav-enter-active {
  animation: fade-draw 0.5s ease-out;
}
.mobile-nav-leave-active {
  animation: fade-draw 0.5s ease-in reverse;
}

@keyframes fade-draw {
  0% {
    opacity: 0;
    transform: translateX(-250px);
  }

  25% {
    opacity: 0.25;
    transform: translateX(-187.5);
  }

  50% {
    opacity: 0.5;
    transform: translateX(-125);
  }

  75% {
    opacity: 0.75;
    transform: translateX(-62.5);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-spinner {
  0% {
    opacity: 0;
    transform: rotate(0);
  }

  100% {
    opacity: 1;
    transform: rotate(360deg);
  }
}
</style>
