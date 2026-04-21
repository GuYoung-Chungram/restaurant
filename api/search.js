export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'API credentials not configured' });
  }

  const { action, query, display = 5, start = 1, sort = 'comment' } = req.query;

  if (!query) return res.status(400).json({ error: 'query required' });

  const headers = {
    'X-Naver-Client-Id': clientId,
    'X-Naver-Client-Secret': clientSecret,
  };

  if (action === 'image') {
    const url = `https://openapi.naver.com/v1/search/image.json?${new URLSearchParams({ query, display: 1, filter: 'large' })}`;
    const upstream = await fetch(url, { headers });
    const data = await upstream.json();
    return res.status(200).json(data);
  }

  const safeDisplay = Math.min(Math.max(parseInt(display), 1), 5);
  const safeStart = Math.min(Math.max(parseInt(start), 1), 1000);
  const safeSort = ['comment', 'random'].includes(sort) ? sort : 'comment';

  const url = `https://openapi.naver.com/v1/search/local.json?${new URLSearchParams({ query, display: safeDisplay, start: safeStart, sort: safeSort })}`;
  const upstream = await fetch(url, { headers });
  const data = await upstream.json();
  return res.status(200).json(data);
}
