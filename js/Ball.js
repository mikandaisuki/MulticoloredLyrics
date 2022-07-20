const { Ease } = TextAliveApp;

export class Ball {
  constructor(p, x, y) {
    this.p = p;
    this.posX = x;
    this.posY = y;
    this.size = p.random(400, 800);
    this.h = p.random(100);
    this.s = p.random(70, 100);
    this.b = p.random(80, 100);
    this.a = p.random(p.random(100));
    //this.col = p.color(this.h, this.s, this.b);
    //this.col.setAlpha(p.random(p.random(100)));

    this.num = 3;
    this.posXarray = [];
    this.posYarray = [];
    this.sizeArray = [];
    for(let i = 0; i < this.num; i++) {
      this.posXarray.push(p.randomGaussian(this.posX, 400));
      this.posYarray.push(p.randomGaussian(this.posY, 400));
      this.sizeArray.push(p.random(100, 300));
    }
  }

  update(beatProgress) {
    const alpha = this.b + (100 - this.b) * Ease.quintIn(beatProgress);
    this.col = this.p.color(this.h, this.s, alpha);
  }

  draw() {
    this.p.push();
    this.p.blendMode(this.p.LIGHTEST);
    this.p.noStroke();
    this.p.fill(this.col);
    this.p.circle(this.posX, this.posY, this.size);
    this.p.pop();
  }

  drawMulti(progress = 0) {
    for(let i = 0; i < this.num; i++) {
      this.p.push();
      this.p.blendMode(this.p.LIGHTEST);
      this.p.noStroke();
      this.p.fill(this.h, this.s, this.b, this.a + 10 * progress);
      this.p.circle(this.posXarray[i], this.posYarray[i], this.sizeArray[i] + 10 * progress);
      //this.p.circle(this.posXarray[i], this.posYarray[i], this.sizeArray[i]);

      this.p.pop();
    }
  }

}
