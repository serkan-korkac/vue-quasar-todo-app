interface Todo {
    id: number | string
    title: string
    tags?: Array<string>
    endDate: Date | String
    state?: State,
    description?: String
}
enum State {
    TODO = 'Todo',
    COMPLETED = 'Completed'
}
export { State }
export type { Todo }
