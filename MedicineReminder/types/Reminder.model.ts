export type Reminder = {
    id: string
    name: string
    minutes: number
    hours: number
    repeatCount: number
    description: string
    active: boolean
    days: number[]
}