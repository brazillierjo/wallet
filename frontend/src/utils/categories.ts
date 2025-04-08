export const incomeCategoryKeys = [
  "categories.income.salary",
  "categories.income.freelance",
  "categories.income.rental",
  "categories.income.investment",
  "categories.income.business",
  "categories.income.pension",
  "categories.income.bonuses",
  "categories.income.dividends",
  "categories.income.grants",
  "categories.income.other",
] as const;

export const expenseCategoryKeys = [
  "categories.expense.housing",
  "categories.expense.transportation",
  "categories.expense.food",
  "categories.expense.utilities",
  "categories.expense.insurance",
  "categories.expense.healthcare",
  "categories.expense.entertainment",
  "categories.expense.shopping",
  "categories.expense.education",
  "categories.expense.debt",
  "categories.expense.savings",
  "categories.expense.gifts",
  "categories.expense.travel",
  "categories.expense.taxes",
  "categories.expense.other",
] as const;

export type IncomeCategoryKey = (typeof incomeCategoryKeys)[number];
export type ExpenseCategoryKey = (typeof expenseCategoryKeys)[number];
