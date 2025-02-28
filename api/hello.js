// api/hello.js
module.exports = (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Hello from Vercel (GET)' });
    } else if (req.method === 'POST') {
      const { name } = req.body;
      res.status(200).json({ message: `Hello, ${name}! (POST)` });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };