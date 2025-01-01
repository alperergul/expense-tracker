#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const database_operations_1 = require("./database/database-operations");
let program = new commander_1.Command();
program
    .command('add')
    .requiredOption('-d, --description [string]', 'Description of expense')
    .requiredOption('-a, --amount [number]', 'Amount of expense')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_operations_1.createOne)(options);
}));
program.command('list').action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_operations_1.writeList)();
}));
program
    .command('delete')
    .requiredOption('-i, --id [number]', 'ID of expense')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_operations_1.deleteExpense)(options.id);
}));
program
    .command('summary')
    .option('-m, --month [number]', 'The month you want to see your expense')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.month) {
        (0, database_operations_1.writeSummary)(options.month);
    }
    else {
        yield (0, database_operations_1.writeSummary)();
    }
}));
program.command('csv').action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_operations_1.saveAsCSV)();
}));
program.parse();
//# sourceMappingURL=index.js.map