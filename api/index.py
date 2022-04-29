note="推心置腹的谈话就是心灵的展示。期待你的提问！"
by="lzc的匿名提问箱"

from http.server import BaseHTTPRequestHandler

str='{"note":"'+note+'" , "by":"'+by+'"}'

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(str.encode())
        return
