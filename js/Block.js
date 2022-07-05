export class Block {
  constructor(p, charOb, x, y, col, char, parent) {
    this.p = p;
    this.charOb = charOb;
    this.blockSize = 100;
    this.x = x;
    this.posX = (this.x * this.blockSize) + (this.blockSize / 2);
    this.y = y;
    this.posY = (this.y * this.blockSize) + (this.blockSize / 2);
    this.col = col;
    this.char = char;
    this.parent = parent;
    //console.log("-----this is Block-----");
    this.startTime = charOb.startTime;
    this.endTime = charOb.endTime;
/*
    console.log(char);
    console.log("startTime : " + this.startTime);
    console.log("endTime : " + this.endTime);
    */
    this.isDisplayed = false;
  }

  display() {
    const p = this.p;
    p.push();
    p.translate(this.posX, this.posY);
    p.noStroke();
    p.fill(this.col);
    p.rect(0, 0, this.blockSize, this.blockSize);
    p.pop();
  }

  displayText() {
    const p = this.p;
    p.textSize(100);
    p.push();
    p.translate(this.posX, this.posY);
    p.noStroke();
    p.fill(this.col);
    p.text(this.char, 0, 0);
    p.pop();
    this.isDisplayed = true;
  }

  displayTextRotate(bottom) {
    const p = this.p;
    let rad;
    switch(bottom) {
      case 'B':
        rad = 0;
        break;
      case 'T':
        rad = p.radians(180);
        break;
      case 'L':
        rad = p.radians(90);
        break;
      case 'R':
        rad = p.radians(-90);
        break;
    }
    p.textSize(100);
    p.push();
    p.translate(this.posX, this.posY);
    p.rotate(rad);
    p.noStroke();
    p.fill(this.col);
    p.text(this.char, 0, 0);
    p.pop();
  }

  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
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
}
