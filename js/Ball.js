export class Ball {
  constructor(p, x, y) {
    this.p = p;
    this.posX = x;
    this.posY = y;
    this.size = p.random(400, 800);
    const h = p.random(100);
    const s = p.random(70, 100);
    const b = p.random(80, 100);
    this.col = p.color(h, s, b);
    this.col.setAlpha(p.random(p.random(100)));

    this.num = 5;
    this.posXarray = [];
    this.posYarray = [];
    this.sizeArray = [];
    for(let i = 0; i < this.num; i++) {
      this.posXarray.push(p.randomGaussian(this.posX, 300));
      this.posYarray.push(p.randomGaussian(this.posY, 300));
      //this.sizeArray.push(p.random(400, 800));
      this.sizeArray.push(p.random(100, 300));
    }
  }

  draw() {
    this.p.push();
    this.p.blendMode(this.p.LIGHTEST);
    this.p.noStroke();
    this.p.fill(this.col);
    this.p.circle(this.posX, this.posY, this.size);
    this.p.pop();
  }

  drawMulti() {
    for(let i = 0; i < this.num; i++) {
      this.p.push();
      this.p.blendMode(this.p.LIGHTEST);
      this.p.noStroke();
      this.p.fill(this.col);
      this.p.circle(this.posXarray[i], this.posYarray[i], this.sizeArray[i]);
      this.p.pop();
    }
  }

}
