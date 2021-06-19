<template>
  <div class="modal" v-if="open">
    <transition name="modal-animate">
      <div class="modal-content" v-if="open">
        <p>{{ this.modalMessage }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalMessage: {
      type: String,
      required: false,
      default: 'An error Occurred',
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: center;
    }
    button {
      align-self: center;
    }
  }
}

.modal-animate-enter-active {
  animation: scale-fade 200ms ease-out;
}

.modal-animate-leave-active {
  animation: scale-fade 200ms ease-in reverse;
}

@keyframes scale-fade {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
