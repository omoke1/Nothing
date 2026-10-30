/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from 'react';
import { AWWWARDS_HTML, PAGES_DATA, SHELL_TOP_HTML } from './nothinPages';

declare global {
  interface Window {
    __nothinBootstrapped?: boolean;
    __nothinFetchPatched?: boolean;
    NothinChatConfigEndpoint?: string;
    NothinChat?: Record<string, unknown>;
    __update16VCSim?: (btn: HTMLElement) => void;
    __toggle16VCStudio?: (el: HTMLElement) => void;
    __filterSF26Cat?: (btn: HTMLElement) => void;
    __searchSF26?: (input: HTMLInputElement) => void;
  }
}

const CHAT_CONFIG_RESPONSE = {
  client_slug: 'nothin',
  agent_id: 'chat-web-16vc',
  endpoint: 'https://n8n.noth.in/webhook/chat-ia-v2',
  cta_url: 'https://tally.so/r/n9YAg5',
  cta_label: 'Submit Your Pitch',
  visible: true,
  theme: {
    launcherStyle: 'ask',
    askLabel: 'ASK 16VC',
    assets: {
      gum: '/assets/nothin/media/16vc-seal-launcher.svg',
      mark: '/assets/nothin/media/logo-16vc-mini-noir.svg',
    },
    title: '16VC ASSISTANT',
    subtitle: '',
    logoUrl: '/assets/nothin/media/logo-16vc-mini-noir.svg',
    welcomeMessage:
      'Welcome to 16VC. Ask us about our $100K–$2M pre-seed & seed investments, 16VC Studio ($500K co-building), the SF26 Fellowship, or how to pitch.',
    placeholder: 'Ask about cheque size, Studio, SF26, or pitching...',
    errorMessage: 'Reach us directly at info@16vc.co',
    rdvLabel: 'Submit Your Pitch',
    disclaimer: '16VC Assistant · 125 Kingsway, London WC2B 6NH',
    persistHistory: true,
    fonts: {
      cssUrl: '',
      heading: 'Ppneuemontreal, "PP Neue Montreal", sans-serif',
      body: 'Ppneuemontreal, "PP Neue Montreal", sans-serif',
    },
    colors: {
      primary: '#000000',
      userBubble: '#000000',
      assistantBubble: '#E3E1DE',
      link: '#000000',
    },
    triggers: {
      autoOpenDelayMs: null,
      scrollPercent: null,
      exitIntent: false,
    },
    ctas: [
      {
        url: 'https://tally.so/r/n9YAg5',
        label: 'Submit Your Pitch',
        match: ['tally', 'pitch'],
      },
      {
        url: 'https://tally.so/r/5BPNXd',
        label: 'Apply to SF26 Fellowship',
        match: ['fellowship', 'sf26'],
      },
      {
        url: 'mailto:info@16vc.co',
        label: 'Email info@16vc.co',
        match: ['email', 'info@16vc.co'],
      },
    ],
  },
};

function normalizeRoute(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return PAGES_DATA[cleaned] ? cleaned : '/';
}

function patchWindowFetch() {
  if (typeof window === 'undefined' || window.__nothinFetchPatched) return;
  window.__nothinFetchPatched = true;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const rawUrl =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    try {
      const parsed = new URL(rawUrl, window.location.origin);

      // 1. Intercept 16VC Chat Config endpoint
      if (parsed.href.includes('chat-config-v2')) {
        return new Response(JSON.stringify(CHAT_CONFIG_RESPONSE), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 2. Intercept 16VC Chat AI message webhook with 16VC-accurate response
      if (parsed.href.includes('chat-ia-v2')) {
        let userMsg = '';
        if (init?.body && typeof init.body === 'string') {
          try {
            userMsg = (JSON.parse(init.body).message || '').toLowerCase();
          } catch {
            userMsg = '';
          }
        }
        let reply =
          '16VC backs bold founders pushing the boundaries of enterprise software, AI & deep tech. We offer 01. Capital ($100K–$2M pre-seed & seed cheques), 02. Studio (hands-on co-building saving up to $500K), and 03. Fellowship (the SF26 Cohort of 41+ startups). Submit your pitch at https://tally.so/r/n9YAg5 or write to info@16vc.co.';
        if (
          userMsg.includes('check') ||
          userMsg.includes('cheque') ||
          userMsg.includes('invest') ||
          userMsg.includes('capital') ||
          userMsg.includes('seed') ||
          userMsg.includes('size') ||
          userMsg.includes('much')
        ) {
          reply =
            '16VC invests $100K to $2M per cheque at the pre-seed and seed stages across AI & Machine Learning, Enterprise Software, Deep Tech, FinTech, Web3, and Developer Tools. We invest via single-purpose (rolling) SPVs. Submit your pitch at https://tally.so/r/n9YAg5.';
        } else if (userMsg.includes('studio') || userMsg.includes('500k') || userMsg.includes('build')) {
          reply =
            '16VC Studio co-builds with founders from idea to launch—providing technical architecture, product strategy & design, go-to-market execution, and operational infrastructure that saves founders up to $500K in early burn.';
        } else if (
          userMsg.includes('fellowship') ||
          userMsg.includes('sf26') ||
          userMsg.includes('cohort') ||
          userMsg.includes('portfolio')
        ) {
          reply =
            'The 16VC Summer Fellowship (SF26 Cohort) backs 41+ breakout startups including Netaro, NetRanks AI, Dexter Copilot, Buildy, Ratio Global, Sinter Inc., and Kyra DB. Apply to the fellowship at https://tally.so/r/5BPNXd.';
        } else if (
          userMsg.includes('team') ||
          userMsg.includes('sridhar') ||
          userMsg.includes('partner') ||
          userMsg.includes('who') ||
          userMsg.includes('london')
        ) {
          reply =
            '16VC is led by Founder & General Partner Sridhar Arunagiri alongside Strategic & Technology Advisors Victor Gembala, Oliver Jones, and Luis Fernando de Andrade. Our headquarters are at 125 Kingsway, London WC2B 6NH, United Kingdom.';
        }
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 3. Intercept internal page navigations for Taxi.js
      if (parsed.origin === window.location.origin) {
        const routeKey = normalizeRoute(parsed.pathname);
        const isKnownRoute =
          parsed.pathname === '/' ||
          parsed.pathname === '' ||
          Boolean(PAGES_DATA[parsed.pathname.replace(/\/+$/, '')]);

        if (isKnownRoute) {
          const page = PAGES_DATA[routeKey] || PAGES_DATA['/'];
          const lang = routeKey === '/fr' ? 'fr' : 'en';
          const htmlDoc = `<!doctype html>
<html data-wf-domain="www.noth.in" data-wf-page="${page.wfPage}" data-wf-site="6a0c501c42b9751b78a9d1a7" lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${page.title}</title>
  <link rel="stylesheet" type="text/css" href="/assets/nothin/css/all-nothin.css" />
</head>
<body class="body">
  <div class="page-wrapper">
    <div data-taxi="" class="main-wrapper">
      ${page.viewHtml}
    </div>
  </div>
</body>
</html>`;
          const response = new Response(htmlDoc, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          });
          Object.defineProperty(response, 'url', {
            value: parsed.href,
            configurable: true,
          });
          return response;
        }
      }
    } catch {
      // Fall through to nativeFetch
    }

    return nativeFetch(input, init);
  };
}

patchWindowFetch();

function initAwwwardsRibbon() {
  const a = document.getElementById('awwwards');
  if (!a) return;
  const bg = a.querySelector('.js-color-bg');
  const tx = a.querySelector('.js-color-text');
  if (!bg || !tx) return;

  let dark: boolean | null = null;
  let away = false;
  let raf = 0;
  let back = 0;

  function lum(c: string): number | null {
    const m = c.match(/[\d.]+/g);
    if (!m || m.length < 3 || (m.length > 3 && +m[3] === 0)) return null;
    return 0.2126 * +m[0] + 0.7152 * +m[1] + 0.0722 * +m[2];
  }

  function under(r: { left: number; top: number; width: number; height: number }): number {
    const els = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    for (let i = 0; i < els.length; i++) {
      if (a!.contains(els[i])) continue;
      for (
        let e: Element | null = els[i];
        e && e !== document.documentElement;
        e = e.parentElement
      ) {
        const l = lum(getComputedStyle(e).backgroundColor);
        if (l !== null) return l;
      }
    }
    return 255;
  }

  function textNear(r: { left: number; top: number; right: number; bottom: number }): boolean {
    const m = 10;
    const box = { l: r.left - m, t: r.top - m, r: r.right + m, b: r.bottom + m };
    const seen: Element[] = [];
    for (let y = box.t; y <= box.b; y += (box.b - box.t) / 8) {
      for (let x = Math.max(0, box.l); x <= box.r; x += (box.r - Math.max(0, box.l)) / 3) {
        const els = document.elementsFromPoint(x, y);
        for (let i = 0; i < els.length; i++) {
          const e = els[i];
          if (a!.contains(e) || seen.indexOf(e) > -1) continue;
          seen.push(e);
          for (let n = e.firstChild; n; n = n.nextSibling) {
            if (n.nodeType !== 3 || !(n.nodeValue || '').trim()) continue;
            const g = document.createRange();
            g.selectNodeContents(n);
            const rs = g.getClientRects();
            for (let k = 0; k < rs.length; k++) {
              const q = rs[k];
              if (
                q.width &&
                q.right > box.l &&
                q.left < box.r &&
                q.bottom > box.t &&
                q.top < box.b
              ) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  function update() {
    raf = 0;
    if (!a) return;
    const w = a.offsetWidth;
    const h = a.offsetHeight;
    const top = (window.innerHeight - h) / 2;
    const r = { left: 0, right: w, top, bottom: top + h, width: w, height: h };
    const d = under(r) < 128;
    if (d !== dark) {
      dark = d;
      bg!.setAttribute('fill', d ? 'white' : 'black');
      tx!.setAttribute('fill', d ? 'black' : 'white');
    }
    if (textNear(r)) {
      window.clearTimeout(back);
      back = 0;
      if (!away) {
        away = true;
        a.classList.add('is-away');
      }
    } else if (away && !back) {
      back = window.setTimeout(() => {
        back = 0;
        away = false;
        a.classList.remove('is-away');
      }, 350);
    }
  }

  function queue() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('wheel', queue, { passive: true });
  window.addEventListener('touchmove', queue, { passive: true });
  window.addEventListener('resize', queue);
  window.setInterval(update, 200);
  update();
}

function initAskUsProximity() {
  let nw: HTMLElement | null = null;
  let away = false;
  let raf = 0;
  let back = 0;

  function px(v: string, d: number): number {
    const n = parseFloat(v);
    return Number.isNaN(n) ? d : n;
  }

  function hit(box: { l: number; r: number; t: number; b: number }): boolean {
    if (!nw) return false;
    const seen: Element[] = [];
    const dx = (box.r - box.l) / 3;
    const dy = (box.b - box.t) / 3;
    for (let y = box.t; y <= box.b + 0.5; y += dy) {
      for (let x = box.l; x <= box.r + 0.5; x += dx) {
        const els = document.elementsFromPoint(
          Math.min(x, window.innerWidth - 1),
          Math.min(y, window.innerHeight - 1)
        );
        for (let i = 0; i < els.length; i++) {
          const e = els[i];
          if (nw.contains(e) || seen.indexOf(e) > -1) continue;
          seen.push(e);
          const c = e.closest('a,button,[role=button],input,select,textarea');
          if (c && !nw.contains(c)) {
            const q = c.getBoundingClientRect();
            if (
              q.width &&
              q.height <= 120 &&
              q.right > box.l &&
              q.left < box.r &&
              q.bottom > box.t &&
              q.top < box.b
            ) {
              return true;
            }
          }
          for (let n = e.firstChild; n; n = n.nextSibling) {
            if (n.nodeType !== 3 || !(n.nodeValue || '').trim()) continue;
            const g = document.createRange();
            g.selectNodeContents(n);
            const rs = g.getClientRects();
            for (let k = 0; k < rs.length; k++) {
              const r = rs[k];
              if (
                r.width &&
                r.right > box.l &&
                r.left < box.r &&
                r.bottom > box.t &&
                r.top < box.b
              ) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  function update() {
    raf = 0;
    nw = nw && nw.isConnected ? nw : (document.querySelector('.nw') as HTMLElement | null);
    if (!nw) return;
    const st = getComputedStyle(nw);
    const m = 10;
    const size = px(st.getPropertyValue('--nw-size'), 64);
    const right = px(st.getPropertyValue('--nw-right'), 24);
    const bottom = px(st.getPropertyValue('--nw-bottom'), 24);
    const box = {
      l: window.innerWidth - right - size - m,
      r: window.innerWidth - right + m,
      t: window.innerHeight - bottom - size - m,
      b: window.innerHeight - bottom + m,
    };
    const idle = (nw.getAttribute('data-state') || 'idle') === 'idle';
    if (idle && hit(box)) {
      window.clearTimeout(back);
      back = 0;
      if (!away) {
        away = true;
        nw.classList.add('nw-away');
      }
    } else if (away && !back) {
      back = window.setTimeout(() => {
        back = 0;
        away = false;
        nw?.classList.remove('nw-away');
      }, 350);
    }
  }

  function queue() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('wheel', queue, { passive: true });
  window.addEventListener('touchmove', queue, { passive: true });
  window.addEventListener('resize', queue);
  window.setInterval(update, 200);
}

export default function App() {
  const initialPage = useMemo(() => {
    const route = normalizeRoute(window.location.pathname);
    return {
      route,
      data: PAGES_DATA[route] || PAGES_DATA['/'],
    };
  }, []);

  const fullMarkup = useMemo(() => {
    return `
      <style>
        @media (max-width:767px){
          #awwwards{display:none !important}
          .nw{--nw-size:52px !important;--nw-right:14px !important;--nw-bottom:14px !important}
          .nw-panel{max-width:calc(100vw - 24px) !important;max-height:calc(100dvh - 88px) !important;right:12px !important;bottom:74px !important}
        }
        #awwwards{transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
        #awwwards.is-away{opacity:0;transform:translate(-40%,-50%) !important;pointer-events:none}
        .nw{transition:opacity .5s cubic-bezier(.22,1,.36,1),translate .6s cubic-bezier(.22,1,.36,1)}
        .nw.nw-away[data-state=idle]{opacity:0;translate:40% 0;pointer-events:none}
        .nw img, .nw-gum{filter:grayscale(100%) contrast(1.15) !important;-webkit-filter:grayscale(100%) contrast(1.15) !important}
      </style>
      ${SHELL_TOP_HTML}
      <div class="page-wrapper">
        <div data-taxi="" class="main-wrapper">
          ${initialPage.data.viewHtml}
        </div>
      </div>
      ${AWWWARDS_HTML}
    `;
  }, [initialPage]);

  useEffect(() => {
    if (window.__nothinBootstrapped) return;
    window.__nothinBootstrapped = true;

    document.title = initialPage.data.title;
    document.documentElement.setAttribute('data-wf-page', initialPage.data.wfPage);
    document.documentElement.setAttribute('data-wf-site', '6a0c501c42b9751b78a9d1a7');
    document.documentElement.setAttribute('lang', initialPage.route === '/fr' ? 'fr' : 'en');

    // Skip the 6-second initial preloader unless ?loader=1 is explicitly requested
    if (!window.location.search.includes('loader=1')) {
      try {
        sessionStorage.setItem('nothin:loader-played', '1');
      } catch {
        // Ignore storage errors
      }
    } else {
      try {
        sessionStorage.removeItem('nothin:loader-played');
      } catch {
        // Ignore storage errors
      }
    }

    initAwwwardsRibbon();
    initAskUsProximity();

    // Universal resize-proof mobile drawer controller for <= 991px
    const closeMobileDrawer = () => {
      const wrapper = document.querySelector('.menu_wrapper') as HTMLElement | null;
      const btnText = document.querySelector('.menu-btn-text') as HTMLElement | null;
      if (wrapper) {
        wrapper.classList.remove('is-mobile-open');
        wrapper.style.display = 'none';
        wrapper.style.opacity = '0';
        wrapper.style.visibility = 'hidden';
      }
      if (btnText) {
        btnText.textContent = 'index';
      }
    };

    document.addEventListener(
      'click',
      (e: MouseEvent) => {
        if (!window.matchMedia('(max-width: 991px)').matches) return;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const menuBtn = target.closest('.menu-btn');
        if (menuBtn) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const wrapper = document.querySelector('.menu_wrapper') as HTMLElement | null;
          const btnText = document.querySelector('.menu-btn-text') as HTMLElement | null;
          if (!wrapper) return;
          const isOpen =
            wrapper.classList.contains('is-mobile-open') ||
            (wrapper.style.display === 'flex' && wrapper.style.opacity !== '0');
          if (isOpen) {
            closeMobileDrawer();
          } else {
            wrapper.classList.add('is-mobile-open');
            wrapper.style.display = 'flex';
            wrapper.style.opacity = '1';
            wrapper.style.visibility = 'visible';
            if (btnText) btnText.textContent = 'close';
          }
          return;
        }

        const drawerLink = target.closest('.menu_wrapper a, .nav-logo-wrap');
        if (drawerLink) {
          closeMobileDrawer();
        }
      },
      true
    );

    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        closeMobileDrawer();
      }
    });

    // Register 16VC Interactive Capital + Studio Simulator & SF26 Sector Filter handlers
    const recompute16VCSim = (root: ParentNode = document) => {
      const activeTier = root.querySelector('.vc-tier-btn.is-active') as HTMLElement | null;
      const studioToggle = root.querySelector('.vc-studio-toggle') as HTMLElement | null;
      const totalEl = root.querySelector('#vc-sim-total-val');
      const subEl = root.querySelector('#vc-sim-sub-val');
      const stageEl = root.querySelector('#vc-sim-stage');
      const runwayEl = root.querySelector('#vc-sim-runway');
      const badgeEl = root.querySelector('#vc-studio-badge');
      if (!activeTier || !totalEl) return;

      const cheque = Number(activeTier.getAttribute('data-cheque') || 500000);
      const stage = activeTier.getAttribute('data-stage') || 'Pre-Seed / Seed';
      const runway = activeTier.getAttribute('data-runway') || '22 Months';
      const studioActive = (studioToggle?.getAttribute('data-studio-active') || '1') === '1';
      const studioVal = studioActive ? 500000 : 0;
      const total = cheque + studioVal;

      totalEl.textContent = '$' + total.toLocaleString('en-US');
      if (subEl) {
        subEl.textContent = studioActive
          ? `$${cheque.toLocaleString('en-US')} Direct Capital + $500,000 Studio Co-Building Saved`
          : `$${cheque.toLocaleString('en-US')} Direct Capital Only (Toggle Studio to add $500K Co-Building)`;
      }
      if (stageEl) stageEl.textContent = stage;
      if (runwayEl) runwayEl.textContent = studioActive ? runway : runway.replace(/\d+/, m => String(Math.max(10, Number(m) - 6)));
      if (badgeEl) {
        badgeEl.textContent = studioActive ? '+$500K ACTIVE' : 'OFF (CLICK TO ADD)';
        (badgeEl as HTMLElement).style.background = studioActive ? '#ffffff' : 'transparent';
        (badgeEl as HTMLElement).style.color = studioActive ? '#000000' : '#ffffff';
        (badgeEl as HTMLElement).style.border = '1px solid #ffffff';
      }
    };

    window.__update16VCSim = (btn: HTMLElement) => {
      const sec = btn.closest('.vc-sim-section') || document;
      sec.querySelectorAll('.vc-tier-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      recompute16VCSim(sec);
    };

    window.__toggle16VCStudio = (el: HTMLElement) => {
      const sec = el.closest('.vc-sim-section') || document;
      const cur = el.getAttribute('data-studio-active') === '1';
      el.setAttribute('data-studio-active', cur ? '0' : '1');
      recompute16VCSim(sec);
    };

    const applySF26Filters = (sec: ParentNode) => {
      const activeCatBtn = sec.querySelector('.sf26-filter-btn.is-active') as HTMLElement | null;
      const searchInput = sec.querySelector('.sf26-search-bar') as HTMLInputElement | null;
      const cat = activeCatBtn?.getAttribute('data-cat') || 'all';
      const q = (searchInput?.value || '').toLowerCase().trim();
      sec.querySelectorAll('.sf26-card').forEach(card => {
        const el = card as HTMLElement;
        const cardCat = el.getAttribute('data-startup-cat') || '';
        const cardSearch = el.getAttribute('data-startup-search') || '';
        const matchCat = cat === 'all' || cardCat === cat;
        const matchQ = !q || cardSearch.includes(q);
        el.style.display = matchCat && matchQ ? 'flex' : 'none';
      });
    };

    window.__filterSF26Cat = (btn: HTMLElement) => {
      const sec = btn.closest('.sf26-directory-section') || document;
      sec.querySelectorAll('.sf26-filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applySF26Filters(sec);
    };

    window.__searchSF26 = (input: HTMLInputElement) => {
      const sec = input.closest('.sf26-directory-section') || document;
      applySF26Filters(sec);
    };

    let userMovedMouse = false;
    const onFirstUserMove = (e: MouseEvent) => {
      if (e.isTrusted) {
        userMovedMouse = true;
        window.removeEventListener('mousemove', onFirstUserMove);
      }
    };
    window.addEventListener('mousemove', onFirstUserMove, { passive: true });

    window.addEventListener('loader:hero-revealed', () => {
      window.setTimeout(() => {
        if (userMovedMouse) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Organic sweep matching the signature Nothin' hero fluid splat
        const points = [
          [0.04, 0.04],
          [0.08, 0.11],
          [0.14, 0.19],
          [0.18, 0.15],
          [0.12, 0.22],
          [0.24, 0.29],
          [0.28, 0.31],
          [0.46, 0.36],
          [0.43, 0.48],
          [0.40, 0.62],
          [0.38, 0.76],
          [0.54, 0.12],
          [0.68, 0.28],
          [0.72, 0.23],
        ];
        let step = 0;
        const totalSteps = 42;
        const timer = window.setInterval(() => {
          if (userMovedMouse || step >= totalSteps) {
            window.clearInterval(timer);
            return;
          }
          const t = step / (totalSteps - 1);
          const scaled = t * (points.length - 1);
          const idx = Math.min(Math.floor(scaled), points.length - 2);
          const frac = scaled - idx;
          const x = (points[idx][0] + (points[idx + 1][0] - points[idx][0]) * frac) * w;
          const y = (points[idx][1] + (points[idx + 1][1] - points[idx][1]) * frac) * h;
          window.dispatchEvent(
            new MouseEvent('mousemove', {
              clientX: x,
              clientY: y,
              bubbles: true,
            })
          );
          step++;
        }, 18);
      }, 450);
    });

    // Load helper scripts & main animation bundle
    const loadScript = (src: string, attrs: Record<string, string> = {}) => {
      const s = document.createElement('script');
      s.src = src;
      for (const [k, v] of Object.entries(attrs)) {
        s.setAttribute(k, v);
      }
      document.body.appendChild(s);
    };

    window.NothinChatConfigEndpoint = 'https://n8n.noth.in/webhook/chat-config-v2';
    loadScript('/assets/nothin/js/togglelangues.js');
    loadScript('/assets/nothin/js/chatfr.js');
    loadScript('/assets/nothin/js/widget-v3.js', { 'data-client': 'nothin' });
    loadScript('/assets/nothin/js/asklauncherlift.js');
    loadScript('/assets/nothin/js/main.js', { type: 'module' });
  }, [initialPage]);

  return <div dangerouslySetInnerHTML={{ __html: fullMarkup }} />;
}
