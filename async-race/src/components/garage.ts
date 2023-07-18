import { Car } from './utils/types';
import { View } from './view';

export class Garage extends View {
  public createBtn!: HTMLElement;

  public updateBtn!: HTMLElement;

  public createInput!: HTMLElement;

  public updateInput!: HTMLElement;

  public createPicker!: HTMLElement;

  public updatePicker!: HTMLElement;

  public carsNumbers!: HTMLElement;

  public pageNumbers!: HTMLElement;

  public prevBtn!: HTMLElement;

  public nextBtn!: HTMLElement;

  public carsWrapper!: HTMLElement;

  public dataCars!: Car[];

  constructor() {
    super();
    this.appendCars('http://127.0.0.1:3000/garage');
  }

  public appendElement(parent: HTMLElement): void {
    this.createBtn = super.renderElement('button', 'create-btn btn', { textContent: 'create' });
    this.updateBtn = super.renderElement('button', 'update-btn btn', { textContent: 'update' });
    this.createInput = super.renderElement('input', 'create-input input');
    this.updateInput = super.renderElement('input', 'uodate-input input');
    this.createPicker = super.renderElement('input', 'create-picker picker', { type: 'color' });
    this.updatePicker = super.renderElement('input', 'uodate-picker picker', { type: 'color' });
    const createContainer = super.renderElement('div', 'create-container garage-input-container');
    const updateContainer = super.renderElement('div', 'update-container garage-input-container');
    this.carsWrapper = super.renderElement('div', 'cars-list-wrapper');
    this.carsNumbers = super.renderElement('h3', 'title', { textContent: 'Garage (here number)' });
    this.pageNumbers = super.renderElement('h4', 'subtitle-page', { textContent: 'Pages(here number)' });
    this.nextBtn = super.renderElement('button', 'next-btn btn', { textContent: 'next' });
    this.prevBtn = super.renderElement('button', 'prev-btn btn', { textContent: 'prev' });
    const garageWrapper = super.renderElement('div', 'garage-wrapper');
    parent.append(garageWrapper);
    garageWrapper.append(createContainer, updateContainer, this.carsWrapper);
    this.carsWrapper.append(this.carsNumbers, this.pageNumbers, this.nextBtn, this.prevBtn);
    createContainer.append(this.createInput, this.createPicker, this.createBtn);
    updateContainer.append(this.updateInput, this.updatePicker, this.updateBtn);
  }

  public async appendCars(url: string): Promise<void> {
    const response = await fetch(url);
    this.dataCars = await response.json();
    this.renderCar(this.dataCars);
  }

  public renderCar(cars: Car[]): void {
    cars.forEach((car) => {
      const raceContainer = super.renderElement('div', 'race-container');
      const carContainer = super.renderElement('div', 'car-container');
      const carBoxRow1 = super.renderElement('div', 'row1');
      const carBoxRow2 = super.renderElement('div', 'row2');
      const engineBtn = super.renderElement('div', 'engine-btn-box');
      const selectCar = super.renderElement('button', 'select-btn btn', { textContent: 'select' });
      const removeCar = super.renderElement('button', 'remove-btn btn', { textContent: 'remove' });
      const startCar = super.renderElement('button', 'start-btn engine-btn', { textContent: 'A' });
      const stopCar = super.renderElement('button', 'stop-btn engine-btn', { textContent: 'B' });
      const carName = super.renderElement('h5', 'car-name', { textContent: car.name });
      const carImgBox = super.renderElement('div', 'car-img-box');
      const svgCar = `<svg fill="${car.color}" width="800px" height="800px" viewBox="0 -83.92 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="enable-background:new 0 0 122.88 35.03" xml:space="preserve" >

      <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
      
      <g>
      
      <path class="st0" d="M99.42,13.57c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73 C88.69,18.37,93.49,13.57,99.42,13.57L99.42,13.57z M79.05,5c-0.59,1.27-1.06,2.69-1.42,4.23c-0.82,2.57,0.39,3.11,3.19,2.06 c2.06-1.23,4.12-2.47,6.18-3.7c1.05-0.74,1.55-1.47,1.38-2.19c-0.34-1.42-3.08-2.16-5.33-2.6C80.19,2.23,80.39,2.11,79.05,5 L79.05,5z M23.86,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99c-2.75,0-4.99-2.23-4.99-4.99 C18.87,21.54,21.1,19.31,23.86,19.31L23.86,19.31z M99.42,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99 c-2.75,0-4.99-2.23-4.99-4.99C94.43,21.54,96.66,19.31,99.42,19.31L99.42,19.31z M46.14,12.5c2.77-2.97,5.97-4.9,9.67-6.76 c8.1-4.08,13.06-3.58,21.66-3.58l-2.89,7.5c-1.21,1.6-2.58,2.73-4.66,2.84H46.14L46.14,12.5z M23.86,13.57 c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73C13.13,18.37,17.93,13.57,23.86,13.57 L23.86,13.57z M40.82,10.3c3.52-2.19,7.35-4.15,11.59-5.82c12.91-5.09,22.78-6,36.32-1.9c4.08,1.55,8.16,3.1,12.24,4.06 c4.03,0.96,21.48,1.88,21.91,4.81l-4.31,5.15c1.57,1.36,2.85,3.03,3.32,5.64c-0.13,1.61-0.57,2.96-1.33,4.04 c-1.29,1.85-5.07,3.76-7.11,2.67c-0.65-0.35-1.02-1.05-1.01-2.24c0.06-23.9-28.79-21.18-26.62,2.82H35.48 C44.8,5.49,5.04,5.4,12.1,28.7C9.62,31.38,3.77,27.34,0,18.75c1.03-1.02,2.16-1.99,3.42-2.89c-0.06-0.05,0.06,0.19-0.15-0.17 c-0.21-0.36,0.51-1.87,1.99-2.74C13.02,8.4,31.73,8.52,40.82,10.3L40.82,10.3z"/>
      
      </g>
      </svg>
      `;
      carImgBox.innerHTML = svgCar;
      const flag = super.renderElement('div', 'flag');
      raceContainer.append(carContainer, flag);
      carContainer.append(carBoxRow1, carBoxRow2);
      carBoxRow1.append(selectCar, removeCar, carName);
      carBoxRow2.append(engineBtn, carImgBox);
      engineBtn.append(startCar, stopCar);
      this.carsWrapper.append(raceContainer);
    });
  }
}
