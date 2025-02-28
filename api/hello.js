const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from lzc\'s Vercel (GET)',time:d.toString()});
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(200).json({ message: `Hello, ${name}! (POST)`,time:d.toString()});
  } else {
    res.status(405).json({ error: 'Method Not Allowed',time:d.toString()});
  }
}

module.exports = allowCors(handler)
