export const drawGrid = (p, width, height) => {
  const col = height / 100;
  const row = width / 100;
  const size = 100;
  p.strokeWeight(1);
  p.stroke(255);
  p.noFill();
  for (let i = 0; i <  row; i++) {
    p.line(i * size, 0, i * size, col * size);
  }

  for (let i = 0; i < col; i++) {
    p.line(0, i * size, row * size, i * size);
  }
};

//テキストサイズの配列から二次元配列へ
//row bottom
export const sizelistTo2Darray_N = sizelist => {
  const yleng = Math.max(...sizelist);
  const xleng = sizelist.reduce((sum, num) => sum + num, 0);
  const res = new Array(yleng);
  for(let y = 0; y < yleng; y++) {
    res[y] = new Array();
  }

  for(let y = 0; y < yleng; y++) {
    for(let i = 0; i < sizelist.length; i++) {
      const insertNum = 0;
      if((res.length - y) <= sizelist[i]) insertNum = 5;
      let count = 0;
      while(count < sizelist[i]) {
        res[y].push(insertNum);
        count++;
      }
    }
  }
  return res;
};

//col left
export const sizelistTo2Darray_E = sizelist => {
  const yleng = sizelist.reduce((sum, num) => sum + num, 0);
  const xleng = Math.max(...sizelist);

  const res = new Array(yleng);
  for(let y = 0; y < yleng; y++) {
    res[y] = new Array();
  }

  let col = 0;
  for(let i = 0; i < sizelist.length; i++) {
    const num = sizelist[i];
    for(let j = 0; j < num; j++) {
      let count = 0;
      while(count < xleng) {
        let insertNum = 0;
        if(count < num) insertNum = 5;
        res[col].push(insertNum);
        count++;
      }
      col++
    }
  }
  return res;
};

//col right
export const sizelistTo2Darray_W = sizelist => {
  const arr = sizelistTo2Darray_E(sizelist);
  //const arr = sizelist_E;
  for(let i of arr) {
    i.reverse();
  }
  arr.reverse();
  return arr;
};

//row top
export const sizelistTo2Darray_S = sizelist => {
  const arr = sizelistTo2Darray_N(sizelist);
  //const arr = sizelist_N;
  for(let i of arr) {
    i.reverse();
  }
  arr.reverse();
  return arr;
};
