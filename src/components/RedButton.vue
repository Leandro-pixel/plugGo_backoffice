<template>
  <q-btn
    class="bg-red text-white"
    :label="label"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RedButton',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
</script>

<style scoped>
/* Se precisar de mais estilos, coloque aqui */
</style>
