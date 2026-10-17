// scripts/mergeCatalog.cjs
const fs = require('fs');
const path = require('path');

const b1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch1.json'), 'utf8'));
const b2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch2.json'), 'utf8'));
const b3 = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch3.json'), 'utf8'));

const allDishes = [...b1, ...b2, ...b3];
console.log('Total dishes merged:', allDishes.length);

// Verify dish IDs
const ids = new Set();
allDishes.forEach((d, i) => {
  if (ids.has(d.id)) {
    console.error('Duplicate ID:', d.id);
  }
  ids.add(d.id);
});

// Construct TypeScript file
const header = `import { Dish } from '../types';

export const AUTHENTIC_TURKISH_DISHES: Dish[] = `;

const tsContent = header + JSON.stringify(allDishes, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, '../src/data/dishesData.ts'), tsContent, 'utf8');
console.log('src/data/dishesData.ts created successfully!');
