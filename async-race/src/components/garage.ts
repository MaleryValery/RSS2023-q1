import { Car } from './utils/types';
import { RouteElement } from './routes/route';
import { CarsApiService } from './api/apiCarService';
import { createCarName, selectCarName } from './utils/carsBrand';
import { setCarColor } from './utils/setColor';

export class Garage extends RouteElement {
  public url = 'garage';

  private createBtn!: HTMLElement;

  private updateBtn!: HTMLButtonElement;

  private startBtn!: HTMLElement;

  private stopBtn!: HTMLElement;

  private generateBtn!: HTMLElement;

  private createInput!: HTMLSelectElement;

  private updateInput!: HTMLInputElement;

  private createPicker!: HTMLInputElement;

  private updatePicker!: HTMLInputElement;

  private currentUpdateCar!: Car;

  public async appendElement(parent: HTMLElement): Promise<void> {
    super.render(parent);
    this.createBtn = super.renderElement('button', 'create-btn btn', { textContent: 'create' });
    this.updateBtn = super.renderElement('button', 'update-btn btn', { textContent: 'update' }) as HTMLButtonElement;
    this.createInput = super.renderElement('select', 'create-input input') as HTMLSelectElement;
    this.generateModels();
    this.updateInput = super.renderElement('input', 'update-input input') as HTMLInputElement;
    this.createPicker = super.renderElement('input', 'create-picker picker', { type: 'color' }) as HTMLInputElement;
    this.updatePicker = super.renderElement('input', 'uodate-picker picker', { type: 'color' }) as HTMLInputElement;
    this.startBtn = super.renderElement('button', 'start-race-btn btn', { textContent: 'start' });
    this.stopBtn = super.renderElement('button', 'stop-btn btn', { textContent: 'stop' });
    this.generateBtn = super.renderElement('button', 'update-btn btn', { textContent: 'generate cars' });
    const controllersWrapper = super.renderElement('div', 'controllers-wrapper');
    const createContainer = super.renderElement('div', 'create-container garage-input-container');
    const updateContainer = super.renderElement('div', 'update-container garage-input-container');
    this.updateInput.disabled = true;
    this.updatePicker.disabled = true;
    this.updateBtn.disabled = true;
    const controllersContainer = super.renderElement('div', 'controller-container garage-input-container');
    this.wrapper.append(controllersWrapper);
    controllersWrapper.append(createContainer, updateContainer, controllersContainer);
    createContainer.append(this.createInput, this.createPicker, this.createBtn);
    updateContainer.append(this.updateInput, this.updatePicker, this.updateBtn);
    controllersContainer.append(this.startBtn, this.stopBtn, this.generateBtn);
    this.onUpdateNameCar();
    this.updateBtn.addEventListener('click', this.getUpdatedCar.bind(this));
    this.createBtn.addEventListener('click', this.onCreateCar.bind(this));
    this.generateBtn.addEventListener('click', this.onGenerateCars.bind(this));
    this.startBtn.addEventListener('click', this.startRace.bind(this));
    this.stopBtn.addEventListener('click', this.stopRace.bind(this));
    this.emitter.subscribe('clearInputs', () => this.clearInputs());
  }

  private onUpdateNameCar(): void {
    this.emitter.subscribe('onSelectedCar', (car: Car) => this.updateCar(car));
  }

  private updateCar(someCar: Car): void {
    if (someCar) {
      this.currentUpdateCar = someCar;
      console.log('some', someCar);
      this.updateInput.value = someCar.name;
      this.updatePicker.value = someCar.color;
      this.disabledUpdate(false);
    }
  }

  private disabledUpdate(isDisable: boolean): void {
    this.updateInput.disabled = isDisable;
    this.updatePicker.disabled = isDisable;
    this.updateBtn.disabled = isDisable;
  }

  private async getUpdatedCar(): Promise<void> {
    try {
      const { id } = this.currentUpdateCar;
      const newCar = {
        name: this.updateInput.value,
        color: this.updatePicker.value,
      };

      const updatedCar = await CarsApiService.updateCar(id, newCar, { 'Content-Type': 'application/json' });
      if (updatedCar.id) this.emitter.onEmit('onUpdateCar', updatedCar);
      this.emitter.onEmit('onUpdateWinner', updatedCar);

      this.updateInput.value = '';
      this.updatePicker.value = '#000000';
      this.disabledUpdate(true);
    } catch {
      console.log('car is not exist');
    }
  }

  private async onCreateCar(): Promise<void> {
    const name = this.createInput.value ? this.createInput.value : createCarName();
    const color = this.createPicker.value;
    const newCar = {
      name,
      color,
    };
    const createdCar: Car = await CarsApiService.createCar(newCar, { 'Content-Type': 'application/json' });

    this.emitter.onEmit('onCreatedCar', createdCar);
    this.createInput.value = '';
    this.createPicker.value = '#000000';
  }

  private async onGenerateCars(): Promise<void> {
    try {
      const lengthBefore = (await CarsApiService.getAllCars()).length - 1;
      const arr = new Array(100).fill('0').map(async () => {
        const name = createCarName();
        const color = setCarColor();
        const newCar = {
          name,
          color,
        };
        await CarsApiService.createCar(newCar, { 'Content-Type': 'application/json' });
        return newCar;
      });
      console.log(arr, lengthBefore);
      const createdCar = await CarsApiService.getAllCars();
      this.emitter.onEmit('onCreatedCar', createdCar.slice(lengthBefore + 1));
    } catch {
      console.log('🫠 cannot generate cars');
    }
  }

  private clearInputs(): void {
    this.createInput.value = '';
    this.createPicker.value = '#000000';
    this.updateInput.value = '';
    this.updatePicker.value = '#000000';
  }

  private generateModels(): void {
    const carNames = selectCarName();
    carNames.unshift('');
    carNames.forEach((name) => {
      const value = document.createElement('option');
      value.setAttribute('value', name);
      value.textContent = name;
      this.createInput.append(value);
    });
  }

  private startRace(): void {
    this.emitter.onEmit('onStartRace');
  }

  private stopRace(): void {
    this.emitter.onEmit('onStopRace');
  }
}
