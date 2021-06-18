<template>
  <div class="modal">
    <transition name="modal-animate">
      <div class="modal-content" >
        <p>{{ this.modalMessage }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['modalMessage', 'show'],
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

.modal-animate-enter {
  opacity: 0;
  transform: scale(0.9);
}

.modal-animate-enter-to {
  opacity: 1;
  transform: scale(1);
}

.modal-animate-enter-active {
  transition: all 250ms ease;
}

.modal-animate-leave {
  opacity: 1;
  transform: scale(1);
}

.modal-animate-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-animate-leave-active {
  transition: all 250ms ease;
}
</style>
