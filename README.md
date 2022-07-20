# Multicolored Lyrics

![スクリーンショット 2022-07-20 21 18 36](https://user-images.githubusercontent.com/10074877/179980507-f436a8ca-63c0-4534-ae3d-1d2eba671446.png)


## デモ

https://darling-fairy-c6cd27.netlify.app

## 概要
* TextAliveAppAPI + P5.jsを使ったリリックアプリです。
* 文字・背景・パーティクルのそれぞれの色が重なり合うことで生まれる、創造意欲かきたてるビジュアルをお楽しみください。

## 特徴
* 出現した歌詞は消えることなく表示され続けるため、進行するごとにキャンバスが言葉で埋め尽くされていきます。発声される言葉は一過性のものではなく、その一つ一つの意味こそが楽曲を作り上げている...というようなことを表現しています。
* 単語ごとにまとめて配置しつつ、なるべく文字を隙間なく敷き詰めるようなアルゴリズムを組んでいます。
* 歌詞の配置や角度はアプリ開始時にランダムに決定されるため、同じ楽曲でも毎回違うキャンバスになります。
* メロディパートでは次々と出現する歌詞に追従するためカメラ移動がめまぐるしい一方、サビパートでは俯瞰視点で固定することで演出に緩急をつけています。
* ユーザの手で文字色と背景色を変更できます。ポチポチ押してみて、画面全体の彩りを楽しんでください。
* 背景色を変更する際のアニメーションは、シンプルながら目に気持ち良いものを5パターン用意しました。

## 実行方法
### モジュールインストール
* Node.jsがインストールされている環境が必要です。
* 以下のコマンドで必要なモジュールのインストールをします。
<pre>
npm install
</pre>

### 開発サーバ起動
* 以下のコマンドでローカルサーバーが起動します。
<pre>
npm run dev
</pre>

### ビルド
* 以下のコマンドで<code>dist</code>ディレクトリ以下にビルド済みファイルが生成されます。
<pre>
npm run build
</pre>

## 画面遷移

* 楽曲選択
* ロード画面
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

![メロディ](https://user-images.githubusercontent.com/10074877/179974591-b3dd22c2-098a-4f77-8c75-df692cbf46c3.gif)

### サビパート
* カメラが俯瞰モードになります。
* メロディパート同様の螺旋状の文字配置に加え、これまで発声された歌詞の上にサビの歌詞が一文字ずつ表示されます。
* サビの歌詞が表示されるたび、円状のパーティクルが出現します。

![サビ2](https://user-images.githubusercontent.com/10074877/179977479-e6cad4ce-c884-4702-be81-128ada774fb6.gif)

### 間奏パート
* 表示済みのランダムな歌詞にカメラ移動します。
* パーティクルがビートに合わせて鼓動します。

![間奏](https://user-images.githubusercontent.com/10074877/179978146-63335f58-48f6-4bb2-bc34-a27b3e39ac3d.gif)

### エンディング
* 歌詞が徐々に消えていき、パーティクルだけが残ります。
* 楽曲名とアーティスト名が表示されます。

![ラスト](https://user-images.githubusercontent.com/10074877/179978648-aa84e0bf-e88e-4203-80cb-71f3d79c3bc3.gif)

## インタラクション
再生中にユーザが介入できる要素は以下の2つです。
* 文字色の変更
* 背景色の変更

### 文字色の変更
* メロディパート・間奏パートで表示されている文字をクリックすると、ランダムな色に変更できます。
* 一定区間ごとに分けられた文字が全て同じ色になります(これから表示される文字含む)。

![文字色](https://user-images.githubusercontent.com/10074877/179976745-bdf59bb1-9eb7-42d1-8b14-904228e7c798.gif)

### 背景色の変更
* サビパート・エンディングで画面をクリックすると、ランダムな背景色に変更できます。
* 変更時のアニメーションは5パターンからランダムで選ばれます。
* 長押ししてから離すと、背景が黒色になります。
* 背景が黒色の状態でもう一度長押しして離すと、白色になります。

![背景色](https://user-images.githubusercontent.com/10074877/179976954-5c568cf1-6584-42ca-b7ce-abe2e27ec9ab.gif)
