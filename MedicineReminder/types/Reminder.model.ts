export type Reminder = {
    id: string
    name: string
    description: string
    minutes: number
    hours: number
    repeatCount: number
    days: number[]
}