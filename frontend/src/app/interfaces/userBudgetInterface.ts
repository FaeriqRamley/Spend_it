export default interface IUserBudget {
    budgetUUID?: string,
    title: string,
    total: number,
    current: number,
    date_start: Date,
    date_end: Date
}