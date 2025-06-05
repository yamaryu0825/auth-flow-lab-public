const { app } = require('@azure/functions');

app.http('oauthCallback', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    context.log(`OAuth callback received. code: ${code}, state: ${state}`);

    return {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <html>
          <body>
            <h1>OAuth Callback Received</h1>
            <p><strong>Code:</strong> ${code}</p>
            <p><strong>State:</strong> ${state}</p>
          </body>
        </html>
      `
    };
  }
});
