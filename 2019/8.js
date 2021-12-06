import fs from 'fs';

const part1Input = fs.readFileSync('./8-input.txt', 'utf8');

const width = 25;
const height = 6;

const layerSize = width * height;

const inputArray = part1Input.split('');

const layers = [];

const sliceAndDice = [...inputArray];

while (sliceAndDice.length >= layerSize) {
  layers.push(sliceAndDice.splice(0, layerSize).join(''));
}

console.log(layers);

const countNumberInLayer = (layer, string) => {
  const digits = layer.split('');

  return digits.reduce((acc, digit) => (acc += digit === string ? 1 : 0), 0);
};

console.log(countNumberInLayer('123234345', '2'));

layers.map(l => {
  console.log(
    l,
    countNumberInLayer(l, '0'),
    countNumberInLayer(l, '1'),
    countNumberInLayer(l, '2')
  );
});

const bestLayer = layers.reduce((bestLayer, layer) => {
  const layerCount = countNumberInLayer(layer, '0');

  if (!bestLayer || layerCount < countNumberInLayer(bestLayer, '0')) {
    bestLayer = layer;
  }

  return bestLayer;
}, undefined);

console.log(countNumberInLayer(bestLayer, '1') * countNumberInLayer(bestLayer, '2'));

let image = [
  '222222222222222222222222'.split(''),
  '222222222222222222222222'.split(''),
  '222222222222222222222222'.split(''),
  '222222222222222222222222'.split(''),
  '222222222222222222222222'.split(''),
  '222222222222222222222222'.split('')
];

layers.map(l => {
  const layer = l.split('');
  const rows = [];

  while (layer.length >= width) {
    rows.push(layer.splice(0, width).join(''));
  }

  console.log(rows);
  rows.map((row, y) => {
    const digits = row.split('');
    digits.map((pixel, x) => {
      console.log(pixel, x, y);
      if (image[y][x] === '2') {
        image[y][x] = pixel;
      }
    });
  });
});

image.map(row => {
  console.log(row.join('').replace(/0/g, ' '));
});
