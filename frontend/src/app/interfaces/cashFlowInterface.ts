export default interface IUserCashFlow {
    cashflowUUID?: string,
    value:number,
    is_income: boolean
    title: string,
    category: string,
    next_payment_date: Date,
    by_days:boolean,
    period: number,
}