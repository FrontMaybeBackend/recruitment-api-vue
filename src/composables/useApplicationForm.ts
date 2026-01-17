import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/services/api'
import type { Application } from '@/types/Application'
import { JobTypeEnum, PositionTypeEnum } from '@/types/enums'
import { validateApplication } from '@/utils/validateApplication'

export function useApplicationForm(mode: 'create' | 'edit', applicationId?: string) {
    const router = useRouter()
    const toast = useToast()

    const isLoading = ref(false)
    const isSubmitting = ref(false)

    const application = reactive<Application>({
        name: '',
        email: '',
        surname: '',
        phone: '',
        experience: '',
        jobTypeEnum: JobTypeEnum.REMOTE,
        positionTypeEnum: PositionTypeEnum.JUNIOR
    })

    const errors = reactive<Record<string, string>>({})


    onMounted(async () => {
        if (mode === 'edit' && applicationId) {
            isLoading.value = true
            try {
                const res = await api.get(`/applications/${applicationId}`)
                Object.assign(application, res.data)
            } catch (err) {
                console.error('Load error:', err)
                toast.error('Nie udało się załadować zgłoszenia')
            } finally {
                isLoading.value = false
            }
        }
    })


    function clearErrors() {
        Object.keys(errors).forEach(key => delete errors[key])
    }


    function validate(): boolean {
        clearErrors()
        const validationErrors = validateApplication(application)
        Object.assign(errors, validationErrors)

        if (Object.keys(errors).length > 0) {
            toast.error('Popraw błędy w formularzu')
            return false
        }
        return true
    }


    async function submitForm() {
        if (!validate()) return

        isSubmitting.value = true
        try {
            if (mode === 'edit') {
                await api.patch(`/applications/${applicationId}`, application, {
                    headers: { "Content-Type": 'application/merge-patch+json' }
                })
                toast.success('Zgłoszenie zostało zaktualizowane!')
            } else {
                await api.post('/applications', application)
                toast.success('Zgłoszenie zostało pomyślnie dodane!')
            }
            setTimeout(() => router.push('/lista'), 500)
        } catch (err) {
            console.error('Submit error:', err)
            toast.error('Wystąpił błąd podczas zapisu')
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        application,
        errors,
        isLoading,
        isSubmitting,
        submitForm
    }
}
