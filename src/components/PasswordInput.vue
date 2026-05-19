<template>
  <q-input label="password" v-model="password" :type="isPsw ? 'password' : 'text'" outlined>
    <!-- a mudança de tipo acontece de acordo com o valor de isPsw -->
    <template v-slot:append>
      <q-icon
        :name="isPsw ? 'visibility' : 'visibility_off'"
        @click="isPsw = !isPsw"
      />
      <!-- alterna entre os ícones de olho -->
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PasswordInput',
  setup() {
    const isPsw = ref<boolean>(true); // alterna entre mostrar/ocultar senha
    const password = ref<string>(''); // armazena o valor da senha

    return {
      isPsw,
      password,
    };
  },
});
</script>

<style lang="scss" scoped></style>
