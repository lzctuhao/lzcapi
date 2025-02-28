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

function getBeijingTime(format = 'full') {
  // 创建日期对象并配置时区参数
  const date = new Date();
  const options = {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,        // 强制使用24小时制
    fractionalSecondDigits: 3 // 包含毫秒（需要根据环境支持情况）
  };

  // 通过Intl API获取精确时区时间
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);
  
  // 解析时间组件
  const timeParts = parts.reduce((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = part.value;
    return acc;
  }, {});

  // 标准化输出格式
  const {
    year, month, day,
    hour, minute, second
  } = timeParts;

  // 处理不同格式需求
  switch(format) {
    case 'full':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    case 'date':
      return `${year}-${month}-${day}`;
    case 'time':
      return `${hour}:${minute}:${second}`;
    case 'iso':
      return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })).toISOString();
    case 'object':
      return {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        hour: parseInt(hour),
        minute: parseInt(minute),
        second: parseInt(second)
      };
    default:
      throw new Error('Unsupported format type');
  }
}

const handler = (req, res) => {
  const d = new Date()
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from lzc\'s Vercel (GET)',time:getBeijingTime()});
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(200).json({ message: `Hello, ${name}! (POST)`,time:getBeijingTime(),req:req});
  } else {
    res.status(405).json({ error: 'Method Not Allowed',time:getBeijingTime()});
  }
}

module.exports = allowCors(handler)
