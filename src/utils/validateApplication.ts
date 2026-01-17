import type { Application } from '@/types/Application'

export function onlyLetters(value: string): string {
    return value.replace(/[^\p{L}\s-]/gu, '').slice(0, 255)
}

export function validateApplication(application: Application): Record<string, string> {
    const errors: Record<string, string> = {}

    if (!application.name || application.name.trim().length < 2)
        errors.name = 'Imię musi mieć co najmniej 2 znaki'

    if (!application.surname || application.surname.trim().length < 2)
        errors.surname = 'Nazwisko musi mieć co najmniej 2 znaki'

    if (!application.email)
        errors.email = 'Email jest wymagany'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email))
        errors.email = 'Niepoprawny format email'

    if (!application.phone || !/^\d{9}$/.test(application.phone))
        errors.phone = 'Telefon musi mieć dokładnie 9 cyfr'

    const exp = Number(application.experience)
    if (isNaN(exp) || exp < 0 || exp > 50)
        errors.experience = 'Doświadczenie musi być liczbą od 0 do 50'

    return errors
}
