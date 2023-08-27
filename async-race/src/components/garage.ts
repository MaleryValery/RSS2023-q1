import { Car } from './utils/types';
import { RouteElement } from './routes/route';
import { CarsApiService } from './api/apiCarService';
import { createCarName, selectCarName } from './utils/carsBrand';
import { setCarColor } from './utils/setColor';
import { Cars } from './cars';

export class Garage extends RouteElement {
  public url = 'garage';

  private cars = new Cars(this.emitter);

  private createBtn!: HTMLElement;

  private updateBtn!: HTMLButtonElement;

  private startBtn!: HTMLElement;

  private stopBtn!: HTMLElement;

  private generateBtn!: HTMLElement;

  private createNameInput!: HTMLSelectElement;

  private updateNameInput!: HTMLInputElement;

  private createColorPicker!: HTMLInputElement;

  private updateColorPicker!: HTMLInputElement;

  private selectedCar!: Car;

  public async appendElement(parent: HTMLElement): Promise<void> {
    super.render(parent);
    this.wrapper.append(this.renderControllersWrapper());
    this.cars.appendElement(this.wrapper);

    this.generateModels();

    this.subscribeGarage();
    this.bindGarage();
  }

  private renderControllersWrapper(): HTMLElement {
    const controllersWrapper = super.renderElement('div', 'controllers-wrapper');
    controllersWrapper.append(
      this.renderCreateContainer(),
      this.renderUpdateContainer(),
      this.renderControllerContainer(),
    );
    return controllersWrapper;
  }

  private renderCreateContainer(): HTMLElement {
    const createContainer = super.renderElement('div', 'create-container garage-input-container');
    this.createBtn = super.renderElement('button', 'create-btn btn', { textContent: 'create' });
    this.createColorPicker = super.renderElement('input', 'create-picker picker', {
      type: 'color',
    }) as HTMLInputElement;
    this.createNameInput = super.renderElement('select', 'create-input input') as HTMLSelectElement;
    createContainer.append(this.createNameInput, this.createColorPicker, this.createBtn);
    return createContainer;
  }

  private renderUpdateContainer(): HTMLElement {
    const updateContainer = super.renderElement('div', 'update-container garage-input-container');
    this.updateBtn = super.renderElement('button', 'update-btn btn', { textContent: 'update' }) as HTMLButtonElement;
    this.updateNameInput = super.renderElement('input', 'update-input input') as HTMLInputElement;
    this.updateColorPicker = super.renderElement('input', 'uodate-picker picker', {
      type: 'color',
    }) as HTMLInputElement;
    this.updateNameInput.disabled = true;
    this.updateColorPicker.disabled = true;
    this.updateBtn.disabled = true;
    updateContainer.append(this.updateNameInput, this.updateColorPicker, this.updateBtn);
    return updateContainer;
  }

  private renderControllerContainer(): HTMLElement {
    const controllersContainer = super.renderElement('div', 'controller-container garage-input-container');
    this.startBtn = super.renderElement('button', 'start-race-btn btn', { textContent: 'start' });
    this.stopBtn = super.renderElement('button', 'stop-btn btn', { textContent: 'stop' });
    this.generateBtn = super.renderElement('button', 'update-btn btn', { textContent: 'generate cars' });
    controllersContainer.append(this.startBtn, this.stopBtn, this.generateBtn);

    return controllersContainer;
  }

  private bindGarage(): void {
    this.updateBtn.addEventListener('click', this.getUpdatedCar.bind(this));
    this.createBtn.addEventListener('click', this.onCreateCar.bind(this));
    this.generateBtn.addEventListener('click', this.onGenerateCars.bind(this));
    this.startBtn.addEventListener('click', this.startRace.bind(this));
    this.stopBtn.addEventListener('click', this.stopRace.bind(this));
  }

  private subscribeGarage(): void {
    this.emitter.subscribe('onSelectedCar', (car: Car) => this.updateCar(car));
    this.emitter.subscribe('clearInputs', () => this.resetCreateForm());
  }

  private updateCar(car: Car): void {
    if (car) {
      this.selectedCar = car;
      this.updateNameInput.value = car.name;
      this.updateColorPicker.value = car.color;
      this.disableUpdate(false);
    }
  }

  private disableUpdate(isDisabled: boolean): void {
    this.updateNameInput.disabled = isDisabled;
    this.updateColorPicker.disabled = isDisabled;
    this.updateBtn.disabled = isDisabled;
  }

  private async getUpdatedCar(): Promise<void> {
    try {
      const { id } = this.selectedCar;
      const newCar = {
        name: this.updateNameInput.value,
        color: this.updateColorPicker.value,
      };

      const updatedCar = await CarsApiService.updateCar(id, newCar);

      if (updatedCar.id) this.emitter.onEmit('onUpdateCar', updatedCar);
      this.emitter.onEmit('onUpdateWinner', updatedCar);

      this.resetUpdateForm();
      this.disableUpdate(true);
    } catch {
      console.log('car is not exist');
    }
  }

  private async onCreateCar(): Promise<void> {
    const name = this.createNameInput.value ? this.createNameInput.value : '';
    const color = this.createColorPicker.value;
    const newCar = {
      name,
      color,
    };
    const createdCar: Car = await CarsApiService.createCar(newCar);

    this.emitter.onEmit('onCreatedCar', createdCar);
    this.resetCreateForm();
  }

  private async onGenerateCars(): Promise<void> {
    try {
      await Promise.all(
        Array.from({ length: 100 }, () => {
          const name = createCarName();
          const color = setCarColor();
          const newCar = {
            name,
            color,
          };
          return CarsApiService.createCar(newCar);
        }),
      );
      const createdCars = await CarsApiService.getAllCars();
      this.emitter.onEmit('onCreatedCar', createdCars);
    } catch {
      console.log('🫠 cannot generate cars');
    }
  }

  private resetCreateForm(): void {
    this.createNameInput.value = '';
    this.createColorPicker.value = '#000000';
  }

  private resetUpdateForm(): void {
    this.updateNameInput.value = '';
    this.updateColorPicker.value = '#000000';
  }

  private generateModels(): void {
    const carNames = selectCarName();
    carNames.forEach((name) => {
      const value = document.createElement('option');
      value.setAttribute('value', name);
      value.textContent = name;
      this.createNameInput.append(value);
    });
  }

  private startRace(): void {
    this.emitter.onEmit('onStartRace');
  }

  private stopRace(): void {
    this.emitter.onEmit('onStopRace');
  }
}
