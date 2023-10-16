import { format, parseISO } from 'date-fns'
import { sk } from 'date-fns/locale'

export function formatDateToLocale(dateTime: string | Date) {
    return typeof dateTime !== 'object'
        ? format(parseISO(dateTime as string), 'H:mm dd.MM.yyyy', { locale: sk })
        : format(dateTime, 'H:mm dd.MM.yyyy', { locale: sk })
}
