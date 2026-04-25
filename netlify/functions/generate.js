exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, headers, body: '{"status":"ok"}' };
  }
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const payload = JSON.parse(event.body);
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    return { statusCode: res.status, headers, body: JSON.stringify(json) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: { message: e.message } }) };
  }
};
