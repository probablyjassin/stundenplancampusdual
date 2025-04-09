import { CalendarDate } from "@internationalized/date";

export function useCalendarDate() {
    function parseCalendarDate(date: CalendarDate): Date {
        const [year, month, day] = date.toString().split('-')
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    return {
        parseCalendarDate
    }
}