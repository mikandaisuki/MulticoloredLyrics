import { Empty } from './Empty';
import { SpiralScan } from './SpiralScan';
import { sizelistTo2Darray_N, sizelistTo2Darray_E, sizelistTo2Darray_W, sizelistTo2Darray_S } from './drawGrid';

export class Grid {
  constructor(p, canvasW, canvasH) {
    this.p = p;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.w = this.canvasW / 100;
    this.h = this.canvasH / 100;
    this.centerPos = [ Math.floor(this.w / 2), Math.floor(this.h / 2)];
    this.grid = new Array(this.h);
    for(let y = 0; y < this.h; y++) {
      this.grid[y] = new Array(this.w).fill(0);
    }
    this.empty = new Array();
    this.setInitFill();
    this.spiralScan = new SpiralScan(this.centerPos[0], this.centerPos[1]);
  }

  setInitFill() {
    this.grid[this.centerPos[1]][this.centerPos[0]] = 1;
    this.deleteZero();
    this.setEmpty();
  }

  setFilled(x, y) {
    this.grid[y][x] = 1;
  }

  setEmpty() {
    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {
        if(this.grid[y][x] == 1) {
          let tmp = 0;
          //上方向の空白マス
          tmp = y - 1;
          while(0 <= tmp) {
            if(this.grid[tmp][x] == 1) {
              break;
            } else if(y - tmp == 1) {
              this.grid[tmp][x] = 3;
            } else if(this.grid[tmp][x] == 3) {
              this.grid[tmp][x] = 3;
            } else {
              this.grid[tmp][x] = 2;
            }
            tmp--;
          }

          tmp = y + 1;
          //下方向の空白マス
          while(tmp < this.h) {
            if(this.grid[tmp][x] == 1) {
              break;
            } else if(tmp - y == 1) {
              this.grid[tmp][x] = 3;
            } else if(this.grid[tmp][x] == 3) {
              this.grid[tmp][x] = 3;
            } else {
              this.grid[tmp][x] = 2;
            }
            tmp++;
          }

          tmp = x - 1;
          //左方向の空白マス
          while (0 <= tmp) {
            if(this.grid[y][tmp] == 1) {
              break;
            } else if(x - tmp == 1) {
              this.grid[y][tmp] = 3;
            } else if(this.grid[y][tmp] == 3) {
              this.grid[y][tmp] = 3;
            } else {
              this.grid[y][tmp] = 2;
            }
            tmp--;
          }

          tmp = x + 1;
          //右方向の空白マス
          while (tmp < this.w) {
            if(this.grid[y][tmp] == 1) {
              break;
            } else if(tmp - x == 1) {
              this.grid[y][tmp] = 3;
            } else if(this.grid[y][tmp] == 3) {
              this.grid[y][tmp] = 3;
            } else {
              this.grid[y][tmp] = 2;
            }
            tmp++;
          }

        }
      }
    }
  }

  printGrid() {
    let t = "";
    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {
        t += "|" + this.grid[y][x];
      }
      t += "\n";
    }
    console.log(t);
  }

  displayPoint() {
    const p = this.p;
    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {
        if (this.grid[y][x] != 1 && this.grid[y][x] != 0) {
          if(this.grid[y][x] == 2) {
            p.noStroke();
            p.fill(p.color(0, 0, 255));
            p.ellipse(this.getCoord(x), this.getCoord(y), 10, 10);
          } else if(this.grid[y][x] == 3) {
            p.noStroke();
            p.fill(p.color(255, 0, 0));
            p.ellipse(this.getCoord(x), this.getCoord(y), 10, 10);
          }
        }
      }
    }
  }

  searchGrid() {
    this.empty.splice(0);
    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {
        if(this.grid[y][x] == 3) {
          const e = new Empty(y, x);

          let tmp = 0;
          let s = "";

          s = "col";
          //上方向
          tmp = y - 1;
          while(0 <= tmp) {
            if(this.grid[tmp][x] == 1) {
              break;
            } else if(this.grid[tmp][x] == 2) {
              e.setPos(tmp, x, s, false);
            } else if(this.grid[tmp][x] == 3) {
              e.setPos(tmp, x, s, true);
            }
            tmp--;
          }
          //下方向
          tmp = y + 1;
          while(tmp < this.h) {
            if(this.grid[tmp][x] == 1) {
              break;
            } else if(this.grid[tmp][x] == 2) {
              e.setPos(tmp, x, s, false);
            } else if(this.grid[tmp][x] == 3) {
              e.setPos(tmp, x, s, true);
            }
            tmp++;
          }

          s = "row";
          //左方向
          tmp = x - 1;
          while (0 <= tmp) {
            if(this.grid[y][tmp] == 1) {
              break;
            } else if(this.grid[y][tmp] == 2) {
              e.setPos(y, tmp, s, false);
            } else if(this.grid[y][tmp] == 3) {
              e.setPos(y, tmp, s, true);
            }
            tmp--;
          }
          //右方向の空白
          tmp = x + 1;
          while (tmp < this.w) {
            if(this.grid[y][tmp] == 1) {
              break;
            } else if(this.grid[y][tmp] == 2) {
              e.setPos(y, tmp, s, false);
            } else if(this.grid[y][tmp] == 3) {
              e.setPos(y, tmp, s, true);
            }
            tmp++;
          }

          this.empty.push(e);
        }
      }
    }
  }

  deleteZero() {
    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {
        if(this.grid[y][x] == 0) this.grid[y][x] = 2;
      }
    }
  }

  getEmptyPoses(textleng, which) {
    let withinPos = new Array();
    for(let e of this.empty) {
      if(which === 'row') {
        if(e.withinRowleng(textleng)) withinPos.push(e);
      } else if(which === 'col') {
        if(e.withinColleng(textleng)) withinPos.push(e);
      }
    }
    const index = Math.floor(Math.random() * withinPos.length);
    const res = withinPos[index];
    return res;
  }

  getCoord(num) {
    return (num * 100) + 50;
  }

  printEmpty() {
    console.log("this is print empty : row");
    for(const l of this.empty) {
      console.log(l.row_poses);
    }
    console.log("this is print empty : col");
    for(const l of this.empty) {
      console.log(l.col_poses);
    }
  }

  getAllAngleArray(sizelist) {
    const hash = {};
    hash['N'] = sizelistTo2Darray_N(sizelist);
    hash['E'] = sizelistTo2Darray_E(sizelist);
    hash['W'] = sizelistTo2Darray_W(sizelist);
    hash['S'] = sizelistTo2Darray_S(sizelist);
    return hash;
  }

  SearchGridBySizeable(text, sizelist) {
    const allAngleArray = this.getAllAngleArray(sizelist);
    let reservedPos = new Array();
    let outerReserve = new Array();
    let n = (this.w) * (this.h) -1;
    for(let i = 0; i < n; i++) {
      this.spiralScan.scanGrid();
      const y = this.spiralScan.y;
      const x = this.spiralScan.x;
      if(y < 0 || y >= this.h ||x < 0 || x >= this.w) continue;
      if(this.grid[y][x] == 3) {
        const used = new Array();
        let rotationList = ['N', 'E', 'W', 'S'];
        let num = 0;
        while(num < Object.keys(allAngleArray).length) {
          if(!used.length) rotationList = rotationList.filter(i => used.indexOf(i) == -1);
          const index = Math.floor(Math.random() * rotationList.length);
          const targetArr = allAngleArray[rotationList[index]];
          for(let ty = 0; ty < targetArr.length; ty++) {
            for(let tx = 0; tx < targetArr[ty].length; tx++) {
              if(targetArr[ty][tx] == 5) {
                let tmpY = y;
                let ok = 0;
                let arr;
                let isLoop = true;
                if(ty > 0) {
                  tmpY = tmpY - ty;
                }
                let reservedPos = new Array();
                while(ok < targetArr.length) {
                  const startPos = x - tx;
                  const endPos = x + (targetArr[ty].length - tx );
                  if(tmpY < 0 || tmpY+ok >= this.h) break;
                  if(endPos > this.w) break;
                  arr = this.grid[ tmpY + ok ].slice(startPos, endPos);
                  if(arr.length == 0)  break;

                  for(let n = 0; n < arr.length; n++) {
                    const res = this.isEqual(arr[n], targetArr[ok][n]);
                    if(res == -1) {
                      continue;
                    } else if(res == 0) {
                      isLoop = false;
                      break;
                    } else if(res == 1) {
                      const t = [ tmpY + ok, startPos + n];
                      reservedPos.push(t);
                    }
                  }
                  if(!isLoop) break;
                  ok++;
                }
                if(ok == targetArr.length) {
                  if(reservedPos.length == 0) {
                    console.log("から！！！！");
                    console.log(ok);
                    console.log(arr);
                  }
                  const reserved = this.makeAarray(index, reservedPos, text, sizelist);
                  return reserved;
                }
              }
            }
          }
          used.push(index);
          num++;
        }
      }
    }
  }

  makeAarray(index, reservedPos, text, sizelist) {
    let dir = '';
    switch(index) {
      case 0:
        dir = 'N';
        break;
      case 1:
        dir = 'E';
        break;
      case 2:
        dir = 'W';
        break;
      case 3:
        dir = 'S';
        break;
    }
    const reserved = this.sortDataBy(dir, reservedPos, sizelist, text);
    return reserved;
  }

  sortDataBy(dir, array, sizelist, text) {
    if(dir === 'N') {
      array.sort(function(a, b) {
        return a[1] - b[1];
      });
    } else if(dir === 'S') {
      array.sort(function(a, b) {
        return b[1] - a[1];
      });
    } else if(dir === 'E') {
      array.sort(function(a, b) {
        return a[0] - b[0];
      });
    } else if(dir === 'W') {
      array.sort(function(a, b) {
        return b[0] - a[0];
      });
    }
    const sizedPos = new Array();
    let increment = 0;
    for(const size of sizelist) {
      const leng = increment + size * size;
      sizedPos.push(array.slice(increment, leng));
      increment = leng;
    }
    const res = new Array();
    for(let i = 0; i < sizelist.length; i++) {
      res.push({text: text.split('')[i], dir: dir, size: sizelist[i], pos: sizedPos[i]});
    }
    return res;
  }

  isEqual(num1, num2) {
    if(num2 == 0) return -1;
    if(num1 == 3 || num1 == 2) num1 = 5;
    if(num1 == num2) return 1;
    return 0;
  }

  isEqualArray(array1, array2) {
    let i = array1.length;
    if(i != array2.length) return false;
    while(i--) {
      const a1 = array1[i];
      if(array2[i] == 0) continue;
      if(a1 == 3 || a1 == 2) array1[i] = 5;
      if(array1[i] !== array2[i]) return false;
    }
    return true;
  }

  getActiveGridSize(position, wordBlocks) {
    const activeGrid = new Array(this.h);
    for(let y = 0; y < this.h; y++) {
      activeGrid[y] = new Array(this.w).fill(0);
    }

    const getGridSize = grid => {
      const xleng = { minX: grid[0].length, maxX: 0 };
      const yleng = { minY: grid.length, maxY: 0 };
      for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
          if(grid[y][x] == 1) {
            if(x < xleng['minX']) xleng['minX'] = x;
            if(x > xleng['maxX']) xleng['maxX'] = x;
            if(y < yleng['minY']) yleng['minY'] = y;
            if(y > yleng['maxY']) yleng['maxY'] = y;
          }
        }
      }
      let sizeX = 0;
      let sizeY = 0;
      if(Math.abs(this.centerPos[0] - xleng['minX']) < Math.abs(this.centerPos[0] - xleng['maxX'])) {
        sizeX = Math.abs(this.centerPos[0] - xleng['maxX']) * 2;
      } else {
        sizeX = Math.abs(this.centerPos[0] - xleng['minX']) * 2;
      }
      if(Math.abs(this.centerPos[1] - yleng['minY']) < Math.abs(this.centerPos[1] - yleng['maxY'])) {
        sizeY = Math.abs(this.centerPos[1] - yleng['maxY']) * 2;
      } else {
        sizeY = Math.abs(this.centerPos[1] - yleng['minY']) * 2;
      }
      const result = { sizeX: sizeX + 2, sizeY: sizeY + 2, xleng: xleng, yleng: yleng, };
      return result;
    };

    for(const w of wordBlocks) {
      if(w.startTime < position) {
        for(const pos of w._posInGrid) {
          activeGrid[pos[0]][pos[1]] = 1;
        }
      }
    }
    return getGridSize(activeGrid);
  }

  printActiveGrid(grid) {
    let t = "";
    for(let y = 0; y < grid.length; y++) {
      for(let x = 0; x < grid[0].length; x++) {
        t += "|" + grid[y][x];
      }
      t += "\n";
    }
    console.log(t);
  }
}
