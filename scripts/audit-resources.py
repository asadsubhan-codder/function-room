"""Check the current curriculum's link availability without downloading videos.

Run: python scripts/audit-resources.py
Results are written to ignored tmp/resource-audit.json. Availability and video
metadata are useful maintenance signals, not verification of teaching quality.
"""
import concurrent.futures
import json
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1]
units = json.loads((root / 'app/curriculum.json').read_text(encoding='utf-8'))
urls = set()
videos = set()
for unit in units:
    urls.update(r['url'] for r in unit['review'])
    for lesson in unit['lessons']:
        for key in ['practice', 'solutions', 'courseware']:
            urls.update(r['url'] for r in lesson[key])
        for v in lesson['videos']:
            if v['type'] == 'youtube':
                videos.add(v['id'])
            else:
                urls.add(v['url'])

def check(item):
    url, video = item
    try:
        request = urllib.request.Request(url, method='GET' if video else 'HEAD', headers={'User-Agent': 'FunctionRoomLinkCheck/1.0'})
        with urllib.request.urlopen(request, timeout=25) as response:
            result = {'status': response.status, 'url': response.url, 'type': response.headers.get_content_type()}
            if video:
                metadata = json.load(response)
                result.update(title=metadata['title'], provider=metadata['author_name'])
            return url, result
    except Exception as error:
        return url, {'error': str(error)}

items = [(url, False) for url in sorted(urls)] + [('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+id+'&format=json', True) for id in sorted(videos)]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    results = dict(executor.map(check, items))
(root / 'tmp').mkdir(exist_ok=True)
(root / 'tmp/resource-audit.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
failures = {url: result for url, result in results.items() if 'error' in result}
print(json.dumps({'checked': len(results), 'failures': failures}, indent=2))
