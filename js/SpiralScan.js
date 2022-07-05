export class SpiralScan {
  constructor(startX, startY) {
    this.length = 1;
    this.now = 1;
    this.d = 1;
    this.isFirst = true;
    this.direct = ['N', 'E', 'S', 'W'];
    //this.n = (this.w) * (this.h) -1;
    this.x = startX;
    this.y = startY;
  }

  scanGrid() {
    const d0 = this.direct[this.d % 4];
    if(d0 == 'N') {
      this.y--;
    } else if(d0 == 'S') {
      this.y++;
    } else if(d0 == 'E') {
      this.x++;
    } else if(d0 == 'W') {
      this.x--;
    }
    this.length--;

    if(!this.isFirst && this.length == 0) {
      this.isFirst = true;
      this.now++;
      this.length = this.now;
      this.d++;
    } else if(this.length == 0) {
      this.length = this.now;
      this.isFirst = false;
      this.d++;
    }
  }
  
  get _x() {
    return this.x;
  }
  get _y() {
    return this.y;
  }
}
