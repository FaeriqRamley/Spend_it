export default interface IUserCashFlow {
    cashflowUUID?: string,
    title: string,
    category: string,
    value:number,
    by_days:boolean,
    period: number,
    is_income: boolean
}