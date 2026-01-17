<script setup lang="ts">
import { computed } from 'vue'
import { useApplicationForm } from '@/composables/useApplicationForm'
import { jobTypeOptions, positionTypeOptions } from '@/utils/enumTranslations'
import { onlyLetters } from '@/utils/validateApplication'
import '@/assets/application-form.css'

interface Props {
  mode: 'create' | 'edit'
  applicationId?: string
}

const props = defineProps<Props>()


const {
  application,
  errors,
  isLoading,
  isSubmitting,
  submitForm
} = useApplicationForm(props.mode, props.applicationId)

const formTitle = computed(() =>
    props.mode === 'edit' ? 'Edycja zgłoszenia' : 'Formularz zgłoszeniowy'
)

const submitButtonText = computed(() =>
    isSubmitting.value
        ? (props.mode === 'edit' ? 'Zapisywanie...' : 'Wysyłanie...')
        : (props.mode === 'edit' ? 'Zapisz' : 'Wyślij zgłoszenie')
)
</script>

<template>
  <div class="container">
    <h2>{{ formTitle }}</h2>

    <div v-if="isLoading" class="loading">Ładowanie...</div>

    <form v-else @submit.prevent="submitForm">
      <div class="form-group">
        <label>Imię *</label>
        <input
            type="text"
            v-model="application.name"
            :disabled="isSubmitting"
            @input="application.name = onlyLetters(application.name)"
            maxlength="100"
            required
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label>Nazwisko *</label>
        <input
            type="text"
            v-model="application.surname"
            :disabled="isSubmitting"
            @input="application.surname = onlyLetters(application.surname)"
            maxlength="100"
            required
        />
        <span v-if="errors.surname" class="error">{{ errors.surname }}</span>
      </div>

      <div class="form-group">
        <label>Email *</label>
        <input
            v-model="application.email"
            type="email"
            :disabled="isSubmitting"
            required
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Telefon *</label>
        <input
            v-model="application.phone"
            :disabled="isSubmitting"
            type="tel"
            maxlength="9"
            inputmode="numeric"
            pattern="[0-9]*"
            required
        />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label>Doświadczenie (lata) *</label>
        <input
            v-model="application.experience"
            :disabled="isSubmitting"
            type="number"
            inputmode="numeric"
            min="0"
            max="50"
            required
        />
        <span v-if="errors.experience" class="error">{{ errors.experience }}</span>
      </div>

      <div class="form-group">
        <label>Tryb pracy</label>
        <select v-model="application.jobTypeEnum" :disabled="isSubmitting">
          <option v-for="opt in jobTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Poziom doświadczenia</label>
        <select v-model="application.positionTypeEnum" :disabled="isSubmitting">
          <option v-for="opt in positionTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <button class="button-submit" type="submit" :disabled="isSubmitting">
        {{ submitButtonText }}
      </button>
    </form>
  </div>
</template>
