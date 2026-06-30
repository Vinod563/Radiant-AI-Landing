from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(headless=True); pg=b.new_page()
    errs=[]; pg.on('console', lambda m: errs.append(m.type+': '+m.text) if m.type in ('error','warning') else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERROR: '+str(e)))
    pg.goto('http://localhost:4180/chat'); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(1500)
    print('has header:', pg.evaluate("!!document.querySelector('header')"))
    print('body len:', pg.evaluate("document.body.innerText.length"))
    for e in errs[:10]: print(e)
    b.close()
