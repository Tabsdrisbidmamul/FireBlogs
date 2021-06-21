<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="homeLink">FireBlogs</router-link>
      </div>

      <div class="nav-links">
        <transition name="desktop-nav" mode="out-in">
          <div class="nav-link-container" v-show="!mobile">
            <ul :class="{ authFix: !isAuth }">
              <router-link class="link" :to="homeLink">Home</router-link>
              <router-link class="link" :to="blogsLink">Blogs</router-link>
              <router-link class="link" to="#">Create Post</router-link>
              <router-link class="link" :to="authLink" v-if="!isAuth"
                >Login/Register</router-link
              >
            </ul>
            <div
              v-if="isAuth"
              class="profile"
              ref="profile"
              @click="toggleProfile"
            >
              <span>{{ profileInitials }}</span>
              <transition name="profile-animation">
                <div class="profile-menu" v-show="profileIsVisible">
                  <div class="info">
                    <p class="initials">{{ profileInitials }}</p>
                    <div class="right">
                      <p>{{ fullName }}</p>
                      <p>{{ userName }}</p>
                      <p>{{ email }}</p>
                    </div>
                  </div>
                  <div class="options">
                    <div class="option">
                      <router-link class="option" :to="profileLink">
                        <userIcon class="icon" />
                        <p>Profile</p>
                      </router-link>
                    </div>
                    <div class="option">
                      <router-link class="option" :to="adminLink">
                        <adminIcon class="icon" />
                        <p>Admin</p>
                      </router-link>
                    </div>
                    <div @click="signOut" class="option">
                      <signOutIcon class="icon" />
                      <p>Sign Out</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <transition name="menu-icon-nav">
      <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    </transition>

    <transition name="mobile-nav" mode="out-in">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="homeLink">Home</router-link>
        <router-link class="link" :to="blogsLink">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link v-if="!isAuth" class="link" :to="authLink"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';

export default {
  name: 'navigation',
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileIsVisible: false,
    };
  },
  computed: {
    homeLink() {
      return { name: 'Home' };
    },
    blogsLink() {
      return { name: 'Blogs' };
    },
    authLink() {
      return { name: 'Login' };
    },
    profileLink() {
      return { name: 'Profile' };
    },
    adminLink() {
      return { name: 'Admin' };
    },
    profileInitials() {
      return this.$store.getters['authModule/profileInitials'];
    },
    isAuth() {
      return this.$store.getters['authModule/isAuth'];
    },
    fullName() {
      return `${this.$store.getters['authModule/profile'].firstName} ${this.$store.getters['authModule/profile'].lastName}`;
    },
    userName() {
      return this.$store.getters['authModule/profile'].userName;
    },
    email() {
      return this.$store.getters['authModule/profile'].email;
    },
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

    toggleProfile(e) {
      if (e.target === this.$refs.profile) {
        this.profileIsVisible = !this.profileIsVisible;
      }
    },

    signOut() {
      firebase.auth().signOut();
      window.location.reload();
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
  justify-content: space-between;
  align-content: center;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
      transition: 300ms color ease;

      &:hover {
        color: #1eb8b8;
      }
    }
  }

  .nav-links {
    .nav-link-container {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      white-space: nowrap;

      .authFix {
        margin-top: 5px;
      }

      ul {
        display: flex;
        align-content: center;
        justify-content: center;
        margin-right: 32px;

        .link {
          align-self: center;
          &:not(:last-child) {
            margin-right: 32px;
          }
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          align-self: center;
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 2px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-content: flex-end;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              &:not(:last-child) {
                margin-bottom: 18px;
              }

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }
            }
          }
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

.profile-animation-enter-active {
  animation: fade 250ms ease;
}

.profile-animation-leave-active {
  animation: fade 250ms ease reverse;
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

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
