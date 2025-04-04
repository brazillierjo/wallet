export const incomeCategories = [
  "Salary",
  "Freelance",
  "Rental",
  "Investment",
  "Business",
  "Pension",
  "Bonuses",
  "Dividends",
  "Grants",
  "Other income",
] as const;

export const expenseCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Education",
  "Debt",
  "Savings",
  "Gifts",
  "Travel",
  "Taxes",
  "Other expenses",
] as const;

export type IncomeCategory = (typeof incomeCategories)[number];
export type ExpenseCategory = (typeof expenseCategories)[number];
