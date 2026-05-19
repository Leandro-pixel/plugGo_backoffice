<template>
  <q-layout>
    <q-page class="q-pa-md flex flex-center">

      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Alterar senha</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">

          <q-input
            v-model="form.password"
            type="password"
            label="Nova senha"
            outlined
          />

          <q-input
            v-model="form.confirmPassword"
            type="password"
            label="Confirmar senha"
            outlined
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Salvar"
            :loading="loading"
            @click="changePassword"
          />
        </q-card-actions>
      </q-card>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from 'src/lib/api';

const form = ref({
  password: '',
  confirmPassword: '',
});

const loading = ref(false);

async function changePassword() {
  // 🔥 validações
  if (!form.value.password || !form.value.confirmPassword) {
    alert('Preencha todos os campos');
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('As senhas não coincidem');
    return;
  }

  if (form.value.password.length < 6) {
    alert('Senha deve ter no mínimo 6 caracteres');
    return;
  }

  loading.value = true;

  try {
    await api.requestPut('/user/change-password', {
      password: form.value.password,
    });

    alert('Senha alterada com sucesso');

    // limpa form
    form.value.password = '';
    form.value.confirmPassword = '';

  } catch (e) {
    console.error(e);
    alert('Erro ao alterar senha');
  } finally {
    loading.value = false;
  }
}
</script>
