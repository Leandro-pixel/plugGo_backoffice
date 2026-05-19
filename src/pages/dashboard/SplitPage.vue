<template>
    <q-layout>
  <q-page class="q-pa-md">
    <PrimaryButton  :loading="loading" flat @click="check()" label="Verificar" />

    <div v-if="predict">
        <p><strong>Mensagem:</strong> {{ predict.message }}</p>
        <p><strong>Nível de Risco:</strong> {{ predict.riskLevel }}</p>
        <p><strong>Informações adicionais:</strong> {{ predict.additionalInfo }}</p>
      </div>
      
  </q-page>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useReportStore } from 'src/stores/useUserStore';
//import { Address } from 'src/models/address'
import { NotifyError, ShowDialog, ShowLoading } from 'src/utils/utils';
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue';

const reportStore = useReportStore();
const predict = ref(reportStore.predict);
const loading = ref(false);

const check = async () => {
  try {
    ShowLoading.show('Criando...');
    console.log('Iniciando a verificação...');

    await reportStore.fetchPredict();
    await ShowDialog.show('Sucesso', 'Relatório criado com sucesso!');
    await ShowLoading.hide('');

    predict.value = reportStore.predict;

    console.log('Dados recebidos: ', predict.value);
  } catch (error: any) {
    console.error('Erro ao executar o check: ', error);
    await ShowLoading.hide('');
    NotifyError.error(error.message);
  }
};

</script>

<style scoped>

.q-btn {
  min-width: 150px;
}

.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
