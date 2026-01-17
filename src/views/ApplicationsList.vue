<script setup lang="ts">
import { onMounted } from 'vue'
import { useApplications } from '@/composables/useApplications'
import ApplicationCard from '@/components/ApplicationCard.vue'
import ApplicationFilters from '@/components/ApplicationFilters.vue'
import Pagination from '@/components/Pagination.vue'

const {
  applications,
  selectedJobType,
  selectedPosition,
  currentPage,
  totalItems,
  totalPages,
  isLoading,
  loadApplications,
  nextPage,
  prevPage,
  goToPage
} = useApplications()

onMounted(() => loadApplications())
</script>

<template>
  <div class="container">
    <h2>Lista zgłoszeń</h2>

    <ApplicationFilters
        v-model:selected-job-type="selectedJobType"
        v-model:selected-position="selectedPosition"
    />

    <div v-if="isLoading" class="no-results">Ładowanie...</div>
    <div v-else-if="applications.length === 0" class="no-results">
      Brak zgłoszeń
    </div>

    <div v-else class="applications-grid">
      <ApplicationCard
          v-for="app in applications"
          :key="app.id"
          :application="app"
      />
    </div>

    <Pagination
        v-if="applications.length > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        :displayed-items="applications.length"
        @prev="prevPage"
        @next="nextPage"
        @goto="goToPage"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
</style>
