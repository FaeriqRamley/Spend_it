export default interface IExpense {
    title: string,
    value: number,
    date: Date,
    is_income: boolean,
    category: string
}