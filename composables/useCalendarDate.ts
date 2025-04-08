import { CalendarDate } from "@internationalized/date";

export function useCalendarDate() {
    function parseCalendarDate(date: CalendarDate): Date {
        const [year, day, month] = date.toString().split('-')
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    return {
        parseCalendarDate
    }
}