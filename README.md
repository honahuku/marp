# marp

外部登壇用のMarp資料をまとめるリポジトリ。白背景と青緑のテーマで、静的な図とコードを中心に説明する。

## はじめる

Node.js 22以上とnpmを用意して、リポジトリのルートで実行する。

```sh
npm ci
npm run dev
```

ターミナルに表示されたURLをブラウザで開き、template.mdを選ぶ。slides/template.mdを編集するとプレビューに反映される。

VS Codeでは推奨拡張のMarp for VS Codeをインストールすると、エディタ内でプレビューできる。CLIにはmarp.config.mjs、拡張には.vscode/settings.jsonで同じテーマを登録している。

Linuxでブラウザと日本語フォントを用意する手順は[Linuxでの実行](docs/linux.md)にまとめている。

## 登壇資料を追加する

色、文字、図の選び方は[スライド制作のポイント](docs/slides.md)にまとめている。


slides/template.mdを複製して、slides/2026-xx-xx-event.mdなどの名前にする。タイトル、イベント名、日付、フッターと本文を差し替える。

図はslides/assets/に置き、Markdownから相対パスで参照する。

```md
![width:1000 図の説明](assets/topology.svg)
```

新しい図にも内容が伝わる代替テキストを付ける。図はSVGまたはPNGを使う。

## HTMLとPDFを出力する

```sh
npm run build
npm run pdf
```

slides/内のMarkdownをまとめてdist/に出力する。template.mdはtemplate.htmlとtemplate.pdfになる。HTMLと一緒に配布する画像もdist/assets/にコピーするので、HTMLを渡すときはdist/全体を渡す。

PDF変換にはChrome、Edge、Firefoxのいずれかが必要。[Marp CLIの変換要件](https://github.com/marp-team/marp-cli#basic-usage)を参照。日本語フォントはNoto Sans CJK JP、Noto Sans JP、游ゴシック、メイリオの順に使う。LinuxではNoto CJKをインストールする。

PDFコマンドは手元の図を読み込むためにローカルファイルアクセスを有効にする。自分で管理するMarkdownと画像を対象に実行する。

GitHub ActionsでもHTMLとPDFを生成する。実行結果のslidesアーティファクトに出力一式を保存する。

## ページの型

ページ区切りは `---`。そのページだけ型を変えるには `<!-- _class: cover -->` のように指定する。

| クラス | 用途 |
| --- | --- |
| cover | 表紙 |
| section | 章扉 |
| statement | 一番伝えたい結論 |
| figure | 大きな図とキャプション |
| references | 参考資料・補足 |

通常の本文、コード、比較表にはクラス指定は不要。表紙には `<!-- _paginate: false -->` を指定してページ番号を隠す。

配色やフォント、余白はthemes/honahuku.cssで変更する。各ページの設定はMarkdownの先頭にあるfrontmatterで変更する。

## 公開前に確認する

HTMLを開いて、長い日本語タイトル、コード、表がページ内に収まっているか確認する。PDFでも日本語、図、リンクを確認する。サンプルの自己紹介、日付、図、比較表は登壇内容に差し替える。
