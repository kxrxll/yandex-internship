import BooleanCells from '../app';

test('constructor test', () => {
  const lifeGame = new BooleanCells(3, 3, document.createElement('div'));
  expect(lifeGame.width).toBe(3);
});

test('small field error test', () => {
  expect(() => {
    const lifeGame = new BooleanCells(1, 3, document.createElement('div'));
    lifeGame();
  }).toThrow();
});

test('interval test', () => {
  const lifeGame = new BooleanCells(3, 3, document.createElement('div'));
  expect(lifeGame.interval).toHaveBeenLastCalledWith(() => {
    lifeGame.cellsMap = lifeGame.recalculateMap(lifeGame.cellsMap, lifeGame.height);
  }, 1000);
});
