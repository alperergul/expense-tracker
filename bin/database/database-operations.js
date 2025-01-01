"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.saveAsCSV = exports.writeSummary = exports.deleteExpense = exports.writeList = exports.createOne = exports.save = exports.getNewId = exports.getData = void 0;
const fs = __importStar(require("fs"));
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
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = [];
        try {
            const file = yield fs.readFileSync('./src/db/db.json');
            expenses = JSON.parse(file.toString()).data;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                save([]);
            }
        }
        return expenses;
    });
}
exports.getData = getData;
function getNewId() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 1;
        let expenses = yield getData();
        if (expenses.length > 0) {
            return ++expenses[expenses.length - 1].id;
        }
        return id;
    });
}
exports.getNewId = getNewId;
function save(expenses) {
    return __awaiter(this, void 0, void 0, function* () {
        let dbModel = {
            data: expenses,
        };
        fs.writeFileSync('./src/db/db.json', JSON.stringify(dbModel));
    });
}
exports.save = save;
function createOne(createExpense) {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = yield getData();
        let newExpense = {
            id: yield getNewId(),
            description: createExpense.description,
            amount: createExpense.amount,
            createdDate: new Date(),
        };
        expenses = [...expenses, newExpense];
        yield save(expenses)
            .catch((error) => {
            console.log('Error: ', error);
        })
            .finally(() => console.log(`Expense added successfully (ID: ${newExpense.id})`));
    });
}
exports.createOne = createOne;
function writeList() {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = yield getData();
        const customExpenses = expenses.map((expense) => ({
            ID: expense.id,
            Description: expense.description,
            Amount: expense.amount + ' $',
            Date: expense.createdDate,
        }));
        console.table(customExpenses);
    });
}
exports.writeList = writeList;
function deleteExpense(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = yield getData();
        expenses = expenses.filter((expense) => expense.id !== +id);
        yield save(expenses).finally(() => {
            console.log(`Expense deleted successfully ${id}`);
        });
    });
}
exports.deleteExpense = deleteExpense;
function writeSummary(month) {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = yield getData();
        let totalExpense = 0;
        if (month) {
            expenses.forEach((expense) => {
                if (new Date(expense.createdDate).getMonth() + 1 === +month) {
                    totalExpense += +expense.amount;
                }
            });
            console.log(`Total Expense for ${months[month - 1]}: ${totalExpense}`);
        }
        else {
            expenses.forEach((expense) => {
                totalExpense += +expense.amount;
            });
            console.log(`Total Expense: ${totalExpense}`);
        }
    });
}
exports.writeSummary = writeSummary;
function saveAsCSV() {
    return __awaiter(this, void 0, void 0, function* () {
        let expenses = yield getData();
        const headers = 'ID,Description,amount,date';
        const rows = expenses
            .map((expense) => Object.values(expense).join(','))
            .join('\n');
        const csv = `${headers}\n${rows}`;
        yield fs.writeFileSync('./src/db/expenses.csv', csv);
    });
}
exports.saveAsCSV = saveAsCSV;
//# sourceMappingURL=database-operations.js.map