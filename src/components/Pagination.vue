<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  displayedItems: number
}

interface Emits {
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'goto', page: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div v-if="totalPages > 1" class="pagination-wrapper">
    <div class="pagination">
      <button
          @click="emit('prev')"
          :disabled="currentPage === 1"
          class="page-btn"
      >
        ← Poprzednia
      </button>

      <div class="page-numbers">
        <button
            v-for="page in totalPages"
            :key="page"
            @click="emit('goto', page)"
            :class="['page-number', { active: currentPage === page }]"
        >
          {{ page }}
        </button>
      </div>

      <button
          @click="emit('next')"
          :disabled="currentPage === totalPages"
          class="page-btn"
      >
        Następna →
      </button>
    </div>

    <div class="pagination-info">
      Wyświetlono {{ displayedItems }} z {{ totalItems }} zgłoszeń
    </div>
  </div>
</template>

<style scoped>
.pagination-wrapper {
  margin-top: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.page-btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.page-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  padding: 8px 14px;
  background: white;
  color: #333;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.page-number:hover {
  border-color: #4caf50;
  color: #4caf50;
}

.page-number.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.pagination-info {
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
