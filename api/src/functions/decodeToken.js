const { app } = require('@azure/functions');
const jwt = require('jsonwebtoken');

app.http('decodeToken', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      // リクエストボディから token を取得
      const body = await request.json();
      const token = body?.token;

      // トークンが存在しない場合はエラーを返す
      if (!token || typeof token !== 'string') {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'トークンが提供されていません。' }),
        };
      }

      // トークンを署名検証なしでデコード（Header と Payload を取得）
      const decoded = jwt.decode(token, { complete: true });

      // デコード失敗時の処理
      if (!decoded) {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'トークンのデコードに失敗しました。' }),
        };
      }

      // トークンの各部分（ヘッダー・ペイロード・署名）を明示的に返却
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          header: decoded.header,            // JWT の header（署名アルゴリズムなど）
          payload: decoded.payload,          // JWT の payload（クレーム情報）
          signature: token.split('.')[2] || '' // トークンの signature 部分（base64）
        }),
      };
    } catch (error) {
      // 想定外のエラー発生時のレスポンス
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `サーバーエラー: ${error.message}` }),
      };
    }
  }
});
