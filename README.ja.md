# @openreachtech/furo-nuxt

`furo-nuxt` は [furo](https://github.com/openreachtech/furo) を Nuxt アプリケーションで利用するためのライブラリです。

For the English version, see [README.md](./README.md).

## コンセプト

`furo` 自体は純粋な JavaScript で書かれているため、`furo` の機能はそのまま Nuxt アプリケーションで動作します。

`furo-nuxt` はその上に、Nuxt および Vue 固有の層を追加します。

- `furo` のクライアント（GraphQL・RESTful API・サブスクリプション）を Vue の ref に結び付けるコンポーザブル。
- コンポーネントのロジックを `<template>` と `setup()` から切り離すコンテキストクラス群。
- 環境変数を読み込み、Nuxt アプリ全体で共有するためのツール。

`furo-nuxt` が与えるのは **ロジックの書き方の基底** です。コンポーネントとスタイルシートは意図的に一切同梱していません。
マークアップとデザインは、このパッケージではなくアプリケーション側のものです。

## インストール

Node.js 20.x が必要です（CI がビルド対象とするバージョン）。

```sh
npm install @openreachtech/furo-nuxt
```

ES モジュール（`"type": "module"`）です。ESM の `import` 構文でインポートしてください。

## 機能一覧

### (1) GraphQL クライアント

[GraphQL クライアント の使い方](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/graphql-client.ja.md)

### (2) フォーム要素クラーク

[フォーム要素クラーク の使い方](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/form-clerk.ja.md)

### (3) RESTful API クライアント

[RESTful API クライアント の使い方](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/restful-api-client.ja.md)

### (4) コンポーネントコンテキスト

[コンポーネントコンテキスト の使い方](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/component-context.ja.md)

### (5) アプリケーションのセットアップ

[アプリケーションのセットアップ の使い方](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/app-setup.ja.md)

## API

[API リファレンス](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/api/index.ja.md)

## コントリビューション

バグ報告・機能要望・コード貢献を歓迎します。

GitHub Issues からお気軽にご連絡ください。

```sh
git clone https://github.com/openreachtech/furo-nuxt.git
cd furo-nuxt
npm install
npm run lint
npm test
```

## ライセンス

本プロジェクトは Apache License 2.0 で公開されています。

詳細は [LICENSE ファイル](./LICENSE) を参照してください。

## 開発者

[Open Reach Tech Inc.](https://openreach.tech)

## 著作権

© 2025 Open Reach Tech Inc.
