#!/usr/bin/env node

import { Command } from 'commander';
import {
  createOne,
  deleteExpense,
  saveAsCSV,
  writeList,
  writeSummary,
} from './database/database-operations';
import { CreateExpense } from './models/create-expense.model';

let program = new Command();

program
  .command('add')
  .requiredOption('-d, --description [string]', 'Description of expense')
  .requiredOption('-a, --amount [number]', 'Amount of expense')
  .action(async (options: CreateExpense) => {
    await createOne(options);
  });

program.command('list').action(async () => {
  await writeList();
});

program
  .command('delete')
  .requiredOption('-i, --id [number]', 'ID of expense')
  .action(async (options) => {
    await deleteExpense(options.id);
  });

program
  .command('summary')
  .option('-m, --month [number]', 'The month you want to see your expense')
  .action(async (options) => {
    if (options.month) {
      writeSummary(options.month);
    } else {
      await writeSummary();
    }
  });

program.command('csv').action(async () => {
  await saveAsCSV();
});

program.parse();
