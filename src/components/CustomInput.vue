<template>
  <q-input
    v-model="inputValue"
    :label="label"
    :placeholder="placeholder"
    outlined
    class="q-mb-md"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from 'vue';

export default defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Input Label'
    },
    placeholder: {
      type: String,
      default: 'Digite algo...'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const inputValue = ref(modelValue.value);

    // Sincronizar input com o modelValue externo
    watch(inputValue, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      inputValue
    };
  }
});
</script>
