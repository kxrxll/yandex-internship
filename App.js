class BooleanCells {
  constructor(m, n, element, jsonStartingState) {
    if (m < 2 || n < 2) {
      alert("Not a proper field, sorry!");
    } else if (jsonStartingState) {
      jsonStartingState = JSON.parse(jsonStartingState);
      this.width = jsonStartingState.size.width;
      this.height = jsonStartingState.size.height;
      this.element = element;
      this.render();
      this.start(jsonStartingState.cells);
    } else {
      this.width = m;
      this.height = n;
      this.element = element;
      this.render();
      this.start();
    }
  }

  start(obj) {
    if (!obj) {
      const numberOfCells = this.width * this.height;
      let cellsObject = {};
      for (let i = 1; i < numberOfCells; i++) {
        if (Math.random() > 0.5) {
          cellsObject[i] = 1;
        }
      }
      this.render(cellsObject);
      this.calculate(cellsObject);
    } else {
      this.render(obj);
      this.calculate(obj);
    }
  }

  calculate(cellsObject) {
    for (let cell in cellsObject) {
      cell = parseInt(cell);
      let closeCellsObject = {
        closeAlive: 0,
        closeDead: 0,
      };
      const nextCell = cellsObject[cell + 1];
      const previousCell = cellsObject[cell - 1];
      const nextColumnCell = cellsObject[cell + this.height];
      const previousColumnCell = cellsObject[cell - this.height];
      const rightBottomCell = cellsObject[cell + this.height + 1];
      const rightUpCell = cellsObject[cell + this.height - 1];
      const leftBottomCell = cellsObject[cell - this.height + 1];
      const leftUpCell = cellsObject[cell - this.height - 1];

      if (typeof nextCell != "undefined" && cell % this.height != 0) {
        if (nextCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (nextCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof previousCell != "undefined" && (cell - 1) % this.height != 0) {
        if (previousCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (previousCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof nextColumnCell != "undefined") {
        if (nextColumnCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (nextColumnCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof previousColumnCell != "undefined") {
        if (previousColumnCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (previousColumnCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof rightBottomCell != "undefined" && cell % this.height != 0) {
        if (rightBottomCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (rightBottomCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof rightUpCell != "undefined" && (cell - 1) % this.height != 0) {
        if (rightUpCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (rightUpCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof leftBottomCell != "undefined" && cell % this.height != 0) {
        if (leftBottomCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (leftBottomCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (typeof leftUpCell != "undefined" && (cell - 1) % this.height != 0) {
        if (leftUpCell == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (leftUpCell == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell] == 1) {
        if (
          closeCellsObject.closeAlive < 2 ||
          closeCellsObject.closeAlive > 3
        ) {
          cellsObject[cell] = 0;
        }
      } else if (cellsObject[cell] == "0") {
        if (closeCellsObject.closeAlive >= 3) {
          cellsObject[cell] = 1;
        }
      }
    }
    let actualState = {};
    actualState.cells = cellsObject;
    actualState.size.width = this.width;
    actualState.size.height = this.height;
    setTimeout(() => this.render(cellsObject), 500);
    setTimeout(() => this.calculate(cellsObject), 1000);
  }

  render(cellsObject) {
    if (!cellsObject) {
      let stringToInsert = "";
      for (let i = 0; i < this.width; i++) {
        stringToInsert += `<div class="column">`;
        for (let k = 0; k < this.height; k++) {
          stringToInsert += `<div class="tile"></div>`;
        }
        stringToInsert += `</div>`;
      }
      this.element.insertAdjacentHTML("afterbegin", stringToInsert);
    }
    let fieldElements = Array.from(this.element.querySelectorAll(".tile"));
    for (let cell in cellsObject) {
      cell = parseInt(cell);
      if (cellsObject[cell] == 1) {
        fieldElements[cell - 1].classList.remove("tile-dead");
        fieldElements[cell - 1].classList.add("tile-alive");
      } else if (cellsObject[cell] == 0) {
        fieldElements[cell - 1].classList.remove("tile-alive");
        fieldElements[cell - 1].classList.add("tile-dead");
      }
    }
  }
}

const booleanCells = new BooleanCells(10, 10, document.querySelector(".main"));
