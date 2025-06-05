const { app } = require('@azure/functions');
const jwt = require('jsonwebtoken');

app.http('decodeToken', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const token = body?.token;

      if (!token) {
        return { status: 400, body: "No token provided" };
      }

      const decoded = jwt.decode(token, { complete: true });
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: decoded,
      };
    } catch (err) {
      return { status: 500, body: `Error: ${err.message}` };
    }
  }
});
