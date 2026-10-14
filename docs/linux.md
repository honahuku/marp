# LinuxでMarpを実行する

Linux上でHTMLとPDFを生成する。PDF変換にはLinux側のChromium、日本語の表示にはNoto CJKを使う。ブラウザとフォントはディストリビューションの標準パッケージマネージャーで管理する。WSLでも同じ手順を使う。

## ブラウザとフォントを用意する

必要なものはChromium、Noto CJK、日本語PDFの確認用ツール。パッケージ名はディストリビューションによって異なる。Arch Linuxでは次のコマンドを使う。

```sh
sudo pacman -Syu --needed chromium noto-fonts-cjk poppler
```

Archの通常更新と合わせて導入する。古いパッケージ一覧のままではダウンロード先が404になることがある。popplerはPDFのページ数や日本語テキストを調べるためのツールで、生成だけなら不要。

## 作業用worktreeを作る

リポジトリは `/home/honahuku/git/honahuku/marp` に置く。PR #1の作業用worktreeは次のコマンドで作成する。

```sh
cd /home/honahuku/git/honahuku/marp
git fetch origin codex/marp-setup
git worktree add .worktree/marp-setup -b codex/marp-local origin/codex/marp-setup
cd .worktree/marp-setup
```

すでにworktreeがある場合は、最後の `cd` だけで移動する。PRをマージした後は、新しい資料用のブランチをmainから作る。

親repoの `git status` にworktreeを表示させないため、親repoの `.git/info/exclude` に `.worktree/` を追加する。この設定はそのローカルrepoだけに適用される。

## HTMLとPDFを生成する

Node.js 22以上とnpmをLinux側に用意して、worktreeのルートで実行する。

```sh
npm ci
npm run build
CHROME_PATH=/usr/bin/chromium npm run pdf
```

出力は `dist/template.html` と `dist/template.pdf`。画像は `dist/assets/` にコピーされる。`CHROME_PATH` はこのPDF生成コマンドだけに適用し、変換に使うLinux側のブラウザを指定する。ブラウザの場所は `command -v chromium` で調べ、異なる場合はそのパスを指定する。

日本語フォントとPDFの内容は次のコマンドで調べられる。

```sh
fc-match 'Noto Sans CJK JP'
pdfinfo dist/template.pdf
pdftotext dist/template.pdf -
```

サンプルは10ページ、16:9。PDFを開いて、構成図とコードの表示も確認する。

## プレビューする

```sh
npm run dev
```

ブラウザで `http://localhost:8080/template.md` を開く。WSLではWindows側のブラウザでプレビューを閲覧してもよい。終了するときはターミナルでCtrl+Cを押す。

## PDFを閲覧・配布する

`dist/template.pdf` をPDFビューアーで開く。別の場所へ渡す場合は、このPDFをコピーする。HTMLを配布する場合は画像を含むdist/全体を渡す。
