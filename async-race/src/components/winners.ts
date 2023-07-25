import { Car, IPathPagination, SortOrderWinner, SortWinner, Winner } from './utils/types';
import { RouteElement } from './routes/route';
import { ApiWinnersService } from './api/apiWinnersService';
import { EventEmitter } from './emitter';

const svgCar = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="1280.000000pt" height="806.000000pt" viewBox="0 0 1280.000000 806.000000"
    preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,806.000000) scale(0.100000,-0.100000)"
   fill="000000"  stroke="none">
   <path d="M6845 8050 c-38 -5 -135 -13 -215 -20 -376 -30 -754 -106 -1115 -225
   -237 -78 -376 -135 -610 -250 -540 -265 -968 -577 -1441 -1050 -254 -254 -407
   -428 -672 -765 -339 -431 -550 -614 -805 -698 -50 -17 -180 -49 -287 -72 -337
   -73 -537 -140 -765 -258 -550 -286 -828 -748 -899 -1497 -43 -453 -46 -589
   -16 -763 52 -304 149 -494 354 -697 122 -122 219 -193 364 -266 l95 -49 180 0
   180 0 -7 55 c-29 250 -26 448 10 660 113 673 547 1258 1160 1564 908 453 1998
   218 2641 -570 337 -413 518 -983 474 -1493 -6 -78 -14 -159 -18 -179 l-6 -37
   1236 0 c680 0 1238 3 1240 7 2 5 -2 55 -9 113 -7 58 -13 163 -14 233 -2 974
   661 1836 1602 2081 205 54 334 70 553 70 352 0 627 -62 940 -213 558 -270 973
   -767 1138 -1361 54 -192 70 -318 71 -535 1 -110 -2 -233 -7 -273 l-7 -73 46
   38 c69 57 177 185 255 301 152 227 241 473 286 792 30 215 22 415 -28 664 -81
   402 -293 743 -598 963 -2 1 -5 47 -7 100 -4 169 -48 381 -144 698 -122 401
   -246 659 -497 1028 -214 316 -498 666 -763 940 -102 106 -149 146 -256 216
   -415 275 -1040 511 -1724 650 -358 73 -691 117 -1085 145 -121 9 -276 20 -345
   26 -142 11 -381 11 -485 0z m60 -824 c210 -59 384 -203 475 -391 72 -148 73
   -157 77 -580 5 -414 -7 -727 -32 -851 -30 -146 -100 -259 -189 -307 l-41 -22
   -1540 -3 c-1145 -2 -1554 0 -1595 9 -121 25 -221 96 -261 182 -24 53 -25 172
   -3 248 61 205 310 536 693 920 108 107 246 235 306 283 412 330 803 488 1305
   530 25 2 203 2 395 1 294 -1 360 -4 410 -19z m2060 -91 c152 -34 435 -126 543
   -176 388 -179 758 -565 982 -1024 146 -300 194 -533 139 -679 -28 -76 -99
   -139 -186 -166 -63 -19 -92 -20 -991 -20 -924 0 -926 0 -970 21 -51 25 -93 79
   -119 152 -17 49 -18 107 -18 877 l0 825 23 55 c39 95 78 128 180 151 109 25
   261 19 417 -16z"/>
   <path d="M3140 3569 c-718 -69 -1333 -583 -1536 -1285 -51 -174 -66 -310 -62
   -529 5 -226 25 -344 85 -524 95 -285 238 -508 467 -728 279 -269 600 -421
   1020 -482 174 -26 238 -26 412 0 355 52 606 152 866 346 343 255 590 642 678
   1063 63 305 44 631 -55 928 -265 792 -1038 1292 -1875 1211z m359 -939 c201
   -41 398 -169 516 -335 241 -339 213 -786 -69 -1082 -166 -175 -348 -260 -580
   -271 -200 -8 -360 35 -517 139 -444 298 -515 911 -150 1302 199 213 506 308
   800 247z"/>
   <path d="M9871 3569 c-214 -24 -398 -77 -591 -170 -809 -390 -1201 -1314 -919
   -2169 189 -575 685 -1030 1274 -1170 108 -26 346 -60 419 -60 81 0 330 37 441
   65 706 179 1234 772 1330 1492 128 958 -528 1840 -1485 1998 -119 19 -358 27
   -469 14z m319 -930 c350 -56 635 -330 705 -678 23 -112 16 -294 -15 -401 -67
   -234 -235 -431 -455 -536 -141 -67 -196 -79 -370 -79 -175 0 -231 13 -371 80
   -178 86 -313 221 -399 398 -67 139 -79 197 -80 367 0 153 10 210 59 332 107
   263 365 470 648 517 75 12 202 13 278 0z"/>
   </g>
   </svg>
   `;
const limit: IPathPagination = {
  key: '_limit',
  value: 10,
};
const startPage = 1;

export class Winners extends RouteElement {
  public url = 'winners';

  private carsNumbers!: HTMLElement;

  private winnnersHeader!: HTMLElement;

  private pageNumbers!: HTMLElement;

  private prevBtn!: HTMLButtonElement;

  private nextBtn!: HTMLButtonElement;

  private winTableHead!: HTMLElement;

  private idWin!: HTMLElement;

  private carImgWin!: HTMLElement;

  private carNameWin!: HTMLElement;

  private timeWin!: HTMLElement;

  private numbnerWins!: HTMLElement;

  private tableContainer!: HTMLElement;

  private dataWinners!: Winner[];

  private qtyWins!: number;

  private contentTable!: HTMLElement;

  private currentWinnerPage: number = localStorage.getItem('currentPageWinner')
    ? Number(localStorage.getItem('currentPageWinner'))
    : 1;

  constructor(protected emitter: EventEmitter) {
    super(emitter);
    this.getAllWinnersPagination(this.currentWinnerPage);
    this.onSubWin();
    this.getWinnersQty();
  }

  public async getWinnersQty(): Promise<void> {
    const totalCars = await ApiWinnersService.getAllWin();
    this.qtyWins = totalCars.length;
    this.carsNumbers.textContent = String(this.qtyWins);
  }

  public appendElement(parent: HTMLElement): void {
    super.render(parent);
    this.nextBtn = super.renderElement('button', 'next-btn btn win-page-btn', {
      textContent: 'next',
    }) as HTMLButtonElement;
    this.prevBtn = super.renderElement('button', 'prev-btn btn win-page-btn', {
      textContent: 'prev',
    }) as HTMLButtonElement;
    const containerWinPage = super.renderElement('div', 'wrapper-page_controller');
    this.winnnersHeader = super.renderElement('h3', 'title', { textContent: 'Winners #' });
    this.carsNumbers = super.renderElement('span', 'title');
    this.pageNumbers = super.renderElement('h4', 'subtitle-page', { textContent: 'Pages(here number)' });
    this.tableContainer = super.renderElement('div', 'table-container');
    this.winTableHead = super.renderElement('div', 'table-head table-row');
    this.idWin = super.renderElement('span', 'table-id-winner', { textContent: 'Number' });
    this.carImgWin = super.renderElement('span', 'table-img-winner', { textContent: 'Car' });
    this.carNameWin = super.renderElement('span', 'table-name-winner', { textContent: 'Name' });
    this.numbnerWins = super.renderElement('span', 'table-numbers-wins', { textContent: 'Wins' });
    this.timeWin = super.renderElement('span', 'table-time-wins', { textContent: 'Best time' });
    this.wrapper.append(this.winnnersHeader, containerWinPage, this.tableContainer);
    this.winnnersHeader.append(this.carsNumbers);
    containerWinPage.append(this.pageNumbers, this.prevBtn, this.nextBtn);
    this.tableContainer.append(this.winTableHead);
    this.winTableHead.append(this.idWin, this.carImgWin, this.carNameWin, this.numbnerWins, this.timeWin);

    this.numbnerWins.addEventListener('click', this.sortByQtyWins.bind(this));
    this.timeWin.addEventListener('click', this.sortByTime.bind(this));
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));
  }

  private async getAllWinnersPagination(page: number = startPage): Promise<void> {
    this.dataWinners = await ApiWinnersService.getPagination(page, limit);
    if (this.dataWinners.length === 0) {
      this.currentWinnerPage -= 1;
      this.dataWinners = await ApiWinnersService.getPagination(this.currentWinnerPage, limit);
    }
    this.pageNumbers.textContent = String(this.currentWinnerPage);
    this.renderWinner(this.dataWinners);
  }

  private renderWinner(winnerList: Winner[]): void {
    this.contentTable = super.renderElement('div', 'table-content');
    this.tableContainer.append(this.contentTable);
    winnerList.forEach((winner) => {
      const winTableHead = super.renderElement('div', 'table-head table-row');
      const idWin = super.renderElement('span', 'table-id-winner', { textContent: winner.id });
      const carImgWin = super.renderElement('span', 'table-img-winner', { textContent: winner.color });
      const carNameWin = super.renderElement('span', 'table-name-winner', { textContent: winner.name });
      const numbnerWins = super.renderElement('span', 'table-numbers-wins', { textContent: winner.wins });
      const timeWin = super.renderElement('span', 'table-time-wins', { textContent: winner.time });
      carImgWin.innerHTML = svgCar;
      carImgWin.style.fill = winner.color;
      this.contentTable.append(winTableHead);
      winTableHead.append(idWin, carImgWin, carNameWin, numbnerWins, timeWin);
    });
  }

  private async nextPage(): Promise<void> {
    const maxPage = this.qtyWins / limit.value;
    if (this.currentWinnerPage < maxPage) {
      this.nextBtn.disabled = false;
      this.prevBtn.disabled = false;
      this.currentWinnerPage += 1;
      localStorage.setItem('currentPageWinner', String(this.currentWinnerPage));
      this.pageNumbers.textContent = String(this.currentWinnerPage);
      this.contentTable.innerHTML = '';
      const newlist = await this.getAllWinnersPagination(this.currentWinnerPage);
      console.log(newlist);
    } else this.nextBtn.disabled = true;
  }

  private async prevPage(): Promise<void> {
    const minPage = 1;
    if (this.currentWinnerPage > minPage) {
      this.prevBtn.disabled = false;
      this.nextBtn.disabled = false;
      this.currentWinnerPage -= 1;
      localStorage.setItem('currentPageWinner', String(this.currentWinnerPage));
      this.pageNumbers.textContent = String(this.currentWinnerPage);
      this.contentTable.innerHTML = '';
      await this.getAllWinnersPagination(this.currentWinnerPage);
    } else this.prevBtn.disabled = true;
  }

  private onSubWin(): void {
    this.emitter.subscribe('onRemove', (car: Car) => this.onRemoveWin(car));
    this.emitter.subscribe('renderWinners', () => {
      this.contentTable.innerHTML = '';
      this.getAllWinnersPagination(this.currentWinnerPage);
    });
  }

  private async onRemoveWin(car: Car): Promise<void> {
    if (car) {
      const { id } = car;
      const totalCars = await ApiWinnersService.getAllWin();
      const winnerToDelete = totalCars.find((win) => win.carId === id);
      console.log('winnerToDelete', winnerToDelete);
      if (winnerToDelete) await ApiWinnersService.deleteWin(winnerToDelete.id);
      this.getWinnersQty();
      this.contentTable.innerHTML = '';
      this.getAllWinnersPagination(this.currentWinnerPage);
    }
  }

  private async sortByQtyWins(): Promise<void> {
    try {
      if (this.numbnerWins.textContent === 'Wins ⬇️') {
        const sorted = await ApiWinnersService.sortWin(SortWinner.wins, SortOrderWinner.DESC);
        this.numbnerWins.textContent = 'Wins ⬆️';
        this.contentTable.innerHTML = '';
        this.renderWinner(sorted);
      } else {
        const sorted = await ApiWinnersService.sortWin(SortWinner.wins, SortOrderWinner.ASC);
        this.numbnerWins.textContent = 'Wins ⬇️';
        this.contentTable.innerHTML = '';
        this.renderWinner(sorted);
      }
    } catch {
      console.log('cannot sort winners😯');
    }
  }

  private async sortByTime(): Promise<void> {
    try {
      if (this.timeWin.textContent === 'BestTime ⬇️') {
        const sorted = await ApiWinnersService.sortWin(SortWinner.time, SortOrderWinner.DESC);
        this.timeWin.textContent = 'BestTime ⬆️';
        this.contentTable.innerHTML = '';
        this.renderWinner(sorted);
      } else {
        const sorted = await ApiWinnersService.sortWin(SortWinner.wins, SortOrderWinner.ASC);
        this.timeWin.textContent = 'BestTime ⬇️';
        this.contentTable.innerHTML = '';
        this.renderWinner(sorted);
      }
    } catch {
      console.log('cannot sort winners 😯');
    }
  }
}
