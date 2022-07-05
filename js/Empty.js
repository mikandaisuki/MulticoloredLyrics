export class Empty {
  constructor(y, x) {
    this.initPos = new Array(2);
    this.initPos[0] = x;
    this.initPos[1] = y;
    this.row_poses = new Array();
    this.row_poses.push(this.initPos);
    this.col_poses = new Array();
    this.col_poses.push(this.initPos);
    this.key_row_poses = new Array();
    this.key_row_poses.push(this.initPos);
    this.key_col_poses = new Array();
    this.key_col_poses.push(this.initPos);

    this.rowleng = 0;
    this.colleng = 0;
  }

  setPos(y, x, s, isKey) {
    const pos = new Array(2);
    pos[0] = x;
    pos[1] = y;
    if(s === 'row') {
      if(isKey) this.key_row_poses.push(pos);
      this.row_poses.push(pos);
    } else if(s === 'col') {
      if(isKey) this.key_col_poses.push(pos);
      this.col_poses.push(pos);
    }
  }

  sortDataBy(which) {
    if(which === 'row') {
      this.row_poses.sort(function(a, b) {
        return a[0] - b[0];
      });
    } else if(which === 'col') {
      this.col_poses.sort(function(a, b) {
        return a[1] - b[1];
      });
    }
  }

  withinRowleng(num) {
    if(num <= this.row_poses.length) return true;
    else return false;
  }
  withinColleng(num) {
    if(num <= this.col_poses.length) return true;
    else return false;
  }

  get rowPoses() {
    return this.row_poses;
  }
  get colPoses() {
    return this.col_poses;
  }
  get keyRowPoses() {
    return this.key_row_poses;
  }
  get keyColPoses() {
    return this.key_col_poses;
  }
}
