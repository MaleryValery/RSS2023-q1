export const brand = [
  'Audi',
  'Beta Julieta',
  'BMW',
  'Citroen',
  'Infiniti',
  'Jeep',
  'Kia',
  'Lexus',
  'Nissan',
  'Opel',
  'Volvo',
];

export const models = [
  'A4',
  'X2',
  'CEED',
  'CERATO',
  'RIO',
  'GENESIS',
  'GETZ',
  'GRANDEUR',
  'MATRIX',
  'XCENT',
  'Alfa Romeo',
];

export const createCarName = (): string => {
  const randomModel = Math.floor(Math.random() * models.length);
  const randomBrand = Math.floor(Math.random() * brand.length);
  return `${brand[randomBrand]} ${models[randomModel]} `;
};

export const selectCarName = (): string[] =>
  Array(6)
    .fill('')
    .map(
      () => `${brand[Math.floor(Math.random() * brand.length)]} ${models[Math.floor(Math.random() * models.length)]}`,
    );

console.log();
