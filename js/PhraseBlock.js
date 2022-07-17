import { WordBlock } from './WordBlock';

export class PhraseBlock {
  constructor(p, g, phrase){
    this.p = p;
    this.g = g;
    this.phrase = phrase;

    this.wordObArray = new Array();
    this.textArr = new Array();
    this.setArrByPartOfSpeech(phrase);

    if(this.phrase.text.includes('、') || this.phrase.text.includes(',') || this.phrase.text.includes('。') || this.phrase.text.includes('？') || this.phrase.text.includes('！') || this.phrase.text.includes('!')) this.setArrByPunct();

    if(this.phrase.text.includes('(') || this.phrase.text.includes('「') || this.phrase.text.includes('『')) this.setArrByText();

    if(this.textArr.length != this.wordObArray.length) console.log("要素数違うお！");
    this.phraseleng = this.textArr.length;

    this.wordBlocks = new Array(this.phraseleng);
    this.col = p.color(Math.floor(Math.random() * 100), 60, 70);

    this.displayChildrenCount = 0;
    this.isDisplayAll = false;
    this.makeWordBlock();
  }

  makeWordBlock() {
    for(let i = 0; i < this.phraseleng; i++) {
      this.wordBlocks[i] = new WordBlock(this.p, this.g, this.wordObArray[i], this.textArr[i], this.col);
    }
  }

  display() {
    for(const w of this.wordBlocks) {
      w.display();
    }
  }

  //指定された品詞をまとめる
  setArrByPartOfSpeech(phrase) {
    const words = phrase.children;
    const textArray = new Array();
    const wordObArray = new Array();
    let i = 0;
    let test = "";
    let isA = false;
    let tempAtext = "";
    let tempAob;
    for(const word of words) {
      test += word.text;
      test += word.pos+" | ";
      //console.log(test);
      let text = word.text;
      const w = new Array();
      if(isA) {
        text = tempAtext + word.text;
        w.push(tempAob);
        tempAtext = "";
        tempAob = null;
        isA = false;
      }
      w.push(word); //wordオブジェクトを配列にする
      //助詞(P),助動詞(M)のとき前の要素に追加
      if( (wordObArray[i-1] && word.pos === 'P') || (wordObArray[i-1] && word.pos === 'M') || text === '...') {
        textArray[i-1] += text;
        wordObArray[i-1].push(word);
      //連体詞(A)のとき後ろの要素に追加
      } else if(word.pos === 'A') {
        isA = true;
        tempAtext = word.text;
        tempAob = word;
      } else {
        textArray.push(text);
        wordObArray.push(w);
        i++;
      }
    }
    this.wordObArray = wordObArray;
    this.textArr = textArray;
  }

  setArrByPunct() {
    let textA = this.textArr;
    let obA = this.wordObArray;
    let tmpText = "";
    let tmpOb = new Array();

    for(let i = 0; i < textA.length; i++) {
      if(textA[i].includes('、') || textA[i].includes(',') || textA[i].includes('。') || textA[i].includes('？') || textA[i].includes('！') || textA[i].includes('!')) {
        const tmpText = textA[i];
        const tmpOb = obA[i];
        textA.splice(i, 1);
        obA.splice(i, 1);
        textA[i - 1] = textA[i - 1] + tmpText;
        for(const o of tmpOb) {
          obA[i - 1].push(o);
        }
      }
    }

    this.textArr = textA;
    this.wordObArray = obA;
  }

  setArrByText() {
    let textA = this.textArr;
    let obA = this.wordObArray;

    let startIndex = 0;
    let endIndex = 0;
    let tmpText = "";
    let tmpOb = new Array();
    let isStart = false;

    let newA;
    let no;
    for(let i = 0; i < textA.length; i++) {
      if(textA[i].includes('(') || textA[i].includes('「') || textA[i].includes('『')) {
        isStart = true;
        startIndex = i;
        endIndex = i;
      }
      if(isStart) {
        tmpText += textA[i];
        for(const ob of obA[i]) {
          tmpOb.push(ob);
        }
        if(textA[i].includes(')') || textA[i].includes('」') || textA[i].includes('』')) {
          textA.splice(startIndex, endIndex);
          obA.splice(startIndex, endIndex);
          textA.push(tmpText);
          obA.push(tmpOb);
          isStart = false;
          startIndex = 0;
          endIndex = 0;
          tmpText = "";
          tmpOb = new Array();
        } else {
          endIndex++;
        }
      }
      //console.log(" i : "+i+" | isStart : "+isStart+" | startIndex : "+startIndex+" | endIndex : "+endIndex+ " | tmpText : "+tmpText);
    }
    this.textArr = textA;
    this.wordObArray = obA;
  }

  get _wordBlocks() {
    return this.wordBlocks;
  }
  get _isDisplayAll() {
    return this.isDisplayAll;
  }
}
