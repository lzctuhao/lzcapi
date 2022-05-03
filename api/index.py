note="愉快的谈话胜似一切佳肴美馔。"
by="lzc的匿名提问箱"

import time
from http.server import BaseHTTPRequestHandler

time_str=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
str='{"note":"'+note+'" , "by":"'+by+'","time":"'+time_str+'"}'

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(str.encode())
        return
