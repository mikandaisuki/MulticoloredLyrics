# Multicolored Lyrics
初音ミク「マジカルミライ 2021」 プログラミング・コンテスト応募作品
![概要](https://user-images.githubusercontent.com/38162502/135104803-7e1e9d42-7b06-4401-8c62-17a81e3f1aae.png)

## デモ

## 概要
* TextAliveAppAPI + P5.jsを使ったリリックアプリです。
* 文字・背景・パーティクルのそれぞれの色が重なり合うことで生まれる、創造意欲かきたてるビジュアルをお楽しみください。


## 特徴
* 再生中は文字の色・背景の色を変更することができます。楽曲の区間によって変更できる要素はどちらか一方のため、継続して視聴したくなります。
* 次々と表示される歌詞に追従するカメラのスピード感
* サビ時の俯瞰カメラによるスケール感
* 発声に合わせて歌詞が螺旋を描くように表示され、終盤に近づくほどに螺旋
それまで積み上げられた歌詞の全貌が明らかになります。
*
* 意味の上に成り立っていることを表現しました。
サビ時の歌詞は表示文字

* 意味の積み重なりを
* 再生中は文字の色・背景の色を変更でき、色の重なりが
* 背景色を変更する際のアニメーションは、シンプルながら目に気持ち良いものを5パターン用意しました。
* 単語ごとにまとめて配置しつつ、なるべく文字を隙間なく敷き詰めるようなアルゴリズムを組んでいます。
* 螺旋状という根幹部分は変わりませんが、歌詞の配置や角度はアプリ開始時にランダムに決定されるため、同じ楽曲でも毎回違う演出になります。


## 使用方法
### 利用準備
* 前提として、Node.jsがインストールされていること。(※動作確認をしたバージョンはnpm@7.20.0です)
* 以下のコマンドでプロジェクトのクローンと必要なモジュールのインストールをします。
<pre>
git clone https://github.com/takanosuke/musical-note-march.git
cd musical-note-march/
npm install
</pre>

### 開発サーバ起動
* 以下のコマンドで開発用サーバが起動します。ローカル環境でテストする際に利用します。
<pre>
npm run dev
</pre>

### ビルド
* 以下のコマンドで<code>docs</code>ディレクトリ以下にビルド済みファイルが生成されます。
<pre>
npm run build
</pre>

### 操作方法
* 画面中央の再生ボタンを押すことで楽曲の再生ができます。
* 画面下の ^ ボタンを押すことでコントロールメニューが開き、楽曲の変更や再生位置の変更ができます。

## 画面遷移

* 楽曲選択
* メロディパート
* サビパート
* 間奏パート
* エンディング

### 楽曲選択
* 楽曲選択画面から再生したい曲を選択し、一番下のPLAYボタンを押してください。
* 再生可能な楽曲は「マジカルミライ 10th Anniversary 楽曲コンテスト」の採用作品6曲です。

### ロード画面
* PLAYボタンを押すと、楽曲情報の読み込みが始まります。
* 画面中央の表示が「Now Loading」から「START」に変わったら、ボタンを押して再生を開始してください。

### メロディパート
* 発声に合わせて歌詞が出現し、一文字ごとにカメラがイージング付きで追従します。
* 右向き文字や真反対に向いた文字など、4角度からランダムに出現します。
* 文字色は一定の区間ごとにランダムで決められています(最初の区間のみ白文字固定)。


### サビパート
* カメラが俯瞰モードになります。
* メロディパート同様の螺旋状の文字配置に加え、これまで発声された歌詞の上にサビの歌詞が一文字ずつ表示されます。
* サビの歌詞が表示されるたび、円状のパーティクルが出現します。


### 間奏パート
* 表示済みのランダムな歌詞にカメラ移動します。
* パーティクルがビートに合わせて鼓動します。

### エンディング
* 歌詞が徐々に消えていき、パーティクルだけが残ります。
* 楽曲名とアーティスト名が表示されます。

## インタラクション
再生中にユーザが介入できる要素は以下の2つです。
* 文字色の変更
* 背景色の変更

### 文字色の変更
* メロディパート・間奏パートで表示されている文字をクリックすると、ランダムな色に変更できます。
* 一定区間ごとに分けられた文字が全て同じ色になります(これから表示される文字含む)。

### 背景色の変更
* サビパート・エンディングで画面をクリックすると、ランダムな背景色に変更できます。
* 変更時のアニメーションは5パターンからランダムで選ばれます。
* 長押ししてから離すと、背景が黒色になります。
* 背景が黒色の状態でもう一度長押しして離すと、白色になります。