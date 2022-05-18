import { Component, Input, OnChanges } from '@angular/core';
import { CategorisedCashflow } from '../analytics.model';

interface IncExp {
  Incomes: number;
  Expenses: number;
}

interface Row {
  category: string
  income: number
  expense: number
  result: number
}

const total_category_name = 'Total'

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.sass']
})
export class CashflowComponent implements OnChanges {
  @Input() cashFlow: CategorisedCashflow
  @Input() minDate: Date
  @Input() maxDate: Date
  cashFlowTable: Map<string, IncExp>
  columns = ['category', 'income', 'expense', 'result']
  dataSource: Row[]
  constructor() { }

  ngOnChanges(): void {
    this.cashFlowTable = new Map<string, IncExp>();
    this.cashFlow.Expenses.forEach(e => this.cashFlowTable.set(e.Category, {Incomes: 0, Expenses: e.Total}))
    this.cashFlow.Incomes.forEach(e => {
      const results: IncExp = this.cashFlowTable.has(e.Category) ? {...this.cashFlowTable.get(e.Category), Incomes: e.Total} : {Expenses: 0, Incomes: e.Total}
      this.cashFlowTable.set(e.Category, results)
    })
    this.toDataSource(this.cashFlowTable)    
  }

  toDataSource(m: Map<string, IncExp>) {
    const dataSource: Row[] = []
    let totalIncomes = 0
    let totalExpenses = 0
    m.forEach((val: IncExp, cat: string) => {
      totalIncomes += val.Incomes
      totalExpenses += val.Expenses
      dataSource.push({category: cat, income: val.Incomes, expense: val.Expenses, result: val.Incomes - val.Expenses})
    });
    dataSource.sort((a, b) => b.result - a.result)
    dataSource.push({category: total_category_name, income: totalIncomes, expense: totalExpenses, result: totalIncomes - totalExpenses})
    this.dataSource = dataSource
  }

  getCategory(category: string): string {
    return category === total_category_name ? '' : category
  }

}
