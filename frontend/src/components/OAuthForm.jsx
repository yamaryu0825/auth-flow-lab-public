// ✅ OAuthForm.jsx
// 認可リクエストを現在の画面で遷移し、トークンは callback.html 側で一旦処理・表示する

import React, { useEffect, useState } from 'react';
import qs from 'qs';
// import TokenViewer from './TokenViewer';

const OAuthForm = () => {
  const [clientId, setClientId] = useState('24207b45-065e-494f-bf59-8477e6301d90');
  const [tenantId, setTenantId] = useState('MngEnvMCAP744495.onmicrosoft.com');
  // const [redirectUri, setRedirectUri] = useState('http://localhost:3000/callback.html');
  const [redirectUri, setRedirectUri] = useState('https://auth-lab-yamaryu-app.com/callback.html');
  const [scopes, setScopes] = useState('openid profile email');
  const [responseType, setResponseType] = useState('token');
  const [prompt, setPrompt] = useState('');
  const [codeChallenge, setCodeChallenge] = useState('');
  const [codeChallengeMethod, setCodeChallengeMethod] = useState('');
  const [loginHint, setLoginHint] = useState('');
  const [domainHint, setDomainHint] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  // const [decodedToken, setDecodedToken] = useState(null);

  // // トークン受信 & decodeToken API 呼び出し
  // useEffect(() => {
  //   const handler = async (event) => {
  //     if (event.origin !== window.location.origin) return;
  //     if (event.data?.token) {
  //       try {
  //         const res = await fetch('/api/decodeToken', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ token: event.data.token })
  //         });
  //         const json = await res.json();
  //         setDecodedToken(json);
  //       } catch (err) {
  //         console.error("\u30c7\u30b3\u30fc\u30c9\u5931\u6557:", err);
  //       }
  //     }
  //   };
  //   window.addEventListener('message', handler);
  //   return () => window.removeEventListener('message', handler);
  // }, []);

  // 認可リクエスト URL を構築し、同じ画面で遷移
  const buildAuthUrl = () => {
    const base = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`;
    const params = {
      client_id: clientId,
      response_type: responseType,
      redirect_uri: redirectUri,
      scope: scopes,
      prompt: prompt || undefined,
      code_challenge: codeChallenge || undefined,
      code_challenge_method: codeChallengeMethod || undefined,
      login_hint: loginHint || undefined,
      domain_hint: domainHint || undefined,
      response_mode: 'fragment'
    };
    const fullUrl = `${base}?${qs.stringify(params, { skipNulls: true })}`;
    window.location.href = fullUrl; // ⬅️ 新しいウィンドウではなく、同じ画面で遷移
  };

  return (
    <div>
      <h2>OAuth Authorization Request</h2>
      <div><label>Client ID:</label><input value={clientId} onChange={(e) => setClientId(e.target.value)} /></div>
      <div><label>Tenant ID:</label><input value={tenantId} onChange={(e) => setTenantId(e.target.value)} /></div>
      <div><label>Redirect URI:</label><input value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} /></div>
      <div><label>Scopes:</label><input value={scopes} onChange={(e) => setScopes(e.target.value)} /></div>
      <div><label>Response Type:</label><input value={responseType} onChange={(e) => setResponseType(e.target.value)} /></div>
      <div><label>Prompt:</label><input value={prompt} onChange={(e) => setPrompt(e.target.value)} /></div>
      <div><label>Code Challenge:</label><input value={codeChallenge} onChange={(e) => setCodeChallenge(e.target.value)} /></div>
      <div><label>Code Challenge Method:</label><input value={codeChallengeMethod} onChange={(e) => setCodeChallengeMethod(e.target.value)} /></div>
      <div><label>Login Hint:</label><input value={loginHint} onChange={(e) => setLoginHint(e.target.value)} /></div>
      <div><label>Domain Hint:</label><input value={domainHint} onChange={(e) => setDomainHint(e.target.value)} /></div>
      <button onClick={buildAuthUrl}>認可リクエストを送信</button>
      {authUrl && <p>送信URL: <code>{authUrl}</code></p>}

      {/* デコード結果の表示 */}
      {/* <TokenViewer token={decodedToken} /> */}
    </div>
  );
};

export default OAuthForm;