import { Block } from './Block';
import { Empty } from './Empty';
import { Grid } from './Grid';
import { SizingBlock } from './SizingBlock';
import { globalBlockSize } from './index.js';


export class WordBlock {
  constructor(p, g, wordObArray, text, col) {
    this.p = p;
    this.g = g;
    this.wordObArray = wordObArray;
    this.text = text;
    this.charArray = this.text.split('');
    this.sizelist = this.makeSizeList();
    this.aArray = this.g.SearchGridBySizeable(text, this.sizelist);
    const dirA = this.aArray[0];
    this.dir = dirA['dir'];
    this.col = p.color(Math.floor(Math.random() * 100), 100, 70);
    this.blocks = new Array(text.length);
    this.displayChildrenCount = 0;
    this.isDisplayAll = false;
    const l = this.wordObArray[0].children;
    this.charObArray = new Array();
    this.startTime = null;
    this.endTime = null;
    for(const w of this.wordObArray) {
      for(const x of w.children) {
        this.charObArray.push(x);
        if(x.startTime < this.startTime || !this.startTime) this.startTime = x.startTime;
        if(x.endTime > this.endTime || !this.endTime) this.endTime = x.endTime;
      }
    }
    this.posX;
    this.posY;
    this.calcPos();
    this.posInGrid;
    this.makePosInGrid();
    this.makeBlock();
  }

  makeBlock() {
    let i = 0;
    for(const a of this.aArray) {
      this.blocks[i] = new SizingBlock(this.p, this.charObArray[i], a['size'], a['dir'], a['pos'], this.col, this);
      for(const p of a['pos']) this.g.setFilled(p[1], p[0]);
      i++;
    }
    this.g.setEmpty();
  }

  selectPos() {
    const poses = this.which === 'col' ? this.empty.colPoses : this.empty.rowPoses;
    const keyPoses = this.which === 'col' ? this.empty.keyColPoses : this.empty.keyRowPoses;
    let index = Math.floor(Math.random() * keyPoses.length);
    const keyPos = keyPoses[index];
    let keyindex = 0;
    let i = 0;
    for(const pos of poses) {
      if(keyPos[0] == pos[0] && keyPos[1] == pos[1]) {
        keyindex = i;
        break;
      }
      i++;
    }
    let reservedPos = new Array();
    reservedPos.push(keyPos);
    index = keyindex;
    let previndex = index - 1;
    let nextindex = index + 1;
    let seq = true;
    while(reservedPos.length < this.text.length) {
      seq = Math.random() < 0.5;
      if(nextindex >= poses.length) seq = false;
      if(previndex < 0) seq = true;
      if(seq) {
        reservedPos.push(poses[nextindex]);
        nextindex += 1;
      } else {
        reservedPos.push(poses[previndex]);
        previndex -= 1;
      }
    }
    return this.sort(reservedPos);
  }

  sort(array) {
    if(this.which === 'row') {
      if(this.bottom === 'B') {
        array.sort(function(a, b) {
          return a[0] - b[0];
        });
      } else if(this.bottom === 'T') {
        array.sort(function(a, b) {
          return b[0] - a[0];
        });
      }

    } else if(this.which === 'col') {
      if(this.bottom === 'L') {
        array.sort(function(a, b) {
          return a[1] - b[1];
        });
      } else if(this.bottom === 'R') {
        array.sort(function(a, b) {
          return b[1] - a[1];
        });
      }
    }
    return array;
  }

  display() {
    for(let b of this.blocks) {
      b.displayTextRotate(this.bottom);
    }
  }

  get getText() {
    return this.text;
  }

  inrementDisplayChildrenCount() {
    this.displayChildrenCount++;
    if(this.displayChildrenCount == this.blocks.length) {
      this.isDisplayAll = true;
    }
  }

  makeSizeList() {
    const sizelist = new Array();
    //漢字判定の正規表現
    const regexp = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
    for(const char of this.charArray) {
      if(regexp.test(char)) sizelist.push(2)
      else sizelist.push(1);
    }
    return sizelist;
  }

  calcPos() {
    const xarray = new Array();
    const yarray = new Array();
    for(const a of this.aArray) {
      for(const pos of a['pos']) {
        xarray.push(pos[1]);
        yarray.push(pos[0]);
      }
    }
    const originX = Math.min(...xarray);
    const originY = Math.min(...yarray);

    let yleng = 0;
    let xleng = 0;
    if(this.dir === 'N' || this.dir === 'S') {
      yleng = Math.max(...this.sizelist);
      xleng = this.sizelist.reduce((sum, num) => sum + num, 0);
    } else {
      yleng = this.sizelist.reduce((sum, num) => sum + num, 0);
      xleng = Math.max(...this.sizelist);
    }

    this.posX = (originX * globalBlockSize) + ((xleng * globalBlockSize) / 2);
    this.posY = (originY * globalBlockSize) + ((yleng * globalBlockSize) / 2);
  }

  makePosInGrid() {
    const posInGrid = new Array();
    for(const a of this.aArray) {
      for(const pos of a['pos']) {
        posInGrid.push(pos);
      }
    }
    this.posInGrid = posInGrid;
  }

  enableColor(col) {
    for(let b of this.blocks) {
      b._col = col;
    }
  }

  changeColor(position, col) {
    for(let b of this.blocks) {
      b._isChangingCol = true;
      b._newCol = col;
      b._startChangeTime = position;
    }
  }

  get _isVisible() {
    for(let b of this.blocks) {
      if(b._isVisible) return true;
    }
    return false;
  }
  get _posInGrid() {
    return this.posInGrid;
  }
  get _isDisplayAll() {
    return this.isDisplayAll;
  }
  get _blocks() {
    return this.blocks;
  }
  get _posX() {
    return this.posX;
  }
  get _posY() {
    return this.posY;
  }
  get _startTime() {
    return this.startTime;
  }
  get _endTime() {
    return this.endTime;
  }
  get _dir() {
    return this.dir;
  }
}
