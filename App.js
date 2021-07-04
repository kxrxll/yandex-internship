class BooleanCells {
  constructor(m, n, element) {
    this.width = m;
    this.height = n;
    this.element = element;
    this.start();
  }
  start() {
    const numberOfCells = this.width * this.height;
    let cellsObject = {};
    for (let i = 1; i < numberOfCells; i++) {
      if (Math.random() > 0.5) {
        cellsObject[i] = 1;
      }
    }
    this.render(cellsObject);
    this.calculate(cellsObject);
  }
  calculate(cellsObject) {
    //if alive has < 2 alive close = 0
    //if alive has 2 or 3 alive close = 1
    //if alive has > 3 alive close = 0
    //if dead has > 3 alive close = 1
    for (let cell in cellsObject) {
      cell = parseInt(cell);
      let closeCellsObject = {
        closeAlive: 0,
        closeDead: 0,
      };
      if (cellsObject[cell + 1]) {
        if (cellsObject[cell + 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell + 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell - 1]) {
        if (cellsObject[cell - 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell - 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell + this.height]) {
        if (cellsObject[cell + this.height] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell + this.height] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell - this.height]) {
        if (cellsObject[cell - this.height] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell - this.height] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell + this.height + 1]) {
        if (cellsObject[cell + this.height + 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell + this.height + 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell + this.height - 1]) {
        if (cellsObject[cell + this.height - 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell + this.height - 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell - this.height + 1]) {
        if (cellsObject[cell - this.height + 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell - this.height + 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      if (cellsObject[cell - this.height - 1]) {
        if (cellsObject[cell - this.height - 1] == 1) {
          closeCellsObject.closeAlive += 1;
        } else if (cellsObject[cell - this.height - 1] == 0) {
          closeCellsObject.closeDead += 1;
        }
      }
      console.log(closeCellsObject);
      if (cellsObject[cell] == 1) {
        if (
          closeCellsObject.closeAlive < 2 ||
          closeCellsObject.closeAlive > 3
        ) {
          cellsObject[cell] = 0;
        }
      } else if (cellsObject[cell] == 0) {
        if (closeCellsObject.closeAlive > 3) {
          cellsObject[cell] = 1;
        }
      }
    }
  }

  render(cellsObject) {
    console.log(cellsObject);
    let fieldElements = Array.from(this.element.querySelectorAll(".tile"));
    for (let cell in cellsObject) {
      if (cellsObject[cell] === 1) {
        fieldElements[cell - 1].classList.remove("tile-dead");
        fieldElements[cell - 1].classList.add("tile-alive");
      } else if (cellsObject[cell] === 0) {
        fieldElements[cell - 1].classList.remove("tile-alive");
        fieldElements[cell - 1].classList.add("tile-dead");
      }
    }
  }
}

const booleanCells = new BooleanCells(4, 4, document.querySelector(".main"));
