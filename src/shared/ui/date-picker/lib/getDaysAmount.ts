/** @param month index from `0` to `11` */
export const getDaysAmount = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
