import { DateInput } from "@fullcalendar/core/index.js"

export interface CalendarEventCategorie {
    id: number,
    name: string,
    color: string
}
export interface CalendarEvent {
    id: number,
    name: string,
    calenderEventCategoryColor: string,
    calenderEventCategoryNAme: string,
    description: string,
    startingDate: string,
    endingDate: string,
    url:string
}
export interface Event {
    title: string,
     start: DateInput,
     color:string,
     end:DateInput
}