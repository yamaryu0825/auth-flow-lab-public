import React from 'react';

// デコードされたトークン情報を表示するコンポーネント
const TokenViewer = ({ decodedToken }) => {
  if (!decodedToken) {
    // デコード結果がまだない場合は何も表示しない
    return null;
  }

  return (
    <div style={{ marginTop: '2rem', background: '#f6f8fa', padding: '1rem', border: '1px solid #ccc' }}>
      <h3>デコードされたトークン情報</h3>

      {/* トークンヘッダーの表示 */}
      {decodedToken.header && (
        <div>
          <h4>ヘッダー</h4>
          <pre>{JSON.stringify(decodedToken.header, null, 2)}</pre>
        </div>
      )}

      {/* トークンペイロードの表示 */}
      {decodedToken.payload && (
        <div>
          <h4>ペイロード</h4>
          <pre>{JSON.stringify(decodedToken.payload, null, 2)}</pre>
        </div>
      )}

      {/* 署名の表示（あれば） */}
      {decodedToken.signature && (
        <div>
          <h4>署名</h4>
          <pre>{decodedToken.signature}</pre>
        </div>
      )}
    </div>
  );
};

export default TokenViewer;
