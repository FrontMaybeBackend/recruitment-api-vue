<script setup lang="ts">
import type { Application } from '@/types/application'
import { jobTypeLabels } from '@/utils/enumTranslations'

defineProps<{
  application: Application
}>()
</script>

<template>
  <div class="application-card">
    <div class="card-header">
      <h3>{{ application.name }} {{ application.surname }}</h3>
      <span class="badge">{{ application.positionTypeEnum }}</span>
    </div>

    <div class="card-body">
      <p>
        <span class="label">Email:</span>
        <span class="value">{{ application.email }}</span>
      </p>
      <p>
        <span class="label">Telefon:</span>
        <span class="value">{{ application.phone }}</span>
      </p>
      <p>
        <span class="label">Doświadczenie:</span>
        <span class="value">{{ application.experience }} lata</span>
      </p>
      <p>
        <span class="label">Tryb pracy:</span>
        <span class="value">{{ jobTypeLabels[application.jobTypeEnum] }}</span>
      </p>
    </div>

    <div class="card-footer">
      <router-link :to="`/edit/${application.id}`" class="edit-btn">
        Edytuj
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.application-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.application-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f5f5f5;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.badge {
  background: #4caf50;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-body {
  margin-bottom: 15px;
}

.card-body p {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.label {
  font-weight: 600;
  color: #666;
  min-width: 120px;
}

.value {
  color: #333;
}

.card-footer {
  padding-top: 15px;
  border-top: 1px solid #f5f5f5;
}

.edit-btn {
  display: inline-block;
  padding: 10px 20px;
  background: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #1976d2;
  transform: translateX(2px);
}
</style>
