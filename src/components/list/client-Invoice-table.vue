<!--
<template>
  <q-layout>
    <q-page class="column">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <q-select
  v-if="cards.length > 0"
  v-model="cardId"
  :options="cards.map(card => ({ label: getCardType(card.cardId), value: card.cardId }))"
  label="Escolha um cartão"
  outlined
  emit-value
  map-options
  @update:model-value="searchCards"
/>

<div v-if="cards.length <= 0" class="text-h6 q-ma-md text-center full-width">O usuário não tem cartão!</div>

      <PrimaryTable
      v-if="cards.length > 0"
  @request="searchCards"
  v-model:pagination="pagination"
  :rows="invoice"
  :loading="loading"
  :columns="columns"
  :refresh="refresh"
  >
  <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.CCBStatus? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-userName="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="onCashClick( props.props.row.id, props.props.row.name)"
              >
                {{ props.props.row.name }}
              </span>
            </q-td>
          </template>
    <template #body-cell-actions="props" >
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex flex-row justify-center items-center gap-2">
        <PrimaryButton
                icon="add_business"
                flat
                @click="details(props.props.row.id, props.props.row.name, 'true')"
                label="Detalhes"
            />
      </q-td>
        </q-list>
      </q-btn-dropdown>
    </template>

  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from 'src/models/pagination';
import { NotifyError} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
//import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Invoice } from 'src/models/invoices';
import { useInvoiceStore } from 'src/stores/useInvoiceStore';
import { UserCard } from 'src/models/userCard';
import { onMounted } from 'vue';

onMounted(() => {
  searchCards(); // Busca os cartões assim que o componente for carregado
});
//const router = useRouter()
const invoice = ref([] as Array<Invoice>);
const invoiceStore = useInvoiceStore();
// Recebe o ID da rota como propriedade
const props = defineProps<{
  clientId?: number
}>();


const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);
//const selectedDate = ref('');
//const dateRange = ref({ from: '', to: '' });

//const searchByType = ref('');
//const userType = ref('');
const cardStore = useUserCardsStore()
const cards = ref([] as Array<UserCard>)
const cardId = ref<number | null>(null);
/*
const updateDateRange = () => {
  if (dateRange.value.from && dateRange.value.to) {
    selectedDate.value = `${dateRange.value.from} até ${dateRange.value.to}`;
  }
};
*/


console.log('propriedades:' + props)
// Índice do span ativo


const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:Invoice) => row.id, align: 'center' },
{ name: 'createdAt', required: true, label: 'data criação', field: (row:Invoice) => row.createdAt, align: 'left' },
{ name: 'paymentDate', required: true, label: 'Data de pagamento', field: (row:Invoice) => row.paymentDate, align: 'left' },
{ name: 'balanceWithFee', required: true, label: 'Valor com Taxa', field: (row:Invoice) => row.getFormattedBalanceWithFee(), align: 'left' }
]


const onCashClick = (id: any, name: any) => {
  console.log('name:', id + name);
  //router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
};


const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const onRequest = async () => {
  console.log('veio aquiaqui' + props);
  loading.value = true;
  await invoiceStore
    .fetchInvoice(null, null,props.clientId, cardId.value)
    .then(() => {

      invoice.value = invoiceStore.getinvoices;
      //pagination.value.rowsNumber = invoiceStore.totalItemsInDB;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const searchCards = async () => {
  loading.value = true;
  await cardStore
    .fetchUserCards(
      props.clientId
    )
    .then(() => {
      cards.value = cardStore.getCards;
      if(cardStore.totalItemsInDB > 0){
        cardId.value = cards.value[0].cardId
      onRequest()
      } else {
        () => NotifyError.error('o usuário não tem um cartão')
      }
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const getCardType = (id: number): string => {
  switch (id) {
    case 1:
      return 'Beautycard';
    case 2:
      return 'Autocard';
      case 2:
      return 'Foodcard';
    default:
      return 'desconhecido';
  }
};

</script>
-->
