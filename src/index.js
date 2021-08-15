import './css/styles.css';
import BooleanCells from './js/app';
import csvToGameData from './js/parser';

// eslint-disable-next-line no-unused-vars
let booleanCells = new BooleanCells(8, 8, document.querySelector('.main'));

const inputElement = document.querySelector('input');

inputElement.addEventListener('change', (e) => {
  e.preventDefault();
  const input = inputElement.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    const text = evt.target.result;
    const [cellsMap, width, height] = csvToGameData(text);
    document.querySelector('.main').innerHTML = '';
    booleanCells = new BooleanCells(width, height, document.querySelector('.main'), cellsMap);
  };
  reader.readAsText(input);
});
