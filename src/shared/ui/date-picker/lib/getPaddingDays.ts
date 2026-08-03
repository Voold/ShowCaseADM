export const getPaddingDays = (year: number, month: number) => (new Date(year, month, 1).getDay() + 6) % 7
