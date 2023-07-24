const setColor = (): string => {
  const color = Math.floor(Math.random() * 255).toString(16);
  return color.length === 2 ? color : color.padStart(2, '0');
};

export const setCarColor = (): string => `#${setColor()}${setColor()}${setColor()}`;
