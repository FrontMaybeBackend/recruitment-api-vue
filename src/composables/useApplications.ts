import { ref, computed, watch } from 'vue'
import api from "@/services/api"
import type { Application } from "@/types/application"

export function useApplications() {
  const applications = ref<Application[]>([])
  const selectedJobType = ref<string>('')
  const selectedPosition = ref<string>('')
  const currentPage = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(3)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const totalPages = computed(() =>
      Math.ceil(totalItems.value / (itemsPerPage.value || 1))
  )

  async function loadApplications() {
    isLoading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      params.append('page', currentPage.value.toString())

      if (selectedJobType.value) {
        params.append('jobTypeEnum', selectedJobType.value)
      }
      if (selectedPosition.value) {
        params.append('positionTypeEnum', selectedPosition.value)
      }

      const response = await api.get(`/applications?${params.toString()}`)
      applications.value = response.data.member ?? []
      totalItems.value = response.data.totalItems ?? applications.value.length
    } catch (err: unknown) {
      console.error('Błąd:', err)
      if (err instanceof Error) {
        error.value = err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  function goToPage(page: number) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }


  watch([selectedJobType, selectedPosition], () => {
    currentPage.value = 1
    loadApplications()
  })

  watch(currentPage, () => loadApplications())

  return {
    applications,
    selectedJobType,
    selectedPosition,
    currentPage,
    totalItems,
    totalPages,
    isLoading,
    error,
    loadApplications,
    nextPage,
    prevPage,
    goToPage
  }
}
