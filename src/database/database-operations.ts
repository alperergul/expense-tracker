import * as fs from 'fs';
import { CreateExpense } from '../models/create-expense.model';
import { DbModel } from '../models/db.model';
import { Expense } from '../models/expense.model';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export async function getData(): Promise<Expense[]> {
  let expenses: Expense[] = [];
  try {
    const file = await fs.readFileSync('./src/db/db.json');
    expenses = JSON.parse(file.toString()).data;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      save([]);
    }
  }

  return expenses;
}

export async function getNewId(): Promise<number> {
  let id: number = 1;
  let expenses: Expense[] = await getData();

  if (expenses.length > 0) {
    return ++expenses[expenses.length - 1].id;
  }

  return id;
}

export async function save(expenses: Expense[]) {
  let dbModel: DbModel = {
    data: expenses,
  };

  fs.writeFileSync('./src/db/db.json', JSON.stringify(dbModel));
}

export async function createOne(createExpense: CreateExpense) {
  let expenses: Expense[] = await getData();

  let newExpense: Expense = {
    id: await getNewId(),
    description: createExpense.description,
    amount: createExpense.amount,
    createdDate: new Date(),
  };

  expenses = [...expenses, newExpense];

  await save(expenses)
    .catch((error) => {
      console.log('Error: ', error);
    })
    .finally(() =>
      console.log(`Expense added successfully (ID: ${newExpense.id})`)
    );
}

export async function writeList() {
  let expenses: Expense[] = await getData();

  const customExpenses = expenses.map((expense: Expense) => ({
    ID: expense.id,
    Description: expense.description,
    Amount: expense.amount + ' $',
    Date: expense.createdDate,
  }));

  console.table(customExpenses);
}

export async function deleteExpense(id: number) {
  let expenses: Expense[] = await getData();

  expenses = expenses.filter((expense: Expense) => expense.id !== +id);

  await save(expenses).finally(() => {
    console.log(`Expense deleted successfully ${id}`);
  });
}

export async function writeSummary(month?: number) {
  let expenses: Expense[] = await getData();

  let totalExpense: number = 0;
  if (month) {
    expenses.forEach((expense: Expense) => {
      if (new Date(expense.createdDate).getMonth() + 1 === +month) {
        totalExpense += +expense.amount;
      }
    });
    console.log(`Total Expense for ${months[month - 1]}: ${totalExpense}`);
  } else {
    expenses.forEach((expense: Expense) => {
      totalExpense += +expense.amount;
    });
    console.log(`Total Expense: ${totalExpense}`);
  }
}

export async function saveAsCSV() {
  let expenses = await getData();

  const headers = 'ID,Description,amount,date';
  const rows = expenses
    .map((expense: Expense) => Object.values(expense).join(','))
    .join('\n');
  const csv = `${headers}\n${rows}`;

  await fs.writeFileSync('./src/db/expenses.csv', csv);
}
