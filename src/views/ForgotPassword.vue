<template>
  <section>
    <Modal
      modalMessage="An Error Occurred"
      :open="modalActive"
      @close-modal="closeModal"
    />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="reset" @submit.prevent="submitForm">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="loginLink">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input
              type="text"
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

      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
        this.modalActive = true;
      }
    },

    submitForm() {
      this.validation();

      const formData = {
        email: this.email.val,
      };

      console.log(formData);
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
