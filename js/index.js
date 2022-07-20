const P5 = p5;
import { Player, Ease } from "textalive-app-api";
import { Block } from './Block';
import { Grid } from './Grid';
import { drawGrid } from './drawGrid';
import { WordBlock } from './WordBlock';
import { PhraseBlock } from './PhraseBlock';
import { Ball } from './Ball';
import { SONG } from './SONG';

let init = false;
let isAppReady = false;
let isVideoReady = false;
let isTimerReady = false;
let text;
let startingText;
let videoEndTime;

let player = new Player({
  app: {token: "6rquYSfCRiWlgifb"},
  mediaElement: document.querySelector("#media"),
  valenceArousalEnabled: true,
  vocalAmplitudeEnabled: true,
});

player.addListener({
  onTimerReady,      // 動画のためのTimerの準備が整ったとき
  onVideoReady,      // 動画オブジェクトの準備が整ったとき
  onAppReady,        // TextAliveホストとの接続時に呼ばれる
});

function onTimerReady() {
  //console.log("タイマー準備寛容");
  isTimerReady = true;
  startingText.textContent = "START!";
}

function onAppReady(app){
  isAppReady = true;
}

let phrases = null;
let sabi = null;
let songInfo = null;
export let chorus = null;
function onVideoReady(v){
  videoEndTime = player.data.song.length　* 1000;
  phrases = player.video.phrases;
  songInfo = player.data.songMap.segments;
  for(const element of player.data.songMap.segments){
    if(element.chorus) {
      sabi = element;
      chorus = sabi.segments;
    }
  }
  isVideoReady = true;
}

export const canvasW = 4000;
export const canvasH = 4000;
const cameraSize = Math.min(window.innerWidth, window.innerHeight);
export const globalBlockSize = 100;
export const time_fadein = 100;
export const time_fadeout = 100;
let selectedSong;

const getPrelude = (phrases, thTime = 3000) => {
  if (phrases[0].startTime > thTime) {
    return { 'startTime': 0, 'endTime': phrases[0].startTime - 1 };
  }
}

const getInterludes = (phrases, thTime = 3000) => {
  let index = 0;
  let result = [];
  for (let i = 0; i < phrases.length - 1; i++){
    if (phrases[i + 1].startTime - phrases[i].endTime > thTime) {
      result.push({ 'startTime': phrases[i].endTime + 1, 'endTime': phrases[i + 1].startTime - 1 });
      index++;
    }
  }
  return result;
}

const getPostlude = (charBlock, thTime = 3000) => {
  if(videoEndTime - charBlock.slice(-1)[0]._endTime > thTime) {
    return { 'startTime': charBlock.slice(-1)[0]._endTime + 1, 'endTime': videoEndTime };
  }
}

const findInterlude = (position, interludes) => {
  for(const i of interludes) {
    if(i['startTime'] <= position && position <= i['endTime']) return i;
  }
  return false;
}

const getDisplayedWords = (position, wordBlocks) => {
  let words = [];
  for(const w of wordBlocks) {
    if(w.startTime <= position) {
      words.push(w);
    }
  }
  return words;
}

const bgChange = (p5, position, startTime, col, duration = 1000) => {
  const rectWidth = p5.width / 5;
  const moveTime = Math.min(1, p5.map(position - startTime, 0, duration, 0, 1));
  p5.noStroke();
  p5.fill(col);
  for(let i = 0; i < 5; i++) {
    p5.rect( (i * rectWidth) + (rectWidth / 2), p5.height / 2, rectWidth * Ease.quartIn(moveTime), p5.height );
  }
  return moveTime;
}

const bgChange2 = (p5, position, startTime, col, duration = 1000) => {
  const size = p5.width / 5;
  const moveTime = Math.min(1, p5.map(position - startTime, 0, duration, 0, 1));
  p5.noStroke();
  p5.fill(col);
  for(let y = 0; y < 6; y++) {
    for(let x = 0; x < 6; x++) {
      p5.circle(x * size, y * size , (size * 2) * Ease.sineOut(moveTime));
    }
  }
  return moveTime;
}

const bgChange3 = (p5, position, startTime, col, duration = 1000) => {
  const moveTime = Math.min(1, p5.map(position - startTime, 0, duration, 0, 1));
  p5.push();
  p5.noStroke();
  p5.fill(col);
  p5.arc(p5.width / 2, p5.height / 2, p5.width + p5.width / 2, p5.height + p5.height / 2, -90, -90 + 360 * Ease.bounceOut(moveTime));
  p5.pop();
  return moveTime;
}

const bgChange4 = (p5, position, startTime, col, duration = 2000) => {
  const moveTime = Math.min(1, p5.map(position - startTime, 0, 1000, 0, 1));
  const moveTime2 = Math.min(1, p5.map(position - startTime, 800, 1800, 0, 1));
  const moveTime3 = Math.min(1, p5.map(position - startTime, 1000, duration, 0, 1));
  p5.push();
  p5.noFill();
  p5.stroke(col);
  p5.strokeWeight(30);
  p5.circle(p5.width / 2, p5.height / 2, (p5.width + p5.width / 2) * Ease.quintOut(moveTime));
  if(moveTime2 > 0) p5.circle(p5.width / 2, p5.height / 2, (p5.width + p5.width / 2) * Ease.quintOut(moveTime2));
  p5.fill(col);
  p5.noStroke();
  if(moveTime3 > 0) p5.circle(p5.width / 2, p5.height / 2, (p5.width + p5.width / 2) * Ease.quintOut(moveTime3));
  p5.pop();
  return moveTime3;
}

let rectHeight_bgChange5;
const bgChange5 = (p5, position, startTime, col, duration = 1000) => {
  const rectNum = 10;
  if(!rectHeight_bgChange5) {
    let rectHeight = [rectNum];
    for(let i = 0; i < rectNum; i++) {
      rectHeight[i] = p5.random(p5.height / 2 - p5.height / 4, p5.height / 2 + p5.height / 4);
    }
    rectHeight_bgChange5 = rectHeight;
  }
  const moveTimeWhole = Math.min(1, p5.map(position - startTime, 0, duration, 0, 1));

  const rectWidth = p5.width / rectNum;
  const segD = duration / rectNum;
  p5.push();
  p5.rectMode(p5.CORNER);
  p5.stroke(col);
  p5.fill(col);
  for(let i = 0; i < rectNum; i++) {
    const moveTime = Math.min(1, p5.map(position - startTime, i * segD, i * segD + segD, 0, 1));
    const q = p5.height - (p5.height - rectHeight_bgChange5[i]);
    p5.rect( (i * rectWidth), p5.height - rectHeight_bgChange5[i] * Ease.quintIn(moveTime), rectWidth,  q * Ease.quintIn(moveTime));
    const l = (p5.height - rectHeight_bgChange5[rectNum - i - 1]);
    p5.rect( (p5.width - (i * rectWidth) - rectWidth), 0, rectWidth, l * Ease.quintIn(moveTime));
  }
  p5.pop();
  return moveTimeWhole;
}

new P5((p5) => {
  const u = 100;
  const centerx = 300;
  const centery = 300;
  const block = 100;
  let b;
  let b2;
  let g;
  let phraseBlocks;
  let testBlocks;
  let worldCamera;
  let autoCamera;
  let zoomCamera;
  let myFont;
  let isChorus = false;
  let chorusList;
  let currentChorus;
  let chorusIndex = 0;
  let chorusSize = { sizeX: 0, sizeY: 0, };
  let wordBlocks;
  let charBlocks;
  let yarimasuta = true;
  const balls = new Array();
  let prelude;
  let isPrelude = false;
  let interludes;
  let interlude;
  let isInterlude = false;
  let postlude;
  let isPostlude = false;
  let bgColor;
  let textColor;
  let bgChangeTime = { endTime: 5000, };
  let vanishedIndex = [];
  let allDisplayedSize;
  let isVideoEnd = false;
  let wordCenterX;
  let isBgChanging = false;
  let bgChangeStartTime;
  let distBgCol;
  let mt;
  let bgChangePattern = [bgChange, bgChange2, bgChange3, bgChange4, bgChange5];
  let mousePressStartTime;
  let currentBeatPos = -1;
  let pg;
  let textColorArray;
  let colorNum = 5;
  let isTextChanging = false;
  let colorSegWords = [];

  p5.setup = () => {
    let result = p5.createCanvas(cameraSize, cameraSize);
    result.parent("result");

    let btnlist = p5.createDiv(`
      <ul id="List" class="list">
        <li class="item">
          <a id="LoadingMemories", class="btn btn-gradient"><span>LoadingMemories</span></a>
        </li>
        <li class="item">
          <a id="青に溶けた風船", class="btn btn-gradient"><span>青に溶けた風船</span></a>
        </li>
        <li class="item">
          <a id="歌の欠片と", class="btn btn-gradient"><span>歌の欠片と</span></a>
        </li>
        <li class="item">
          <a id="未完のストーリー", class="btn btn-gradient"><span>未完のストーリー</span></a>
        </li>
        <li class="item">
          <a id="みはるかす", class="btn btn-gradient"><span>みはるかす</span></a>
        </li>
        <li class="item">
          <a id="fear", class="btn btn-gradient"><span>fear</span></a>
        </li>

        <li class="item">
          <a id="play", class="btn"><span>Plese Select Song</span></a>
        </li>
      </ul>
    `);
    btnlist.id('btnlist');
    btnlist = document.getElementById("btnlist");
    const btn1 = document.getElementById("LoadingMemories");
    const btn2 = document.getElementById("青に溶けた風船");
    const btn3 = document.getElementById("歌の欠片と");
    const btn4 = document.getElementById("未完のストーリー");
    const btn5 = document.getElementById("みはるかす");
    const btn6 = document.getElementById("fear");
    const playBtn = document.getElementById("play");
    const playText = playBtn.children[0];
    const bs = document.getElementsByClassName("btn-gradient");
    const btnText = document.querySelectorAll(".btn-gradient > span");

    for(const b of bs) {
      b.style.width = cameraSize - 100;
    }
    playBtn.style.width = cameraSize - 100;
    for(const bt of btnText) {
      bt.style.fontSize = '40px';
    }

    const changeElement = (element, text) => {
      playBtn.style.backgroundColor = '#3333FF';
      playBtn.style.boxShadow = '0px 0px 0px 4px #FF0099';
      playText.textContent = "PLAY";
      for(const b of bs) {
        b.style.backgroundColor = '#CCC';
      }
      element.style.backgroundColor = '#3399FF';
      element.style.boxShadow = '0px 0px 0px 4px #3399FF';
    };

    btn1.addEventListener('click', () => {
      selectedSong = SONG["Loading Memories / せきこみごはん feat. 初音ミク"];
      changeElement(btn1, "LoadingMemories");
    });
    btn2.addEventListener('click', () => {
      selectedSong = SONG["青に溶けた風船 / シアン・キノ feat. 初音ミク"];
      changeElement(btn2, "青に溶けた風船");
    });
    btn3.addEventListener('click', () => {
      selectedSong = SONG["歌の欠片と / imo feat. MEIKO"];
      changeElement(btn3, "歌の欠片と");
    });
    btn4.addEventListener('click', () => {
      selectedSong = SONG["未完のストーリー / 加賀（ネギシャワーP） feat. 初音ミク"];
      changeElement(btn4, "未完のストーリー");
    });
    btn5.addEventListener('click', () => {
      selectedSong = SONG["みはるかす / ねこむら（cat nap） feat. 初音ミク"];
      changeElement(btn5, "みはるかす");
    });
    btn6.addEventListener('click', () => {
      selectedSong = SONG["fear / 201 feat. 初音ミク"];
      changeElement(btn6, "fear");
    });
    playBtn.addEventListener('click', () => {
      if(selectedSong) {
        player.createFromSongUrl(selectedSong.songUrl, { video: selectedSong.video });
        btnlist.remove();
        const playing = p5.createDiv(`
          <ul id="List" class="list">
            <li class="item">
              <a id="Loaded", class="btn btn-gradient"><span>Now Loading...</span></a>
            </li>
          </ul>
        `);
        playing.id('playing');
        const playingBtn = document.getElementById("Loaded");
        playingBtn.style.height = cameraSize / 5;
        playingBtn.style.width = cameraSize;
        startingText = document.querySelector("#Loaded > span");

        playingBtn.addEventListener('click', () => {
          if(init && player.video && player.timer && isTimerReady) {
            player.requestPlay();
            playing.remove();
          }
        });
      } else {
        playText.textContent = "曲を選んでね";
      }
    });

    p5.textFont('Monoton');
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.imageMode(p5.CENTER);
    p5.colorMode(p5.HSB, 100);
    p5.angleMode(p5.DEGREES);
    p5.frameRate(60);
    pg = p5.createGraphics(cameraSize, cameraSize);
    init = false;
  };

  p5.draw = () => {
    if(!player || !player.video || !player.timer) {
      return;
    } else if(!init && isVideoReady){
      //console.log("---------Start initial draw------------");
      g = new Grid(p5, canvasW, canvasH);
      phraseBlocks = new Array(phrases.length);
      wordBlocks = new Array();

      let cou = 0;
      let i = 0;
      let test = new Array();

      for(let cou = 0; cou < phrases.length; cou++) {
        test.push(phrases[cou]);
      }
      testBlocks = new Array(test.length);
      for(const p of test) {
        testBlocks[i] = new PhraseBlock(p5, g, p);
        i++;
      }
      const blocks = new Array();
      for(const phrase of testBlocks) {
        for(const word of phrase._wordBlocks) {
          wordBlocks.push(word);
          for(const char of word._blocks) {
            blocks.push(char);
          }
        }
      }
      autoCamera = new AutoCamera(p5, blocks, canvasW, canvasH);
      zoomCamera = new ZoomCamera(p5, canvasW, canvasH);

      chorusList = sabi.segments;
      currentChorus = chorusList[chorusIndex];
      prelude = getPrelude(phrases);
      interludes = getInterludes(phrases);
      postlude = getPostlude(blocks);
      bgColor = p5.color(0);
      textColor = {'h': 0, 's': 0, 'b': 100};
      allDisplayedSize = g.getActiveGridSize(videoEndTime, wordBlocks);
      wordCenterX = ((allDisplayedSize['sizeX'] * globalBlockSize) / 2);
      charBlocks = blocks;

      const segNum = Math.floor(wordBlocks.length / colorNum);
      let x = 0;
      let textCol = p5.color(0, 0, 100);
      let segIndex = 0;
      let tmpArray = [];
      for(const w of wordBlocks) {
        w.enableColor(textCol);
        tmpArray.push(w);
        x++;
        if(x % segNum == 0) {
          colorSegWords.push(tmpArray);
          tmpArray = [];
          textCol = p5.color(Math.floor(Math.random() * 100), 100, 100);
          segIndex++;
        }
      }
      for(const w of tmpArray) {
        colorSegWords[colorSegWords.length - 1].push(w);
      }
      console.log("-----------End initial draw------------");
      init = true;
    }

    //-----------------------------------------------ここから繰り返しゾーン-----------------------------------------------
    const position = player.timer.position;

    isPrelude = prelude && (prelude['startTime'] < position) && (position < prelude['endTime']);
    interlude = findInterlude(position, interludes);
    isPostlude = postlude && (postlude['startTime'] < position);

    if(!isChorus && chorusIndex < chorusList.length && currentChorus.startTime < position + 500) {
      isChorus = true;
      const res = g.getActiveGridSize(currentChorus.endTime, wordBlocks);
      chorusSize['sizeX'] = res['sizeX'];
      chorusSize['sizeY'] = res['sizeY'];
    }
    if(isChorus && currentChorus.endTime < position) {
      isChorus = false;
      zoomCamera._isInit = true;
      chorusIndex++;
      currentChorus = chorusList[chorusIndex];
    }

    p5.background(bgColor);

    if(mt) {
      const changeTime = mt(p5, position, bgChangeStartTime, distBgCol);
      if(changeTime == 1) {
        bgColor = distBgCol;
        mt = null;
        isBgChanging = false;
        rectHeight_bgChange5 = null;
      }
    }

    const beat = player.findBeat(position);
    if (beat && !isVideoEnd) {
      const progress = beat.progress(position);
      pg.background(p5.color(0, 0, 0, 10));
      pg.erase();
      pg.circle(pg.width / 2, pg.height / 2, (pg.width + pg.width / 4) +  pg.width / 4 * Ease.quintIn(progress));
      pg.noErase();
      p5.image(pg, p5.width / 2, p5.height / 2);
      currentBeatPos = beat.position;
    }

    if(isPostlude || isVideoEnd) {
      let moveTime;
      if(position) moveTime = p5.min(1, p5.map(videoEndTime - position, 3000, 0, 0, 1));
      else moveTime = 1;
      p5.push();
      p5.noStroke();
      if(p5.hue(bgColor) == 0 && p5.saturation(bgColor) == 0 && p5.brightness(bgColor) == 100) p5.fill(0, 0, 0, 100 * Ease.quintIn(moveTime));
      else p5.fill(0, 0, 100, 100 * Ease.quintIn(moveTime));

      const size = p5.width / selectedSong['title'].length;
      p5.textSize(size);
      p5.text(selectedSong['title'], p5.width / 2, p5.height / 2);
      const artistSize = p5.width / selectedSong['artist'].length;
      p5.textSize(artistSize);
      p5.text(selectedSong['artist'], p5.width / 2, p5.height / 2 + size / 2 + artistSize / 2);
      p5.pop();
    }

    //-----------------------------------------------ここからカメラゾーン-----------------------------------------------
    if(!interlude) {
      if(autoCamera.isInit) autoCamera._isInit = false;
      autoCamera.update(position, isChorus);
    } else {
      if(!autoCamera.isInit) autoCamera.init_interlude(position, interlude, getDisplayedWords(position, wordBlocks));
      autoCamera.update_interlude(position);
    }

    if(position && !isChorus && !isPostlude) {
      p5.translate(-(autoCamera._x - (cameraSize / 2)),  -(autoCamera._y - (cameraSize / 2)));
      p5.scale(autoCamera.zoom);
    } else {
      if(isChorus) {
        if(zoomCamera.isInit) {
          zoomCamera.setInit((autoCamera._x - (cameraSize / 2)), (autoCamera._y - (cameraSize / 2)), g.getActiveGridSize(currentChorus.endTime, wordBlocks), position, currentChorus.startTime);
        }
        zoomCamera.update(position);
      } else if(isPostlude) {
        if(zoomCamera.isInit) {
          zoomCamera.setInit((autoCamera._x - (cameraSize / 2)), (autoCamera._y - (cameraSize / 2)), g.getActiveGridSize(position, wordBlocks), position, position + 1000);
        }
        zoomCamera.update_postlude(position);
      }

      p5.scale(zoomCamera.zoom);
      p5.translate(-zoomCamera.x, -zoomCamera.y);
    }

    if(isPostlude) {
      isVideoEnd = true;
      postludeProcess(p5, position, charBlocks);
    }
    //-----------------------------------------------ここから図形描画ゾーン-----------------------------------------------
    for(const phrase of testBlocks) {
      for(const word of phrase._wordBlocks) {
        for(const char of word._blocks) {
          if(isChorus) {
            if(char._startTime < position + 500 && position < char._endTime) {
              if(!char.isSetChorusPos) {
                char.setChorusPos(chorusSize['sizeX'], chorusSize['sizeY']);
                balls.push(new Ball(p5, char._posX_chorus, char._posY_chorus));
              }
              char.updateChorus_fadeIn(position);
              char.displayChorusText();
            }
          }
          if(char._isVanished) continue;
          if(char._isDisplayed) {
            if(char._isChangingCol) {
              char.update_changingCol(position);
            }
            char.displayText();
          } else if(char._startTime < position + time_fadein) {
            char.update_fadein(position);
            char.displayText();
          }
        }
      }
    }

    for(const b of balls) {
      if(interlude && beat || isPostlude && beat) {
        b.drawMulti(beat.progress(position));
      } else {
        b.drawMulti();
      }
    }

  };

  p5.mouseReleased = () => {
    if(player.isPlaying && isChorus || player.isPlaying && isPostlude) {
      const randInt = Math.floor(Math.random() * bgChangePattern.length);
      mt = bgChangePattern[randInt];
      bgChangeStartTime = player.timer.position;
      if(Date.now() - mousePressStartTime > 1000) {
        if(p5.hue(bgColor) == 0 && p5.saturation(bgColor) == 0 && p5.brightness(bgColor) == 0) distBgCol = p5.color(0, 0, 100);
        else distBgCol = p5.color(0, 0, 0);
      } else {
        distBgCol = p5.color(Math.floor(Math.random() * 100), 80, 80);
      }
      isBgChanging = true;
    }
  }

  p5.mousePressed = () => {
    mousePressStartTime = Date.now();

    if(!player.isPlaying) return;
    if(isChorus || isPostlude) return;
    const posX = p5.mouseX + (autoCamera._x - (cameraSize / 2));
    const posY = p5.mouseY + (autoCamera._y - (cameraSize / 2));
    const selectGridPos = [Math.floor(posY / globalBlockSize), Math.floor(posX / globalBlockSize)];
    for(const w of wordBlocks) {
      for(const pos of w._posInGrid) {
        if(pos.toString() === selectGridPos.toString() && w._isVisible) {
          console.log(w.getText);
          const resultWords = findWordSeg(w);
          const distTextColor = p5.color(Math.floor(Math.random() * 100), 100, 100);
          for(const w of resultWords) {
            w.changeColor(player.timer.position, distTextColor);
          }
          return;
        }
      }
    }
  };

  const findWordSeg = (word) => {
    for(const seg of colorSegWords) {
      for(const s of seg) {
        if(s._posX == word._posX && s._posY == word._posY) return seg;
      }
    }
  }

  const postludeProcess = (p5, position, charBlock, duration = 3000) => {
    const endTime = videoEndTime - duration;
    const moveTime = Math.min(1, p5.map(endTime - position, duration, 0, 0, 1));
    const vanishCount = Math.floor( charBlock.length * Ease.quintIn(moveTime) );
    for(let i = 0; i < (vanishCount - vanishedIndex.length); i++) {
      while(true) {
        const index = Math.floor(Math.random() * charBlock.length);
        if(!vanishedIndex.includes(index)) {
          charBlock[index]._isVanished = true;
          vanishedIndex.push(index);
          break;
        }
      }
    }
  }

});

/*
class Camera {
  constructor(p5, canvasW, canvasH) {
    this.p5 = p5;
    this.pos = p5.createVector(0, 0);
    this._zoom = 0.3;
  }
  draw(key) {
    if (key == 'w') this.pos.y -= 50;
    if (key == 's') this.pos.y += 50;
    if (key == 'a') this.pos.x -= 50;
    if (key == 'd') this.pos.x += 50;
    if (key == 'x') this._zoom *= 2;
  }
  get posX() {
    return this.pos.x;
  }
  get posY() {
    return this.pos.y;
  }
  get zoom() {
    return this._zoom;
  }

  set posX(num) {
    this.pos.x += num - this.pos.x;
  }
  set posY(num) {
    this.pos.y += num - this.pos.y;
  }
}
*/

class ZoomCamera {
  constructor(p5, canvasW, canvasH) {
    this.p = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this._x = 0;
    this._y = 0;
    this._zoom = 0;
    this.isInit = true;
    this.distScale = 0;
    this.distX = 0;
    this.distY = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.preScale = 1;
    this.zoomInit = false;
  }

  zoomInInit() {
    this.startTime = Date.now();
    this.preScale = this._zoom;
    this.zoomInit = true;
  }

  zoomIn() {
    this.moveTime = (Date.now() - this.startTime) / 500;
    this._zoom = this.preScale + 1 * Ease.quintOut(this.moveTime);
  }

  updateChorus(size) {
    const xsize = cameraSize / (size['sizeX'] * globalBlockSize) * 1;
    const ysize = cameraSize / (size['sizeY'] * globalBlockSize) * 1;
    const scale = xsize < ysize ? xsize : ysize;
    this._zoom = scale;
    this._x = (canvasW / 2) - ((size['sizeX'] * globalBlockSize) / 2);
    this._y = (canvasH / 2) - ((size['sizeY'] * globalBlockSize) / 2);
  }

  update(position) {
    this.moveTime = Math.min(1, this.p.map(position - this.startTime, 0, 500, 0, 1));
    this._x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
    this._y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
    this._zoom = 1 - ( (1 - this.distScale) * Ease.quintOut(this.moveTime) );
  }

  update_postlude(position) {
    this.moveTime = Math.min(1, this.p.map(position - this.startTime, 0, 1000, 0, 1));
    this._x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
    this._y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
    this._zoom = 1 - ( (1 - this.distScale) * Ease.quintOut(this.moveTime) );
  }

  setInit(preX, preY, size, startTime, endTime) {
    this.preX = preX;
    this.preY = preY;
    const xsize = cameraSize / (size['sizeX'] * globalBlockSize) * 1;
    const ysize = cameraSize / (size['sizeY'] * globalBlockSize) * 1;
    const scale = xsize < ysize ? xsize : ysize;
    this.distScale = scale;
    this.distX = (canvasW / 2) - ((size['sizeX'] * globalBlockSize) / 2);
    this.distY = (canvasH / 2) - ((size['sizeY'] * globalBlockSize) / 2);
    this.startTime = startTime;
    this.endTime = endTime;
    this.isInit = false;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get _distX() {
    return this.distX;
  }
  get zoom() {
    return this._zoom;
  }
  get _zoomInit() {
    return this.zoomInit;
  }
  set _isInit(bool) {
    this.isInit = bool;
  }
}

class AutoCamera {
  constructor(p5, block, canvasW, canvasH) {
    this.p = p5;
    this.block = block;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this._zoom = 1.0;
    this.index = 0;
    this.x = 0;
    this.y = 0;
    this.distX;
    this.distY;
    this.distSet();
    this.preX = this.x;
    this.preY = this.y;
    this.startTime = 0;
    this.moveTime = 0;
    this.stopTime = 0;
    this.isMove = true;
    this.angle = 0;
    this.moveLimit = this.block[this.index].startTime;
    this.isEnd = false;
    this.quickMove = false;
    this.isInit = false;
    this.angle = 0;
    this.preAngle = 0;
    this.distAngle = 0;
    this.interludeSeg = [];
    this.currentInterludeSegIndex = 0;
    this.endInterlude = false;
  }

  init_interlude(position, interlude, displayedWords, duration = 3000) {
    this.interludeSeg = [];
    this.currentInterludeSegIndex = 0;
    this.endInterlude = false;
    const interludeTime = interlude['endTime'] - interlude['startTime'];
    const interludeSegNum = interludeTime / duration;
    let remainTime = 0;
    for(let i = 0; i < Math.floor(interludeSegNum); i++) {
      const index = Math.floor(Math.random() * displayedWords.length);
      if(i == interludeSegNum - 1) remainTime = interludeTime % duration;
      this.interludeSeg.push( { "startTime": interlude['startTime'] + i * duration, "endTime": interlude['startTime'] + duration + (duration * i) + remainTime, "posX": displayedWords[index]._posX, "posY": displayedWords[index]._posY } );
    }
    this.preX = this.x;
    this.preY = this.y;
    this.distX = this.interludeSeg[0]["posX"];
    this.distY = this.interludeSeg[0]["posY"];
    this.startTime = this.interludeSeg[0]["startTime"];
    this.endTime = this.interludeSeg[0]["endTime"];
    this.moveLimit = this.endTime - this.startTime;
    this.isInit = true;
  }

  update_interlude(position) {
    if(this.endInterlude) return;
    this.moveTime = Math.min(1, this.p.map(position - this.startTime, 0, this.moveLimit, 0, 1));
    this.x = this.preX + (this.distX - this.preX) * Ease.quintIn(this.moveTime);
    this.y = this.preY + (this.distY - this.preY) * Ease.quintIn(this.moveTime);
    if(this.moveTime == 1) {
      this.currentInterludeSegIndex++;
      if(this.currentInterludeSegIndex < this.interludeSeg.length) {
        const currentInterlude = this.interludeSeg[this.currentInterludeSegIndex];
        this.preX = this.x;
        this.preY = this.y;
        this.distX = currentInterlude["posX"];
        this.distY = currentInterlude["posY"];
        this.startTime = currentInterlude["startTime"];
        this.endTime = currentInterlude["endTime"];
        this.moveLimit = this.endTime - this.startTime;
      } else {
        this.endInterlude = true;
      }
    }
  }

  update(position, isChorus) {
    if(position < this.startTime) return;
    if(this.quickMove) {
      this.x = this.block[this.index - 1]._posX;
      this.y = this.block[this.index - 1]._posY;
      this.quickMove = false;
    } else {
      this.moveTime = (position - this.startTime) / this.moveLimit;
      this.x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
      this.y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
    }
    if(position - this.startTime >= this.moveLimit) {
      this.preX = this.x;
      this.preY = this.y;
      this.index++;

      if(this.index >= this.block.length) {
        this.isEnd = true;
        return;
      }

      this.limitSet();
      this.startTime = this.block[this.index].startTime;
      this.distSet();
    }
  }

  distSet() {
    this.distX = this.block[this.index]._posX;
    this.distY = this.block[this.index]._posY;
  }
  limitSet() {
    const currentBlock = this.block[this.index];
    this.moveLimit = currentBlock.endTime - currentBlock.startTime;

    if(this.moveLimit < 31) {
      let limit = 0;
      let tmpIndex = this.index;
      while(limit == 0) {
        let nextBlock = this.block[tmpIndex + 1];
        limit = nextBlock.endTime - nextBlock.startTime;
        tmpIndex++;
      }
      this.moveLimit = limit;
      this.index = tmpIndex;
      this.quickMove = true;
    }
  }

  get _x() {
    return this.x;
  }
  get _y() {
    return this.y;
  }
  get zoom() {
    return this._zoom;
  }
  get _angle() {
    return this.angle;
  }
  get _isInit() {
    return this.isInit;
  }
  set _isInit(bool) {
    this.isInit = bool;
  }
}
