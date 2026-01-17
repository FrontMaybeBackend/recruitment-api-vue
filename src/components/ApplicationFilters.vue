<script setup lang="ts">
import { JobTypeEnum, PositionTypeEnum } from '@/types/enums'

interface Props {
  selectedJobType: string
  selectedPosition: string
}

interface Emits {
  (e: 'update:selectedJobType', value: string): void
  (e: 'update:selectedPosition', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="filters">
    <select
        :value="selectedJobType"
        @change="emit('update:selectedJobType', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Tryby pracy</option>
      <option :value="JobTypeEnum.REMOTE">Zdalnie</option>
      <option :value="JobTypeEnum.HYBRID">Hybrydowo</option>
      <option :value="JobTypeEnum.ONSITE">Stacjonarnie</option>
    </select>

    <select
        :value="selectedPosition"
        @change="emit('update:selectedPosition', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Poziom doświadczenia</option>
      <option :value="PositionTypeEnum.JUNIOR">Junior</option>
      <option :value="PositionTypeEnum.MID">Mid</option>
      <option :value="PositionTypeEnum.SENIOR">Senior</option>
    </select>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters select {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.filters select:hover {
  border-color: #4caf50;
}

.filters select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}
</style>
