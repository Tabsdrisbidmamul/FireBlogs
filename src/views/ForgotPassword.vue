<template>
  <section>
    <Modal
      :modalMessage="modalMessage"
      :open="modalActive"
      @close-modal="closeModal"
    />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="reset" @submit.prevent="resetPassword">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="loginLink">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input
              type="email"
              placeholder="Email"
              v-model="email.val"
              @blur="clearValidation('email')"
              :class="{ invalid: !email.isValid }"
            />
            <Email class="icon" />
          </div>
        </div>
        <button>Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import Email from '../assets/Icons/envelope-regular.svg';
import Loading from '../components/utils/Loading.vue';
import Modal from '../components/utils/Modal.vue';

export default {
  name: 'ForgotPassword',
  components: {
    Email,
    Modal,
    Loading,
  },
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      modalActive: false,
      modalMessage: '',
      formIsValid: true,
      isLoading: false,
    };
  },
  computed: {
    loginLink() {
      return { name: 'Login' };
    },
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email.val = '';
    },

    clearValidation(input) {
      this[input].isValid = true;
    },

    validation() {
      this.formIsValid = true;

      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
    },

    resetPassword() {
      this.validation();

      if (!this.formIsValid) {
        this.modalMessage = 'Empty email was entered';
        this.modalActive = true;
      }

      this.isLoading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email.val)
        .then(() => {
          this.isLoading = false;
          this.modalMessage =
            'If your account exists, you will receive an email message';
          this.modalActive = true;
        })
        .catch((error) => {
          this.isLoading = false;
          this.modalMessage = error.message;
          this.modalActive = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 20px;
      }
      p {
        text-align: center;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
