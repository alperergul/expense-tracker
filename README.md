## GitHub User Activity (Node.js)

- **Project URL: https://roadmap.sh/projects/expense-tracker**

> How to use?

```bash
  # installation and build
  npm install
  npm link
  npx tsc

  # Add expenses
  expense-tracker add -d <Description of expense> -a <Amount of expense>
  expense-tracker add -d <Description of expense> -a <Amount of expense>

  # List expenses
  expense-tracker list

  # Summary of expenses
  expense-tracker summary

  # Delete expense
  expense-tracker delete --id <ID of expense>

  # Summary of expenses for specific month
  expense-tracker summary --month <Month as number(2 -> February)>

  # Save expenses as CSV file
  expense-tracker csv
```
