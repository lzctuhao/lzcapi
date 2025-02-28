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
    case 'full':// 输出: "2024-03-21 15:45:30 (UTC+8)"（示例时间）
      return `${year}-${month}-${day} ${hour}:${minute}:${second} (UTC+8)`;
    case 'date':
      return `${year}-${month}-${day}`;
    case 'time':
      return `${hour}:${minute}:${second}`;
    case 'iso':// 输出: "2024-03-21T07:45:30.000Z"（对应的UTC时间）
      return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })).toISOString();
    case 'object':// 输出: { year:2024, month:03, day:21, hour:15, minute:45, second:30 }
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

module.exports = (req, res) => {

  /*设置标头 */
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
    res.status(200).end();
    return;
  }

  /*业务逻辑 */
  const ver="1.4.5";
  const time_string=getBeijingTime();
  const method=req.method;
  let name="";
  if (method==='GET') {
    name=(req.query&&req.query.name) ? req.query.name : "(your name please?) "; 
  } else if (method==='POST') {
    name=(req.body&&req.body.name) ? req.body.name : "(your name please?) ";
  }
  const note= (name=="(your name please?) ")?"Failed to get `name` parameter. For GET method, please add the parameter name to the URL, and for POST method, please add the name field in JSON format to the request body. \n `name`参数获取失败，GET方式请在URL中加入参数name，POST方式请在请求体中加入JSON格式的name字段。":"The `name` parameter was obtained successfully!";
  res.status(200).json({ message: `Hello ${name}! This is lzc\'s api powered by Vercel. HelloProgramVer: ${ver}`,method:method,time:time_string,version:`${ver}`,note: note});
};