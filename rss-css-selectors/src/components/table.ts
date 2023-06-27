import { ComponentCreate } from './ComponentCreate';

class Table extends ComponentCreate {
  constructor() {
    super('div', 'perspective table-wrapper');
    const tableBox = new ComponentCreate('div', 'table-box');
    const table = new ComponentCreate('div', 'table');
    const tableTop = new ComponentCreate('div', 'table-top');
    const tableBottom = new ComponentCreate('div', 'table-bottom');
    const tableLeftLeg = new ComponentCreate('div', 'table-leg');
    const tableRightLeg = new ComponentCreate('div', 'table-leg');
    this.appendComponent(tableBox);
    tableBox.appendComponent(table, tableTop);
    this.appendComponent(tableBottom);
    tableBottom.appendComponent(tableLeftLeg, tableRightLeg);
  }
}

export { Table };
