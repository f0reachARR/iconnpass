iconnpass
============

[Connpass](https://connpass.com) のイベント状況をGitHubでよく見かけるビルドステータスのバッジのように表示します

![iConnpass Status](https://iconnpass.5ch.pink/svg/test)

## How to use

イベントURL (例: `https://othlotech.connpass.com/event/80461/`)の数字部分(`80461`)を`https://iconnpass.5ch.pink/svg/`に繋げます。
`.svg`の拡張子を付けてもOK

表示例: 
[![iConnpass](https://iconnpass.5ch.pink/svg/80461.svg)](https://othlotech.connpass.com/event/80461/)

## How to run

1. `yarn`や`npm`で依存関係入れる
2. `tsc`コマンドでビルド
3. `config.yml`を書く
4. `node bin/app.js`

### config.yml

DBの設定、ポート番号を指定します

```yaml
db:
    database: iconnpass
    username: ''
    password: ''
    options:
        dialect: sqlite
        storage: './iconnpass.db'
port: 8080
```

`db.options`は[sequelize](http://docs.sequelizejs.com)コンストラクタの第四引数にそのまま渡されます。`dialect`などを指定してください。またそれに合うpackageを入れてください。

参考 http://docs.sequelizejs.com/manual/installation/usage.html#dialects
