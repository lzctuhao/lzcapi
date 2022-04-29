from http.server import BaseHTTPRequestHandler

str="{'a':1}"

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(str.json())
        return
