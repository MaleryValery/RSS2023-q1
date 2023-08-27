/* eslint-disable no-undef */
import { View } from './view';
import { Car, CreateWinner, Engine } from './utils/types';
import { EventEmitter } from './emitter';
import { CarsApiService } from './api/apiCarService';
import { ApiWinnersService } from './api/apiWinnersService';

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

const startPage = 1;
const limit = 7;

export class Cars extends View {
  private dataCars!: Car[];

  private paginationWrapper!: HTMLElement;

  private carImgBox!: HTMLElement;

  private carName!: HTMLElement;

  private pageNumbers!: HTMLElement;

  private prevBtn!: HTMLButtonElement;

  private nextBtn!: HTMLButtonElement;

  private carsNumbers!: HTMLElement;

  private carsListWrapper!: HTMLElement;

  private garageSubtitle!: HTMLElement;

  private flagImg!: HTMLElement;

  private qtyCars!: string | null;

  private currentPage: number = localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1;

  private pageSubtitle!: HTMLElement;

  private startCar!: HTMLButtonElement;

  private stopCar!: HTMLButtonElement;

  private winnerTime!: number;

  constructor(protected emitter: EventEmitter) {
    super(emitter);
    this.getCars(limit, this.currentPage);
    this.subscribeCars();
  }

  public updateCarsQty(qty: string | null): void {
    this.carsNumbers.textContent = qty;
  }

  public async getCars(limitCars: number, pageGarage: number = startPage): Promise<void> {
    const request = await fetch(`http://127.0.0.1:3000/garage?_page=${pageGarage}&_limit=${limitCars}`, {
      method: 'GET',
    });
    this.qtyCars = request.headers.get('X-Total-Count');
    this.updateCarsQty(this.qtyCars);
    this.dataCars = await CarsApiService.getPagination(pageGarage, limitCars);
    if (this.dataCars.length === 0) {
      this.currentPage = Number(this.qtyCars) / limitCars < 1 ? 1 : Math.round(Number(this.qtyCars) / limitCars);
      this.dataCars = await CarsApiService.getPagination(this.currentPage, limitCars);
    }

    this.pageNumbers.textContent = String(this.currentPage);
    this.renderCars(this.dataCars);
  }

  public appendElement(parent: HTMLElement): void {
    this.carsListWrapper = super.renderElement('div', 'cars-list-wrapper');
    parent.append(this.renderPaginationContainer());
    parent.append(this.carsListWrapper);
  }

  private renderPaginationContainer(): HTMLElement {
    this.paginationWrapper = super.renderElement('div', 'cars-pagination');
    this.garageSubtitle = super.renderElement('h3', 'title', { textContent: `Garage #` });
    this.pageSubtitle = super.renderElement('h4', 'subtitle-page', { textContent: 'Pages #' });
    this.carsNumbers = super.renderElement('span', 'title');
    this.pageNumbers = super.renderElement('span', 'subtitle-page');
    this.garageSubtitle.append(this.carsNumbers);
    this.pageSubtitle.append(this.pageNumbers);
    this.prevBtn = super.renderElement('button', 'prev-btn btn', { textContent: 'prev' }) as HTMLButtonElement;
    this.nextBtn = super.renderElement('button', 'next-btn btn', { textContent: 'next' }) as HTMLButtonElement;
    const pageContainer = super.renderElement('div', 'page-wrapper');
    pageContainer.append(this.pageSubtitle, this.prevBtn, this.nextBtn);
    this.paginationWrapper.append(this.garageSubtitle, pageContainer);
    this.bindPaginationBtns();
    return this.paginationWrapper;
  }

  private bindPaginationBtns(): void {
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));
  }

  public renderCars(cars: Car[]): void {
    cars.forEach((car) => {
      const raceContainer = super.renderElement('div', 'race-container', { id: car.id });
      const carContainer = super.renderElement('div', 'car-container');
      const carBoxRow1 = super.renderElement('div', 'row1');
      const carBoxRow2 = super.renderElement('div', 'row2');
      const engineBtn = super.renderElement('div', 'engine-btn-box');
      const selectCarBtn = super.renderElement('button', 'select-btn btn', { textContent: 'select' });
      const removeCarBtn = super.renderElement('button', 'remove-btn btn', { textContent: 'remove' });
      this.startCar = super.renderElement('button', 'start-btn engine-btn', {
        textContent: 'A',
      }) as HTMLButtonElement;
      this.stopCar = super.renderElement('button', 'stop-btn engine-btn disabled', {
        textContent: 'B',
      }) as HTMLButtonElement;
      this.stopCar.disabled = true;
      this.carName = super.renderElement('h5', 'car-name', { textContent: car.name });
      this.carImgBox = super.renderElement('div', 'car-img-box');

      this.carImgBox.innerHTML = svgCar;
      this.carImgBox.style.fill = car.color;
      this.flagImg = super.renderElement('div', 'flag');
      raceContainer.append(carContainer, this.flagImg);
      carContainer.append(carBoxRow1, carBoxRow2);
      carBoxRow1.append(selectCarBtn, removeCarBtn, this.carName);
      carBoxRow2.append(engineBtn, this.carImgBox);
      engineBtn.append(this.startCar, this.stopCar);
      this.carsListWrapper.append(raceContainer);
      selectCarBtn.addEventListener('click', this.selectCar.bind(this));
      removeCarBtn.addEventListener('click', this.removeCar.bind(this));
      this.startCar.addEventListener('click', this.startOneEngin.bind(this));
      this.stopCar.addEventListener('click', this.stopOneEngin.bind(this));
    });
  }

  private async selectCar(event: Event): Promise<void> {
    try {
      const id = this.getIdCar(event);
      const selectedCar = await CarsApiService.getCar(id);
      if (id) {
        this.emitter.onEmit('onSelectedCar', selectedCar);
      }
    } catch {
      console.log('😔 cannot select car');
    }
  }

  private subscribeCars(): void {
    this.emitter.subscribe('onUpdateCar', (car: Car) => this.onUpdateCar(car));
    this.emitter.subscribe('onCreatedCar', () => this.onCreatedCar());
    this.emitter.subscribe('onStartRace', () => this.startRace());
    this.emitter.subscribe('onStopRace', () => this.stopRace());
  }

  private async removeCar(event: Event): Promise<void> {
    try {
      const id = this.getIdCar(event);
      if (id) {
        const car = await CarsApiService.getCar(id);
        await CarsApiService.deleteCar(id);
        this.carsListWrapper.innerHTML = '';
        this.getCars(limit, this.currentPage);
        this.emitter.onEmit('clearInputs');
        this.emitter.onEmit('onRemove', car);
      }
    } catch {
      console.log('💣 cannot remove car');
    }
  }

  private async onUpdateCar(newcar: Car): Promise<void> {
    try {
      const searchCar = await CarsApiService.getCar(newcar.id);
      if (searchCar.id) {
        const imgCar = document.getElementById(`${newcar.id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
        const nameCar = document.getElementById(`${newcar.id}`)?.children[0].children[0].childNodes[2] as HTMLElement;
        imgCar.style.fill = newcar.color;
        nameCar.textContent = newcar.name;
        this.carsNumbers.textContent = String(this.qtyCars);
      }
    } catch {
      console.log('car is not exist');
    }
  }

  private async onCreatedCar(): Promise<void> {
    this.dataCars = await CarsApiService.getPagination(this.currentPage, limit);
    this.carsListWrapper.innerHTML = '';
    this.renderCars(this.dataCars);
  }

  private async nextPage(): Promise<void> {
    try {
      const maxPage = Number(this.qtyCars) / limit;
      if (this.currentPage < maxPage) {
        this.nextBtn.disabled = false;
        this.prevBtn.disabled = false;
        this.currentPage += 1;
        localStorage.setItem('currentPage', String(this.currentPage));
        this.pageNumbers.textContent = String(this.currentPage);
        this.carsListWrapper.innerHTML = '';
        this.getCars(limit, this.currentPage);
      } else this.nextBtn.disabled = true;
    } catch {
      console.log('👁️👁️cannot get next page');
    }
  }

  private async prevPage(): Promise<void> {
    try {
      const minPage = 1;
      if (this.currentPage > minPage) {
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
        this.currentPage -= 1;
        localStorage.setItem('currentPage', String(this.currentPage));
        this.pageNumbers.textContent = String(this.currentPage);
        this.carsListWrapper.innerHTML = '';
        this.getCars(limit, this.currentPage);
      } else {
        this.prevBtn.disabled = true;
      }
    } catch {
      console.log('👁️👁️cannot get prev page');
    }
  }

  private async startOneEngin(event: Event): Promise<Response> {
    let intervalAnim: string | number | NodeJS.Timer | undefined;
    try {
      const id = this.getIdCar(event);
      const imgCar = document.getElementById(`${id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
      const changeToStart = await CarsApiService.onEnginCar(id, Engine.Started);
      const targetBtn = event.target as HTMLButtonElement;
      this.disableOneButton(targetBtn);
      const flagDist = window.screen.width - this.flagImg.offsetLeft + this.flagImg.offsetWidth;
      let leftDist = this.carImgBox.offsetLeft - this.carImgBox.offsetWidth + 5;
      const fullDis = window.screen.width - leftDist - flagDist; //
      const partDis = (fullDis - leftDist) / (((changeToStart.velocity * 50) / 1000) * 60);
      this.emitter.subscribe('onStopCar', () => clearInterval(intervalAnim));
      intervalAnim = setInterval(() => {
        leftDist += partDis;
        if (leftDist >= fullDis) {
          clearInterval(intervalAnim);
        }
        imgCar.style.transform = `translateX(${leftDist}px)`;
      }, 16);
      const runCar = fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, { method: 'PATCH' });
      runCar.then((res) => res.json()).catch((error) => new Error(error));
      const runStatus = (await runCar).status;
      if (runStatus !== 200) clearInterval(intervalAnim);
      return await runCar;
    } catch (error) {
      clearInterval(intervalAnim);
      throw new Error('💥 Engine is broken');
    }
  }

  private async startRaceEngin(idCar: number): Promise<Response> {
    let intervalAnim: string | number | NodeJS.Timer | undefined;
    try {
      const id = idCar;
      const start = Date.now();
      const currentCar = await CarsApiService.getCar(id);
      const imgCar = document.getElementById(`${id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
      const changeToStart = await CarsApiService.onEnginCar(id, Engine.Started);
      this.disableButtons();
      const flagDist = window.screen.width - this.flagImg.offsetLeft + this.flagImg.offsetWidth;
      let leftDist = this.carImgBox.offsetLeft - this.carImgBox.offsetWidth + 5;
      const fullDis = window.screen.width - leftDist - flagDist; //
      const partDis = (fullDis - leftDist) / (((changeToStart.velocity * 50) / 1000) * 60);
      this.emitter.subscribe('onStopCar', () => clearInterval(intervalAnim));
      intervalAnim = setInterval(() => {
        leftDist += partDis;
        if (leftDist >= fullDis) {
          const end = Date.now();
          clearInterval(intervalAnim);

          if (!this.winnerTime) {
            this.winnerTime = +((end - start) / 1000).toFixed(2);
            this.addWinner(id, this.winnerTime, currentCar.color, currentCar.name);
            this.showWinMessage(id, currentCar.name, this.winnerTime);
          }
        }
        imgCar.style.transform = `translateX(${leftDist}px)`;
      }, 16);
      const runCar = fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, { method: 'PATCH' });
      runCar.then((res) => res.json()).catch((error) => new Error(error));
      const runStatus = (await runCar).status;
      if (runStatus !== 200) clearInterval(intervalAnim);
      return await runCar;
    } catch (error) {
      clearInterval(intervalAnim);
      throw new Error('💥 Engine is broken');
    }
  }

  private async stopOneEngin(event?: Event, idCar?: number): Promise<void> {
    try {
      const id = event ? this.getIdCar(event) : (idCar as number);
      await CarsApiService.onEnginCar(id, Engine.Stopped);
      this.emitter.onEmit('onStopCar');
      const imgCar = document.getElementById(`${id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
      imgCar.style.transform = 'translateX(0px)';
      const startRaceBtn = document.querySelector('.start-race-btn') as HTMLButtonElement;
      const currStopBtn = event?.target as HTMLButtonElement;
      const currStartBtn = currStopBtn.previousElementSibling as HTMLButtonElement;
      currStartBtn.disabled = false;
      if (startRaceBtn) startRaceBtn.disabled = false;
      startRaceBtn.classList.remove('disabled');
      currStartBtn.classList.remove('disabled');

      const stopButton = event?.target as HTMLButtonElement;
      stopButton.disabled = true;
      stopButton.classList.add('disabled');
    } catch {
      console.log('🤓 i was trying to stop car');
    }
  }

  private getIdCar(event: Event): number {
    const curr = event.target as HTMLElement;
    const carCont = curr.closest('.race-container');
    const id = Number(carCont?.id);
    return id;
  }

  private async startRace(): Promise<void> {
    try {
      this.disableButtons();
      const winners: Response[] = [];
      const currentPageCars = await CarsApiService.getPagination(this.currentPage, limit);

      currentPageCars.forEach(async (car) => {
        const raceCar = await this.startRaceEngin(car.id);
        if (raceCar.status === 200) winners.push(raceCar);
      });
      this.winnerTime = 0;
    } catch {
      console.log('🚗 cannot start race ');
    }
  }

  private async stopRace(): Promise<void> {
    try {
      const currentPageCars = await CarsApiService.getPagination(this.currentPage, limit);
      currentPageCars.forEach((car) => this.stopOneEngin(undefined, car.id));
      this.activeteButtons();
    } catch {
      console.log('🤓 i was trying to stop rase');
    }
  }

  private async addWinner(carId: number, time: number, colorCar: string, nameCar: string): Promise<void> {
    try {
      const checkWinner = (await ApiWinnersService.getAllWin()).find((win) => win.carId === carId);
      if (checkWinner) {
        checkWinner.wins += 1;
        checkWinner.time = checkWinner.time < time ? checkWinner.time : time;
        const updateWin = {
          name: nameCar,
          wins: checkWinner.wins,
          time: checkWinner.time,
          color: checkWinner.color,
        };
        await ApiWinnersService.updateWin(checkWinner.id, updateWin);
      } else {
        const winner: CreateWinner = {
          carId,
          time,
          wins: 1,
          color: colorCar,
          name: nameCar,
        };
        await ApiWinnersService.createWin(winner);
      }
      this.emitter.onEmit('renderWinners');
    } catch {
      console.error('Winner is not found');
    }
  }

  private showWinMessage(id: number, name: string, time: number): void {
    try {
      const popUpWrapper = super.renderElement('div', 'popup-wrapper');
      const overlay = super.renderElement('div', 'overlay');
      const messageText = super.renderElement('div', 'win-message', {
        textContent: `Car id#${id} ${name} is win with time ${time}s`,
      });
      document.body.append(overlay);
      overlay.append(popUpWrapper);
      popUpWrapper.append(messageText);
      const showPopup = setInterval(() => {
        if (document.querySelector('.overlay')) {
          document.body.removeChild(overlay);
        } else clearInterval(showPopup);
      }, 3000);
    } catch {
      console.log('trysing to delete popup🌚');
    }
  }

  private disableButtons(): void {
    const startRaceBtn = document.querySelector('.start-race-btn') as HTMLButtonElement;
    const startEngineBtns = [...document.querySelectorAll('.start-btn')] as HTMLButtonElement[];
    startEngineBtns.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = true;
      btn.classList.add('disabled');
    });
    if (startRaceBtn) startRaceBtn.disabled = true;
    startRaceBtn.classList.add('disabled');
  }

  private activeteButtons(): void {
    const startRaceBtn = document.querySelector('.start-race-btn') as HTMLButtonElement;
    const startEngineBtns = [...document.querySelectorAll('.start-btn')] as HTMLButtonElement[];
    startEngineBtns.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = false;
      btn.classList.remove('disabled');
    });
    if (startRaceBtn) startRaceBtn.disabled = false;
    startRaceBtn.classList.remove('disabled');
  }

  private disableOneButton(btn: HTMLButtonElement): void {
    // eslint-disable-next-line no-param-reassign
    btn.disabled = true;
    btn.classList.add('disabled');
    const stopBtn = btn.nextElementSibling as HTMLButtonElement;
    stopBtn.disabled = false;
    stopBtn.classList.remove('disabled');
    const startRaceBtn = document.querySelector('.start-race-btn') as HTMLButtonElement;
    startRaceBtn.classList.add('disabled');
  }
}
