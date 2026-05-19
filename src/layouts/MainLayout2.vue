<template>
  <q-layout view="lHh Lpr lFr">
    <q-page-container>
      <!-- Drawer sempre fixo e aberto -->
      <q-drawer
        show-if-above
        bordered
        :width="220"
        :breakpoint="100"
        :model-value="true"
        :mini="leftDrawerOpen"
      >
        <div class="column fit bg-primary q-pt-md">
          <div class="desktop-hide flex justify-end q-pr-md width-full">
            <PrimaryButton
              dense
              icon="menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
              class="lt-md"
            />
          </div>
          <q-scroll-area style="flex: 1">
            <div class="row full-width flex-center q-ma-md q-pb-md">
              <q-img
                fit="fill"
                :src="
                  leftDrawerOpen
                    ? 'logos/icone_brands.png'
                    : 'logos/logo_brands.png'
                "
                class="logo__img"
              />
            </div>
            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>

            <q-list padding>
              <!-- Dashboard -->
              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'dashboard'"
                active-class="menu-active"
                @click="handleButtonClick('/dashboard', 'dashboard')"
              >
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>Dashboard</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'stations'"
                active-class="menu-active"
                @click="handleButtonClick('/stations', 'stations')"
              >
                <q-item-section avatar>
                  <q-icon name="ev_station" />
                </q-item-section>
                <q-item-section>Estações</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'charges'"
                active-class="menu-active"
                @click="handleButtonClick('/charges', 'charges')"
              >
                <q-item-section avatar>
                  <q-icon name="bolt" />
                </q-item-section>
                <q-item-section>Carregamentos</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'drivers'"
                active-class="menu-active"
                @click="handleButtonClick('/drivers', 'drivers')"
              >
                <q-item-section avatar>
                  <q-icon name="group" />
                </q-item-section>
                <q-item-section>Motoristas</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'hosts'"
                active-class="menu-active"
                @click="handleButtonClick('/hosts', 'hosts')"
              >
                <q-item-section avatar>
                  <q-icon name="group" />
                </q-item-section>
                <q-item-section>Hosts</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'reports'"
                active-class="menu-active"
                @click="handleButtonClick('/reports', 'reports')"
              >
                <q-item-section avatar>
                  <q-icon name="bar_chart" />
                </q-item-section>
                <q-item-section>Relatórios</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'finance'"
                active-class="menu-active"
                @click="handleButtonClick('/finance', 'finance')"
              >
                <q-item-section avatar>
                  <q-icon name="attach_money" />
                </q-item-section>
                <q-item-section>Financeiro</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'settings'"
                active-class="menu-active"
                @click="handleButtonClick('/settings', 'settings')"
              >
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>Configurações</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="selectedItem === 'support'"
                active-class="menu-active"
                @click="handleButtonClick('/support', 'support')"
              >
                <q-item-section avatar>
                  <q-icon name="help_outline" />
                </q-item-section>
                <q-item-section>Suporte</q-item-section>
              </q-item>
            </q-list>
            <div class="row full-width flex-center q-ma-md">
              <q-separator class="separators" />
            </div>
          </q-scroll-area>
        </div>
      </q-drawer>
      <q-page-container
        class="flex column q-pa-md items-center no-wrap q-pl-md"
        style="padding-left: 12px"
      >
        <div class="q-ma-md rounded-borders width-full">
          <q-toolbar class="row justify-space-between">
            <!-- Texto à esquerda -->
            <q-toolbar-title class="row flex-start text-primary">
              <span class="text-primary text-h4">{{ pageName }}</span>
            </q-toolbar-title>

            <!-- Container à direita com texto e botões -->
            <div class="row items-center">
              <!-- Texto no container à direita -->
              <div class="column gt-xs items-end">
                <span
                  class="q-mr-md text-primary text-subtitle1"
                  style="line-height: 1"
                >
                  {{ name }}
                </span>
                <span
                  class="q-mr-md text-accent text-subtitle2"
                  style="line-height: 1"
                >
                  {{ type }}
                </span>
              </div>

              <!-- Botão de notificação -->
              <q-btn
                flat
                round
                dense
                size="1.2rem"
                icon="notifications"
                class="text-primary"
              >
                <q-badge class="q-mt-sm" color="red" rounded floating
                  >9+</q-badge
                >
                <q-tooltip class="text-subtitle2">Notificações</q-tooltip>
              </q-btn>

              <!-- Botão de sair -->
              <q-btn
                flat
                round
                dense
                size="1.2rem"
                icon="logout"
                @click="logout"
                class="text-primary"
              >
                <q-tooltip class="text-subtitle2">Sair</q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>
        </div>

        <router-view class="q-pa-md" />
      </q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import api from 'src/lib/api';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
//import { implementHierarchy, ShowDialog } from 'src/utils/utils';
const route = useRoute();
const pageName = computed(() => {
  return (route.meta as any).title || 'Dashboard';
});
const leftDrawerOpen = ref(false);
const selectedItem = ref<string | null>(null);
const router = useRouter();
const name = ref('');
const type = ref('');

onMounted(() => {
  name.value = localStorage.getItem('userName');
});

const logout = () => {
  api.logout();
  router.push('/');
};

// Update button click handlers
const handleButtonClick = (route: string, name: string) => {
  router.push(route);
  selectedItem.value = name; // Atualiza o item selecionado
};
</script>
<style scoped>
.menu-active {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  border-radius: 10px;
}

.q-item {
  border-radius: 10px;
  margin-bottom: 6px;
}

.q-item:hover {
  background: rgba(37, 99, 235, 0.1);
}
</style>
