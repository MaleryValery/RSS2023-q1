/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { View } from './view';
import { Car, CreateWinner, Engine, IPathPagination } from './utils/types';
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

const limit: IPathPagination = {
  key: '_limit',
  value: 7,
};
export class Cars extends View {
  private dataCars!: Car[];

  private carsWrapper!: HTMLElement;

  private carRendered!: Car[];

  private carImgBox!: HTMLElement;

  private carName!: HTMLElement;

  private pageNumbers!: HTMLElement;

  private prevBtn!: HTMLButtonElement;

  private nextBtn!: HTMLButtonElement;

  private carsNumbers!: HTMLElement;

  private carListWrapper!: HTMLElement;

  private garageSubtitle!: HTMLElement;

  private flagImg!: HTMLElement;

  private qtyCars!: number;

  private currentPage: number = localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1;

  private pageSubtitle!: HTMLElement;

  private startCar!: HTMLButtonElement;

  private stopCar!: HTMLButtonElement;

  private winnerTime!: number;

  // private dataCars!: Car[];

  constructor(protected emitter: EventEmitter) {
    super(emitter);
    this.getCars(this.currentPage);
    this.onSub();
    this.getCarsQty();
  }

  public async getCarsQty(): Promise<void> {
    const totalCars = await CarsApiService.getAllCars();
    this.qtyCars = totalCars.length;
    this.carsNumbers.textContent = String(this.qtyCars);
  }

  public async getCars(pageGarage: number = startPage): Promise<void> {
    this.dataCars = await CarsApiService.getPagination(pageGarage, limit);
    if (this.dataCars.length === 0) {
      this.currentPage -= 1;
      this.dataCars = await CarsApiService.getPagination(this.currentPage, limit);
    }
    this.pageNumbers.textContent = String(this.currentPage);
    this.renderCar(this.dataCars);
  }

  public appendElement(parent: HTMLElement): void {
    this.carListWrapper = super.renderElement('div', 'cars-list-wrapper');
    this.carsWrapper = super.renderElement('div', 'cars-pagination');
    this.garageSubtitle = super.renderElement('h3', 'title', { textContent: `Garage #` });
    this.carsNumbers = super.renderElement('span', 'title');
    this.pageSubtitle = super.renderElement('h4', 'subtitle-page', { textContent: 'Pages #' });
    this.pageNumbers = super.renderElement('span', 'subtitle-page');
    const pageContainer = super.renderElement('div', 'page-wrapper');
    this.prevBtn = super.renderElement('button', 'prev-btn btn', { textContent: 'prev' }) as HTMLButtonElement;
    this.nextBtn = super.renderElement('button', 'next-btn btn', { textContent: 'next' }) as HTMLButtonElement;
    this.carsWrapper.append(this.garageSubtitle, pageContainer);
    pageContainer.append(this.pageSubtitle, this.prevBtn, this.nextBtn);
    this.garageSubtitle.append(this.carsNumbers);
    this.pageSubtitle.append(this.pageNumbers);
    // this.carListWrapper.append(this.carsWrapper);
    parent.append(this.carsWrapper);
    parent.append(this.carListWrapper);
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));
  }

  public renderCar(cars: Car[]): void {
    cars.forEach((car) => {
      setTimeout(() => {
        const raceContainer = super.renderElement('div', 'race-container', { id: car.id });
        const carContainer = super.renderElement('div', 'car-container');
        const carBoxRow1 = super.renderElement('div', 'row1');
        const carBoxRow2 = super.renderElement('div', 'row2');
        const engineBtn = super.renderElement('div', 'engine-btn-box');
        const selectCar = super.renderElement('button', 'select-btn btn', { textContent: 'select' });
        const removeCar = super.renderElement('button', 'remove-btn btn', { textContent: 'remove' });
        this.startCar = super.renderElement('button', 'start-btn engine-btn', {
          textContent: 'A',
        }) as HTMLButtonElement;
        this.stopCar = super.renderElement('button', 'stop-btn engine-btn', { textContent: 'B' }) as HTMLButtonElement;
        this.carName = super.renderElement('h5', 'car-name', { textContent: car.name });
        this.carImgBox = super.renderElement('div', 'car-img-box');

        this.carImgBox.innerHTML = svgCar;
        this.carImgBox.style.fill = car.color;
        this.flagImg = super.renderElement('div', 'flag');
        raceContainer.append(carContainer, this.flagImg);
        carContainer.append(carBoxRow1, carBoxRow2);
        carBoxRow1.append(selectCar, removeCar, this.carName);
        carBoxRow2.append(engineBtn, this.carImgBox);
        engineBtn.append(this.startCar, this.stopCar);
        this.carListWrapper.append(raceContainer);
        selectCar.addEventListener('click', this.onSelectCar.bind(this));
        removeCar.addEventListener('click', this.onRemoveCar.bind(this));
        this.startCar.addEventListener('click', this.startOneEngin.bind(this));
        this.stopCar.addEventListener('click', this.stopOneEngin.bind(this));
      }, 10);
    });
  }

  private onSelectCar(event: Event): void {
    const id = this.getIdCar(event);
    console.log('selected car', id);
    console.log('selected car', this.dataCars);
    if (id) {
      this.emitter.onEmit(
        'onSelectedCar',
        this.dataCars.find((car) => car.id === id),
      );
    }
  }

  private onSub(): void {
    this.emitter.subscribe('onUpdateCar', (car: Car) => this.onUpdateCar(car));
    this.emitter.subscribe('onCreatedCar', (car: Car) => this.onCreatedCar(car));
    this.emitter.subscribe('onStartRace', () => {
      this.startRace();
      console.log('race started');
    });
    this.emitter.subscribe('onStopRace', () => {
      this.stopRace();
      console.log('race started');
    });
  }

  private async onRemoveCar(event: Event): Promise<void> {
    const id = this.getIdCar(event);
    if (id) {
      await CarsApiService.deleteCar(id);
      this.getCarsQty();
      this.carListWrapper.innerHTML = '';
      this.getCars(this.currentPage);
      this.emitter.onEmit('clearInputs');
      this.emitter.onEmit('onRemove');
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

  private async onCreatedCar(newcar: Car): Promise<void> {
    console.log('render newly car', newcar);
    this.dataCars = await CarsApiService.getPagination(0, limit);
    const currentQtyPage = this.carListWrapper.childNodes.length;
    if (currentQtyPage < limit.value) {
      if (!Array.isArray(newcar)) this.renderCar([newcar]);
      if (Array.isArray(newcar)) {
        const possibleToRender = limit.value - currentQtyPage;
        this.renderCar(newcar.slice(0, possibleToRender));
      }
      this.carsNumbers.textContent = String(this.qtyCars);
    }
    this.getCarsQty();
  }

  private async nextPage(): Promise<void> {
    const maxPage = this.qtyCars / limit.value;
    if (this.currentPage < maxPage) {
      this.nextBtn.disabled = false;
      this.prevBtn.disabled = false;
      this.currentPage += 1;
      localStorage.setItem('currentPage', String(this.currentPage));
      this.pageNumbers.textContent = String(this.currentPage);
      this.carListWrapper.innerHTML = '';
      this.getCars(this.currentPage);
    } else this.nextBtn.disabled = true;
  }

  private async prevPage(): Promise<void> {
    const minPage = 1;
    if (this.currentPage > minPage) {
      this.prevBtn.disabled = false;
      this.nextBtn.disabled = false;
      this.currentPage -= 1;
      localStorage.setItem('currentPage', String(this.currentPage));
      this.pageNumbers.textContent = String(this.currentPage);
      this.carListWrapper.innerHTML = '';
      this.getCars(this.currentPage);
    } else this.prevBtn.disabled = true;
  }

  private async startOneEngin(event?: Event, idCar?: number): Promise<Response> {
    let intervalAnim: string | number | NodeJS.Timer | undefined;
    const id = event ? this.getIdCar(event) : (idCar as number);
    const currentCar = await CarsApiService.getCar(id);
    const imgCar = document.getElementById(`${id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
    this.emitter.subscribe('onStopCar', () => clearInterval(intervalAnim));
    try {
      const changeToStart = await CarsApiService.onEnginCar(id, Engine.started);
      const currentWith = window.screen.width;
      const flagDist = window.screen.width - this.flagImg.offsetLeft + this.flagImg.offsetWidth;
      let leftDist = this.carImgBox.offsetLeft - this.carImgBox.offsetWidth + 5;
      const fullDis = currentWith - leftDist - flagDist;
      const partDis = (fullDis - leftDist) / (((changeToStart.velocity * 30) / 1000) * 60);
      intervalAnim = setInterval(() => {
        leftDist += partDis;
        if (leftDist >= fullDis) {
          if (!this.winnerTime) {
            this.winnerTime = +(fullDis / changeToStart.velocity).toFixed(2);
            this.addWinner(id, this.winnerTime, currentCar.color, currentCar.name);
            this.showWinMessage(id, currentCar.name, this.winnerTime);
          }
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
      console.error(`💩 ${error} 💩`);
      clearInterval(intervalAnim);
      throw new Error('Engine is broken');
    }
  }

  private async stopOneEngin(event?: Event, idCar?: number): Promise<void> {
    const id = event ? this.getIdCar(event) : (idCar as number);
    const changeToStop = await CarsApiService.onEnginCar(id, Engine.stopped);
    console.log(changeToStop);
    this.emitter.onEmit('onStopCar');
    const imgCar = document.getElementById(`${id}`)?.children[0].children[1].childNodes[1] as HTMLElement;
    if (imgCar.style.transform) imgCar.style.transform = 'translateX(0px)';
  }

  private getIdCar(event: Event): number {
    const curr = event.target as HTMLElement;
    const carCont = curr.closest('.race-container');
    const id = Number(carCont?.id);
    return id;
  }

  private async startRace(): Promise<void> {
    const winners: Response[] = [];
    const currentPageCars = await CarsApiService.getPagination(this.currentPage, limit);
    console.log(currentPageCars);

    currentPageCars.forEach(async (car) => {
      // this.startOneEngin(event, car.id);
      const raceCar = await this.startOneEngin(event, car.id);
      if (raceCar.status === 200) winners.push(raceCar);
    });
    console.log(winners);
    this.winnerTime = 0;
  }

  private async stopRace(): Promise<void> {
    const currentPageCars = await CarsApiService.getPagination(this.currentPage, limit);
    console.log(currentPageCars);

    currentPageCars.forEach((car) => this.stopOneEngin(event, car.id));
  }

  private async addWinner(id: number, time: number, colorCar: string, nameCar: string): Promise<void> {
    try {
      const checkWinner = await ApiWinnersService.getWin(id);
      console.log('checkWinner', checkWinner.id);
      if (checkWinner.carId === id) {
        console.log('winner update', id);
        checkWinner.wins += 1;
        checkWinner.time = checkWinner.time <= time ? checkWinner.time : time;
        const updateWin = {
          wins: checkWinner.wins,
          time: checkWinner.time,
        };
        await ApiWinnersService.updateWin(id, updateWin, { 'Content-Type': 'application/json' });
      } else {
        const winner: CreateWinner = {
          carId: id,
          time,
          wins: 1,
          color: colorCar,
          name: nameCar,
        };
        await ApiWinnersService.createWin(winner, { 'Content-Type': 'application/json' });
      }
      const allWinners = await ApiWinnersService.getAllWin();
      console.log('allWinners', allWinners);
    } catch {
      console.error('Winner is not found');
    }
  }

  private showWinMessage(id: number, name: string, time: number): void {
    const popUpWrapper = super.renderElement('div', 'popup-wrapper');
    const overlay = super.renderElement('div', 'overlay');
    const messageText = super.renderElement('div', 'win-message', {
      textContent: `Car id#${id} ${name} is win with time ${time}`,
    });
    document.body.append(overlay);
    overlay.append(popUpWrapper);
    popUpWrapper.append(messageText);
    const showPopup = setInterval(() => {
      if (document.querySelector('.overlay')) {
        document.body.removeChild(overlay);
      } else clearInterval(showPopup);
    }, 3000);
  }
  // private animation(img: HTMLElement, duration: number, distance: number): void {
  //   if (duration === 0) {
  //     clearInterval(this.intervalAnim);
  // eslint-disable-next-line no-param-reassign
  //   img.style.transform = `translateX(${0}px)`;
  //   return;
  // }
  // const currentWith = window.screen.width;
  // const flagDist = window.screen.width - this.flagImg.offsetLeft + this.flagImg.offsetWidth;

  // let leftDist = this.carImgBox.offsetLeft - this.carImgBox.offsetWidth;
  // const fullDis = currentWith - leftDist - flagDist;
  // const frames = ((duration * 100) / 1000) * 60;
  // const partDis = (distance - leftDist) / frames;

  // this.intervalAnim = setInterval(() => {
  //   leftDist += partDis;
  //   console.log(leftDist);
  //   if (leftDist >= distance) {
  //     clearInterval(this.intervalAnim);
  //   }
  // eslint-disable-next-line no-param-reassign
  //     img.style.transform = `translateX(${leftDist}px)`;
  //   }, 16);
  // }
}
