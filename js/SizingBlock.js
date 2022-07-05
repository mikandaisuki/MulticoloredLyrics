import { chorus } from './index.js';
import { canvasW, canvasH } from './index.js';
import { globalBlockSize, time_fadein, time_fadeout } from './index.js';
const { Ease } = TextAliveApp;


export class SizingBlock {
  constructor(p, charOb, size, dir, posArray, col, parent) {
    this.p = p;
    this.charOb = charOb;

    this.blockSize = size * globalBlockSize;
    this.char = charOb.text;
    this.posArray = posArray;
    this.posX = 0;
    this.posY = 0;
    this.calcPos();

    this.alpha = 0;
    this.col = col;

    //this.col = this.p.color(255, 0, 0, this.alpha);

    this.dir = dir;
    this.parent = parent;

    this.startTime = charOb.startTime;
    this.endTime = charOb.endTime;
    this.isDisplayed = false;
    this.displayTime = this.endTime - this.startTime;
    //console.log(this.char + ' | '+ this.startTime);
    //console.log(this.posArray);
    this.isChorus;
    this.getIsChorus();

    //this.chorusX = 0;
    //this.chorusY = 0;
    this.chorusX = Math.floor(Math.random() * 50);
    this.chorusY = Math.floor(Math.random() * 50);
    //console.log(this.char + " | " + this.isChorus);
    //this.chorusCol = this.p.color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));

    if(!isFinite(this.posX) || !isFinite(this.posY)) {
      console.log("ブロック ["+this.char+"] は異常値です。");
      console.log("ブロック情報 | 文字 : "+this.char+ " posX : "+this.posX+" posY : "+this.posY);
      console.log(this.posArray);
    }

    //this.distRad;
    this.angle;
    switch(this.dir) {
      case 'N':
        this.angle = 0;
        break;
      case 'S':
        this.angle = 180;
        break;
      case 'E':
        this.angle = 90;
        break;
      case 'W':
        this.angle = 270;
        break;
    }
    this.distRad = p.radians(this.angle);
    this.preAngle = this.angle - 90;
    this.rad = 0;
    this.isSetChorusPos = false;
    this.posX_chorus = 0;
    this.posY_chorus = 0;
    this.size_chorus = 0;
    this.alpha_chorus = 0;
    this.col_chorus = p.color(100, 0, 100);
    this.col_chorusOut = p.color(Math.floor(Math.random() * 100), 100, 100);
  }

  update_fadein(position) {
    const p = this.p;
    const progress = 1 - (this.startTime - position) / time_fadein;
    const eased = Ease.quintIn(progress);
    this.alpha = 100 * eased;
    this.col = p.color(255, 0, 0, this.alpha);
    let r = 90 * eased;
    r = p.constrain(r, 0, 90);
    const a = this.preAngle + r;
    this.rad = p.radians(a);
    //console.log(this.char + " / " + progress + ' : ' + eased + ' : ' + this.alpha);
    //console.log(this.char + " / " + progress + ' : ' + this.preAngle + ' : ' + r);

    if(progress > 1) this.isDisplayed = true;
  }

  update_fadeout(position) {

  }

  displayText() {
    const p = this.p;
    p.textSize(this.blockSize);
    p.push();
    p.translate(this.posX, this.posY);
    p.rotate(this.rad);
    p.noStroke();
    p.fill(p.color(255, 0, 255, this.alpha));
    p.text(this.char, 0, 0);
    p.pop();
    //this.isDisplayed = true;
  }

  calcPos() {
    if(this.posArray.length == 1) {
      const pos = this.posArray[0];
      this.posX = (pos[1] * globalBlockSize) + (this.blockSize / 2);
      this.posY = (pos[0] * globalBlockSize) + (this.blockSize / 2);
    } else {
      let x = new Array();
      let y = new Array();
      for(const a of this.posArray) {
        x.push(a[1]);
        y.push(a[0]);
      }
      const minX = Math.min(...x);
      const minY = Math.min(...y);
      this.posX = (minX * globalBlockSize) + (this.blockSize / 2);
      this.posY = (minY * globalBlockSize) + (this.blockSize / 2);
    }
  }

  getIsChorus() {
    for(const c of chorus) {
      if(c.startTime <= this.startTime &&  this.startTime <= c.endTime) {
        this.isChorus = true;
        return;
      }
    }
    this.isChorus = false;
  }

  updateChorus_fadeIn(position) {
    const p = this.p;
    const progress = 1 - (this.startTime - position) / 500;
    const eased = Ease.quintIn(progress);
    //this.size_chorus = 1200 * eased;
    const al = 100 * eased;
    this.col_chorus.setAlpha(100 * eased);
    //console.log(this.col_chorus);
    //if(progress > 1) this.col_chorus = this.col_chorusOut;
  }

  displayChorusText() {
    const p = this.p;
    p.push();
    p.textSize(this.size_chorus);
    p.blendMode(p.EXCLUSION);
    p.translate(this.posX_chorus, this.posY_chorus);
    p.noStroke();
    p.fill(this.col_chorus);
    p.text(this.char, 0, 0);

    //p.blendMode(p.HARD_LIGHT);
    /*
    p.fill(p.color(20, 80, 100, 80));
    p.text(this.char, this.chorusX, 20);
    p.fill(p.color(50, 80, 100, 80));
    p.text(this.char, -20, -this.chorusY);
    */

    p.pop();
    //this.isDisplayed = true;
  }

  updateChorus_fadeOut(position) {
    const p = this.p;
    const progress = 1 - (position - this.endTime) / 500;
    const eased = Ease.quintIn(progress);
    //this.size_chorus = 1200 * eased;
    const al = 100 - 100 * eased;
    //this.col_chorus = this.col_chorusOut;
    this.col_chorus.setAlpha(al);
    console.log(al);

  }

  setChorusPos(sizeX, sizeY) {
    this.size_chorus = 1200;
    const minX = (canvasW / 2) - ((sizeX * globalBlockSize) / 2) + (this.size_chorus / 2);
    const maxX = (canvasW / 2) + ((sizeX * globalBlockSize) / 2) - (this.size_chorus / 2);
    const minY = (canvasH / 2) - ((sizeY * globalBlockSize) / 2) + (this.size_chorus / 2);
    const maxY = (canvasH / 2) + ((sizeY * globalBlockSize) / 2) - (this.size_chorus / 2);
    console.log('sizeX : '+sizeX+' sizeY : '+sizeY+' / minX : '+minX+' maxX : '+maxX);
    this.posX_chorus = Math.floor(Math.random() * (maxX - minX) + minX);
    this.posY_chorus = Math.floor(Math.random() * (maxY - minY) + minY);
    //console.log(this.posX_chorus + ' / '+this.posY_chorus);
    this.isSetChorusPos = true;
  }

  get _text() {
    return this.char;
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
  get _isDisplayed() {
    return this.isDisplayed;
  }
  get _isSetChorusPos() {
    return this.isSetChorusPos;
  }
  get _posX_chorus() {
    return this.posX_chorus;
  }
  get _posY_chorus() {
    return this.posY_chorus;
  }

}
