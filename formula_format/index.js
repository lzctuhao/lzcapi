/*import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    const data = {
        msg: "hello world!"
    };
    res.status(200).json(data);
}*/

module.exports = (request, response) => {
    let who = 'anonymous';
   
    if (request.body && request.body.who) {
      who = request.body.who;
    } else if (request.query.who) {
      who = request.query.who;
    } else if (request.cookies.who) {
      who = request.cookies.who;
    }
    const data = {
        msg: "hello world!"
    };
    res.status(200).json(data);
    response.status(200).send(`Hello ${who}!`);
  };