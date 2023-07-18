import { View } from './view';

export class Winners extends View {
  public carsNumbers!: HTMLElement;

  public pageNumbers!: HTMLElement;

  public prevBtn!: HTMLElement;

  public nextBtn!: HTMLElement;

  public appendElement(parent: HTMLElement): void {
    this.nextBtn = super.renderElement('button', 'next-btn btn', { textContent: 'next' });
    this.prevBtn = super.renderElement('button', 'prev-btn btn', { textContent: 'prev' });
    this.carsNumbers = super.renderElement('h3', 'title', { textContent: 'Winners(here number)' });
    this.pageNumbers = super.renderElement('h4', 'subtitle-page', { textContent: 'Pages(here number)' });
    const tableContainer = super.renderElement('div', 'table-container');
    const winnerWrapper = super.renderElement('div', 'winner-wrapper');
    parent.append(winnerWrapper);
    winnerWrapper.append(tableContainer, this.carsNumbers, this.pageNumbers, this.nextBtn, this.prevBtn);
  }
}
