note="愉快的谈话胜似一切佳肴美馔。"
by="lzc的匿名提问箱"

import time
import json
from http.server import BaseHTTPRequestHandler

time_str=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
timezone=time.strftime('%z', time.localtime())
dic={"note":note , "by":by, "build_time":time_str , "timezone":timezone}

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        dic["path"]=self.path
        
        # 获取全部参数的键值组成字典query_dict
        result = parse.urlparse(urldata)
        query_dict = parse.parse_qs(result.query)
        
        #在dic中增加所有params
        dic["params"]=query_dict
        
        self.wfile.write(json.dumps(dic).encode())
        
        return
