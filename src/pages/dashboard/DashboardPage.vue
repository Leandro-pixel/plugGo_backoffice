<template>
  <q-layout>
    <q-page class="q-pa-md">
      <!-- KPIs -->
      <div class="row q-col-gutter-md">
        <q-card class="col">
          <q-card-section>
            <div class="text-subtitle2">Estações ativas</div>
            <div class="text-h5">1</div>
          </q-card-section>
        </q-card>

        <!-- KPIs
        <q-card class="col">
          <q-card-section>
            <div class="text-subtitle2">Carregamentos</div>
            <div class="text-h5">1.842</div>
          </q-card-section>
        </q-card>
        -->

        <!-- adiciona os outros -->
      </div>

      <!-- MAPA -->
      <q-card class="q-mt-md">
        <q-card-section>
          <div id="map" style="height: 400px"></div>
        </q-card-section>
      </q-card>

      <!-- GRÁFICOS -->
      <div class="row q-col-gutter-md q-mt-md">
        <q-card class="col">
          <q-card-section>
            <canvas id="lineChart"></canvas>
          </q-card-section>
        </q-card>

        <q-card class="col">
          <q-card-section>
            <canvas id="pieChart"></canvas>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//import { Address } from 'src/models/address'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from 'src/lib/api';

// 🔥 CORREÇÃO DO ÍCONE
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    'leaflet/dist/images/marker-icon-2x.png',
    import.meta.url
  ).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    .href,
});
const spots = ref([]);
onMounted(async () => {
  // ✅ cria o mapa primeiro
  const map = L.map('map').setView([-23.55, -46.63], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  // 📍 pega localização do usuário
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.setView([lat, lng], 14);

    L.marker([lat, lng]).addTo(map).bindPopup('Você está aqui');
  });

  try {
    const response = await api.requestGet('/host/list-all-spots');

    const data = Array.isArray(response) ? response : response.data;

    if (Array.isArray(data)) {
      spots.value = data;

      const bounds = [];

      spots.value.forEach((spot: any) => {
        const lat = Number(spot.latitude);
        const lng = Number(spot.longitude);

        console.log('Convertido:', lat, lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`
  <div style="min-width: 150px">
    <strong>${spot.name || 'Carregador'}</strong><br/>

    ⭐ ${spot.ratingAverage ?? 'N/A'}
    (${spot.reviewsCount ?? 0} avaliações)<br/>

    Status: ${spot.status}
  </div>
`);

          bounds.push([lat, lng]);
        }
      });

      // 🔥 centraliza automaticamente nos markers
      if (bounds.length > 0) {
        map.fitBounds(bounds);
      }
    }
  } catch (error) {
    console.error('Erro ao buscar spots:', error);
  }
});
</script>
