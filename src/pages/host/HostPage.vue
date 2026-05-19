<template>
  <q-layout>
    <q-page class="q-pa-md">

      <!-- HEADER -->
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Hosts</div>
      </div>

      <!-- FILTROS -->
      <q-card class="q-mb-md">
        <q-card-section class="row q-col-gutter-md">

          <div class="col-12 col-md-4">
            <q-input
              v-model="filters.name"
              label="Filtrar por nome"
              outlined
              dense
              clearable
            />
          </div>

          <div class="col-12 col-md-4">
            <q-input
              v-model="filters.email"
              label="Filtrar por email"
              outlined
              dense
              clearable
            />
          </div>

          <div class="col-12 col-md-4">
            <q-input
              v-model="filters.phone"
              label="Filtrar por telefone"
              outlined
              dense
              clearable
            />
          </div>

          <div class="col-12">
            <q-btn
              color="primary"
              label="Buscar"
              @click="reloadTable"
            />
          </div>

        </q-card-section>
      </q-card>

      <!-- TABELA -->
      <q-card>
        <q-table
          title="Hosts"
          :rows="hosts"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
        >

          <!-- AÇÕES -->
          <template v-slot:body-cell-actions="props">
            <q-td align="right">
              <q-btn icon="edit" flat @click="editHost(props.row)" />

              <q-btn
                icon="delete"
                flat
                color="negative"
                @click="deleteHost(props.row.id)"
              />
            </q-td>
          </template>

        </q-table>
      </q-card>

      <!-- MODAL -->
      <q-dialog v-model="dialog">
        <q-card style="min-width: 400px">

          <q-card-section>
            <div class="text-h6">Editar Usuário</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Nome" />
            <q-input v-model="form.email" label="Email" />
            <q-input v-model="form.phone" label="Telefone" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Salvar" @click="saveHost" />
          </q-card-actions>

        </q-card>
      </q-dialog>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from 'src/lib/api';
import type { QTableProps } from 'quasar';

interface Host {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

const hosts = ref<Host[]>([]);
const loading = ref(false);

const dialog = ref(false);
const editingHost = ref<Host | null>(null);

const form = ref<Partial<Host>>({});

const filters = ref({
  name: '',
  email: '',
  phone: '',
});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome', field: 'name' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'phone', label: 'Telefone', field: 'phone' },
  { name: 'createdAt', label: 'Criado em', field: 'createdAt' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
];

// ===== LISTAGEM =====

async function onRequest(props: any) {
  const { page, rowsPerPage } = props.pagination;

  loading.value = true;

  try {

    const response = await api.requestGet('/support/list-user', {
      type: 'host',

      page,
      limit: rowsPerPage,

      name: filters.value.name,
      email: filters.value.email,
      phone: filters.value.phone,
    });

    hosts.value = response.data;

    pagination.value.rowsNumber = response.totalItems;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;

  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function reloadTable() {
  onRequest({
    pagination: pagination.value,
  });
}

// ===== EDIT =====

function editHost(host: Host) {
  editingHost.value = host;
  form.value = { ...host };
  dialog.value = true;
}

async function saveHost() {
  await api.requestPut('/host/update', form.value);

  dialog.value = false;

  reloadTable();
}

// ===== DELETE =====

async function deleteHost(id: number) {
  await api.requestDelete(`/host/delete?id=${id}`);

  reloadTable();
}

// ===== INIT =====

onMounted(() => {
  reloadTable();
});
</script>
