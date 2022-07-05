const P5 = p5;
const { Player, Ease } = TextAliveApp;
import { Block } from './Block';
import { Grid } from './Grid';
import { drawGrid } from './drawGrid';
import { WordBlock } from './WordBlock';
import { PhraseBlock } from './PhraseBlock';
import { Ball } from './Ball';

let text;

const player = new Player({
	app: {token: "6rquYSfCRiWlgifb"},

	// 読み込むフォントを指定する。nullだとすべて読み込む。
	//fontFamilies: null,

	mediaBannerPosition: "buttom right",
	// 音源メディアを指定する。
	mediaElement: document.querySelector("#media"),

	// throttleアップデート関数の発行間隔をしていする。ミリセカンド。
	//throttleInterval: 10,

	// TextAlive Playerの音源の再生状態を管理するTimerインスタンス。よくわからん。。。
	//timer: ,

	// V/A空間の座標値を取得するか否か。
	// V/A空間について：https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=142056&file_id=1&file_no=1
	// V/A空間は、ある時刻の音源に対する感情の指標である。VはValance(怪ー不快)、Activation(活性ー日活性)の二軸で表される。例えば、喜びは二軸ともに正。
	valenceArousalEnabled: true,

	// 声量情報を取得するかどうか。
	vocalAmplitudeEnabled: true,

});

/////////////////////// イベントリスナを登録する ///////////////////////
// 3種類のイベントリスナから指定する。PlayerEventListener, PlyaerAppListener, LoaderListener
// 指定したイベントリスナは、必ずoverrideして定義しなければならない。
// https://developer.textalive.jp/packages/textalive-app-api/globals.html#playerlistener
player.addListener({
	// PlayerEventListenerのイベントリスナ
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html
	//onDispose, 				// プレイヤーが破棄されるとき
	//onMediaElementSet,	 	// 音源メディアが変更されたとき(配属先のDOM要素が変更されたとき)
	//onMediaSeek,			// 再生中の楽曲の再生位置が変更されたとき
	//onPause,				// 再生中の楽曲が一時停止されたとき
	//onPlay,					// 楽曲の再生が始まったとき
	//onResize,				// ステージサイズが変更されたとき（ステージってなに？2021/08/10）
	//onSeek,					// 再生中の楽曲の再生位置がユーザーによって変更されたとき
	//onStop,					// 再生中の楽曲が一時停止されたとき
	//onThrottledTimeUpdate,	// 動画の再生位置が変更されたときに呼ばれる（あまりに頻繁な発火を防ぐため一定間隔に間引かれる）、間隔時間はPlayerクラスのオプションで設定可能。
	onTimeUpdate,			// 動画の再生位置が変更されたときに呼ばれる
	//onTimerReady,			// 動画のためのTimerの準備が整ったとき
	onVideoReady,			// 動画オブジェクトの準備が整ったとき
	//onVideoSeek,			// 動画のシーク操作が行われたとき
	//onVideoSeekEnd,			// 動画のシーク操作が終わったとき
	//onVideoSeekStart,		// 動画のシーク操作が始まったとき
	//onVolumeUpdate,			// 音量が変更されたとき

	// PlayerAppListenerのイベントリスナ
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playerapplistener.html
	//onAppConnected, 		// TextAliveAppAPIサーバとの接続時に呼ばれる
	//onAppMediaChange,		// 再生すべき楽曲URLが変更されたとき
	//onAppParameterUpdate,	// TextAliveアプリのパラメタが変更されたときに呼ばれる
	onAppReady,				// TextAliveホストとの接続時に呼ばれる

	// LoaderListenerのイベントリスナ。このリスナは、DataLoaderListenerの中で、さらに4つに分かれる。
	// DataLoaderListener -> VideoLoaderListener, SongLoaderListener, TextLoaderListener, FontLoaderListener
	// ↓ LoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/globals.html#loaderlistener
	// ↓ VideoLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/videoloaderlistener.html
	// ↓ SongLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/songloaderlistener.html
	// ↓ TextLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/textloaderlistener.html
	// ↓ FontLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/fontloaderlistener.html
	//onVideoLoad, 			// 動画データが読み込まれたとき
	//onSongInfoLoad,			// 楽曲の詳細情報が読み込まれたとき
	//onSongLoad,				// 楽曲の基本情報が読み込まれたとき
	//onSongMapLoad,			// 楽曲地図が読み込まれたとき
	//onValenceArousalLoad,	// V/A空間が読み込まれたとき
	//onVocalAmplitudeLoad,	// 声量の情報が読み込まれたとき
	//onLyricsLoad,			// 歌詞テキストの発生タイミング情報が読み込まれたとき
	//onTextLoad,				// 歌詞テキストが読み込まれたとき
	//onFontsLoad,			// フォントが読み込まれたとき

});

// アニメーション関数の定義、フレーズ、単語、文字
// フレーズが発声されていたら #text_phrase に表示する
const animatePhrase = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_phrase").textContent = unit.text;
    text = unit.text;
	}
};

// 単語が発声されていたら #text_word に表示する
const animateWord = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_word").textContent = unit.text;
	}
};

// 文字が発声されていたら #text_char に表示する
const animateChar = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_char").textContent = unit.text;
	}
};

function onAppReady(app){

	//その心に灯る色は
	//player.createFromSongUrl("https://www.youtube.com/watch?v=bMtYf3R0zhY");

	//Loading Memories
	player.createFromSongUrl("https://www.youtube.com/watch?v=ZOTJgXBkJpc");
	//player.createFromSongUrl("https://piapro.jp/t/N--x/20210204215604");
	//歌の欠片と
	//player.createFromSongUrl("https://www.youtube.com/watch?v=CkIy0PdUGjk");

	//player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830");
	//player.createFromSongUrl("https://www.youtube.com/watch?v=ygY2qObZv24");
	document.querySelector("#onAppReady").textContent = "準備完了";
}

/*
let timer = null;
function onTimerReady(timer) {
}
*/

let phrases = null;
let sabi = null;
let songInfo = null;
export let chorus = null;
// 動画データが読み込まれたとき
// 楽曲情報を表示する。アニメーション関数を割り当てる。
function onVideoReady(v){
  phrases = player.video.phrases;
	songInfo = player.data.songMap.segments;
	// サビ情報を読み取る
	var segments_contenst = "";
	// for文でarrayをすべてたどる
	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of
	for(const element of player.data.songMap.segments){
		segments_contenst = segments_contenst + String(element.chorus) + "(" + String(element.duration) + " [ms]), ";
		console.log("セグメント情報");
		console.log(element);
		if(element.chorus) {
			sabi = element;
			chorus = sabi.segments;
		}
	}

	document.querySelector("#segments").textContent = segments_contenst;

	document.querySelector("#song_name").textContent = player.data.song.name;
	document.querySelector("#song_permalink").textContent = player.data.song.permalink;
	document.querySelector("#song_artist").textContent = player.data.song.artist.name;

	// 定期的に呼ばれる各フレーズの "animate" 関数をセットする
	let w;
	// Set "animate" function
  	w = player.video.firstPhrase;
  	while (w) {
    	w.animate = animatePhrase;
    	w = w.next;
  	}
	// 定期的に呼ばれる各単語の "animate" 関数をセットする
  	// Set "animate" function
  	w = player.video.firstWord;
  	while (w) {
    	w.animate = animateWord;
    	w = w.next;
  	}
	// 定期的に呼ばれる各文字の "animate" 関数をセットする
  	// Set "animate" function
  	w = player.video.firstChar;
  	while (w) {
    	w.animate = animateChar;
    	w = w.next;
  	}
	document.querySelector("#onVideoReady").textContent = "準備完了";
}


// 楽曲の再生位置が更新されたときに呼び出される。（再生中常に呼び出される）
// index.htmlの各変数を随時更新する。
function onTimeUpdate(position){
	document.querySelector("#position").textContent = position;
	document.querySelector("#beat_index").textContent = player.findBeat(position).index;
	document.querySelector("#beat_duration").textContent = player.findBeat(position).duration;
	document.querySelector("#chord_index").textContent = player.findChord(position).index;
	document.querySelector("#chord_duration").textContent = player.findChord(position).duration;
	document.querySelector("#chorus_index").textContent = player.findChorus(position).index;
	document.querySelector("#chorus_duration").textContent = player.findChorus(position).duration;
	document.querySelector("#VA_A").textContent = player.getValenceArousal(position).a;
	document.querySelector("#VA_V").textContent = player.getValenceArousal(position).v;
	document.querySelector("#volume").textContent = player.getVocalAmplitude(position);
	document.querySelector("#phrase").textContent = player.video.findPhrase(position).text;
	document.querySelector("#word").textContent = player.video.findWord(position).text;
	document.querySelector("#char").textContent = player.video.findChar(position).text;
}

export const canvasW = 4000;
export const canvasH = 4000;
export const globalBlockSize = 100;

export const time_fadein = 100;
export const time_fadeout = 100;
new P5((p5) => {
  const u = 100;
  const centerx = 300;
  const centery = 300;
  const block = 100;
  const showGrid = true;
  let b;
  let b2;
  let g;
  let init;
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

	const wordBlocks = new Array();

	let yarimasuta = true;

	const balls = new Array();
	p5.preload = () => {
		//myFont = p5.loadFont('./assets/MPLUSRounded1c-Light.ttf');
	}

  p5.setup = () => {
		//let result = p5.createCanvas(window.innerWidth, window.innerHeight);
		let result = p5.createCanvas(window.innerHeight, window.innerHeight);
		result.parent("result");

    p5.textFont('Monoton');
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
		p5.colorMode(p5.HSB, 100);
		p5.frameRate(24);
		worldCamera = new Camera(p5, canvasW, canvasH);
    g = new Grid(p5, canvasW, canvasH);
    init = false;
		//console.log(songInfo);
  };

  p5.draw = () => {
    //console.log("now drawing");
    if(!player || !player.video || !player.timer) {
      return;
    } else if(!init){
      console.log("---------Start initial draw------------");
      phraseBlocks = new Array(phrases.length);

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
			//const wordBlocks = new Array();
			for(const phrase of testBlocks) {
				for(const word of phrase._wordBlocks) {
					wordBlocks.push(word);
					for(const char of word._blocks) {
						blocks.push(char);
					}
				}
			}
			console.log(wordBlocks);
			autoCamera = new AutoCamera(p5, blocks, canvasW, canvasH);
			zoomCamera = new ZoomCamera(p5, canvasW, canvasH);

			console.log("-----------End initial draw------------");
			chorusList = sabi.segments;
			currentChorus = chorusList[chorusIndex];
      init = true;
    }

    p5.background(0);
		const position = player.timer.position;


		const beat = player.findBeat(position);
		if(beat) {
			const progress = beat.progress(position);
			const alpha = 100 * Ease.quintIn(progress);
			const size = 500 + 800 * Ease.quintIn(progress);
			const x = p5.width * Ease.quintIn(progress);
			p5.fill(10, 80, 50, alpha);
			p5.strokeWeight(5);
			p5.stroke(80, 100, 100, alpha);
			p5.line(0, p5.height - 20, x, p5.height - 20);
			//p5.circle(p5.width / 2, p5.height / 2, size);
		}
		//カメラ移動
		/*
		if(p5.mouseIsPressed) {
			//console.log("タッチされました" + "worldCameraX is "+worldCamera.pos.x+"  mouseX is "+p5.mouseX);
			worldCamera.posX = p5.mouseX;
			worldCamera.posY = p5.mouseY;
		}
		*/

		/*
		p5.translate(-worldCamera.posX, -worldCamera.posY);
		p5.scale(worldCamera.zoom);
		*/


		if(chorusIndex < chorusList.length && currentChorus.startTime < position + 500) {
			isChorus = true;
			const res = g.getActiveGridSize(currentChorus.endTime, wordBlocks);
			chorusSize['sizeX'] = res['sizeX'];
			chorusSize['sizeY'] = res['sizeY'];
			//console.log("サビです!!!!!!");
		}
		if(isChorus && currentChorus.endTime < position) {
			isChorus = false;
			zoomCamera._isInit = true;
			//console.log("サビおわたっw");
			chorusIndex++;
			currentChorus = chorusList[chorusIndex];
		}

		/*
		if(yarimasuta) {
			const res = g.getActiveGridSize(currentChorus.endTime, wordBlocks);
			console.log(res);
			yarimasuta = false;
		}
		*/

		/*
		let txt = "";
		let segCount = 0;
		for(const s of songInfo) {
			for(let i = 0; i < s.segments.length; i++) {
				if(s.segments[i].startTime < position && position < s.segments[i].endTime) {
					txt = 'セグメンツ ['+segCount+']の';
					txt = txt + '['+i+']　番目の要素です。';
				}
			}
			segCount++;
		}
		console.log(txt);
		*/

		autoCamera.update(position, isChorus);
		if(!isChorus) {
			p5.translate(-(autoCamera._x - (window.innerHeight / 2)),  -(autoCamera._y - (window.innerHeight / 2)));
			//p5.translate(-(autoCamera._x - (window.innerWidth / 2)),  -(autoCamera._y - (window.innerHeight / 2)));
			p5.scale(autoCamera.zoom);
		} else {

			if(zoomCamera.isInit) {
				zoomCamera.setInit((autoCamera._x - (window.innerHeight / 2)), (autoCamera._y - (window.innerHeight / 2)), g.getActiveGridSize(currentChorus.endTime, wordBlocks), position, currentChorus.startTime);
			}
			zoomCamera.update(position);

			//zoomCamera.updateChorus(g.getActiveGridSize(currentChorus.endTime, wordBlocks));

		  p5.scale(zoomCamera.zoom);
			p5.translate(-zoomCamera.x, -zoomCamera.y);
		}
		//console.log("position : " + position + "  camera x : "+autoCamera._x+ "  y : "+ autoCamera._y);



		//ブロックオブジェクトをすべて走査
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

					if(char._isDisplayed) {
						//char.update();
						char.displayText();
					} else if(char._startTime < position + time_fadein) {
						char.update_fadein(position);
						char.displayText();
					}

				}
			}
		}

		for(const b of balls) {
			b.drawMulti();
		}
    //g.displayPoint();
    //drawGrid(p5, canvasW, canvasH);
  };

	p5.mousePressed = () => {
		console.log('マウス位置 : ' + p5.mouseX + ' / ' + p5.mouseY);
		const posX = p5.mouseX + (autoCamera._x - (window.innerWidth / 2));
		const posY = p5.mouseY + (autoCamera._y - (window.innerHeight / 2));
		console.log('キャリブレ後 : ' + posX + ' / ' + posY);
		const selectGridPos = [Math.floor(posY / globalBlockSize), Math.floor(posX / globalBlockSize)];
		console.log('グリッドポジション : ' + selectGridPos[1] + ' / ' + selectGridPos[0]);
		//クリック位置から該当するブロックオブジェクトを探索
		for(const w of wordBlocks) {
			for(const pos of w._posInGrid) {
				if(pos.toString() === selectGridPos.toString()) {
					console.log(w.getText);
					return;
				}
			}
		}
	};

	p5.keyPressed = (key) => {
		worldCamera.draw(key.key);
	};

	p5.mouseDragged = () => {
		worldCamera.posX = p5.mouseX;
		worldCamera.posY = p5.mouseY;
	};
});

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
	}

	updateChorus(size) {
		const xsize = window.innerHeight / (size['sizeX'] * globalBlockSize) * 1;
		const ysize = window.innerHeight / (size['sizeY'] * globalBlockSize) * 1;
		//console.log('sizeX : ' + size['sizeX'] + '  sizeY : ' + size['sizeY']);
		//console.log('xsize : ' + xsize + '  ysize : ' + ysize);

		const scale = xsize < ysize ? xsize : ysize;
		//console.log('スケール' + scale);
		this._zoom = scale;
		this._x = (canvasW / 2) - ((size['sizeX'] * globalBlockSize) / 2);
		this._y = (canvasH / 2) - ((size['sizeY'] * globalBlockSize) / 2);
		//console.log(this._x + ' / ' + this._y);
		//console.log(window.innerWidth + ' / ' + window.innerHeight);
	}

	update(position) {
		if(position - this.startTime >= 500) return;
		//if(this._x == this.distX && this._y == this.distY && this._zoom == this.distScale) return;
		this.moveTime = (position - this.startTime) / 500;
		this._x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
		this._y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
		this._zoom = 1 - ( (1 - this.distScale) * Ease.quintOut(this.moveTime) );
		console.log('moveTime : '+this.moveTime+' x : '+this._x+' y : '+this._y+' zoom : '+this._zoom);
	}

	setInit(preX, preY, size, startTime, endTime) {
		this.preX = preX;
		this.preY = preY;
		const xsize = window.innerHeight / (size['sizeX'] * globalBlockSize) * 1;
		const ysize = window.innerHeight / (size['sizeY'] * globalBlockSize) * 1;
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
	get zoom() {
		return this._zoom;
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
		console.log(this.distX+"  /  " +this.distY);
		this.preX = this.x;
		this.preY = this.y;
		this.startTime = 0;
		this.moveTime = 0;
		this.stopTime = 0;
		this.isMove = true;
		this.angle = 0;
		this.moveLimit = this.block[this.index].startTime;
		console.log("limit is " + this.moveLimit);
		this.isEnd = false;
		this.quickMove = false;
	}

	update(position, isChorus) {
		/*
		if(isChorus) {
			this._zoom = 0.5;
			this.x = (this.canvasW / 2) - window.innerWidth;
			this.y = (this.canvasH / 2) - window.innerHeight;
			return;
		}
		*/
		if(position < this.startTime) return;
		if(this.quickMove) {
			console.log("クイックムーブ！！！")
			this.x = this.block[this.index - 1]._posX;
			this.y = this.block[this.index - 1]._posY;
			//this.x = this.distX;
			//this.y = this.distY;
			console.log(this.x + "  "+this.y);
			this.quickMove = false;
		} else {
			this.moveTime = (position - this.startTime) / this.moveLimit;
			this.x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
			this.y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
		}
		//console.log("thisX : "+this.x + "thisY : "+this.y);
		if(position - this.startTime >= this.moveLimit) {
			//console.log("--------move limit !!!!-----------");
			//console.log("x  : "+this.x+"  y : "+this.y);
			this.preX = this.x;
			this.preY = this.y;

			this.index++;

			//最後の要素
			if(this.index > this.block.length) {
				this.isEnd = true;
				return;
			}

			this.limitSet();
			this.startTime = this.block[this.index].startTime;
			this.distSet();
			//console.log("テキスト : " + this.block[this.index]._text);
			//console.log("startTime : " + this.startTime +"next distX : "+this.distX + " distY : "+this.distY+ "moveLimit : "+this.moveLimit);
		}
	}

	distSet() {
		this.distX = this.block[this.index]._posX;
		this.distY = this.block[this.index]._posY;
	}
	limitSet() {
		const currentBlock = this.block[this.index];
		//console.log("EndTime : "+currentBlock.endTime +"  StartTime : "+currentBlock.startTime);
		this.moveLimit = currentBlock.endTime - currentBlock.startTime;
		/*
		if(this.moveLimit == 0) {
			this.quickMove = true;
		}
		*/

		//movelimitが僅少のときスキップする
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

			//console.log("スキップするやで！！")
			//console.log("preX : "+this.preX+"  preY : "+this.preY+"distX : "+this.block[this.index]._posX + "  distY : "+this.block[this.index]._posY + "  movelimit : "+this.moveLimit);
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
}
