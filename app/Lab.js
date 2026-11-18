'use client';
import { useState, useEffect, useRef } from 'react';
const I = { en: 0, ar: 1, fr: 2 };
const T = {
  algo: ['Algorithms', 'الخوارزميات', 'Algorithmes'], sec: ['Security', 'الأمان', 'Sécurité'], back: ['Backend', 'الخلفية', 'Backend'], code: ['Code', 'الشيفرة', 'Code'],
  sort: ['Sorting', 'الفرز', 'Tri'], path: ['Pathfinding', 'إيجاد المسار', 'Chemin'], hash: ['Password hashing', 'تجزئة كلمات المرور', 'Hachage'], rate: ['Rate limiting', 'تحديد المعدل', 'Limitation de débit'],
  run: ['Run', 'تشغيل', 'Lancer'], pause: ['Pause', 'إيقاف', 'Pause'], shuffle: ['Shuffle', 'خلط', 'Mélanger'], size: ['Size', 'الحجم', 'Taille'], speed: ['Speed', 'السرعة', 'Vitesse'], alg: ['Algorithm', 'الخوارزمية', 'Algorithme'],
  cmp: ['Comparisons', 'المقارنات', 'Comparaisons'], wr: ['Writes', 'الكتابات', 'Écritures'], bench: ['Benchmark n = 5,000', 'قياس الأداء n = 5,000', 'Benchmark n = 5 000'],
  benchNote: ['Real timings measured on your device; every result is checked to be sorted.', 'أزمنة حقيقية تُقاس على جهازك، ويُتحقق من أن كل نتيجة مرتّبة.', 'Mesures réelles sur votre appareil ; chaque résultat est vérifié trié.'],
  drawBtn: ['✎ Draw', '✎ ارسم', '✎ Dessiner'], draw: ['Draw walls · drag the start and the end', 'ارسم حواجز · اسحب نقطتي البداية والنهاية', 'Dessinez des murs · déplacez départ et arrivée'], clear: ['Clear', 'مسح', 'Effacer'], maze: ['Random walls', 'حواجز عشوائية', 'Murs aléatoires'],
  visited: ['Visited cells', 'الخلايا المزارة', 'Cellules visitées'], len: ['Path length', 'طول المسار', 'Longueur du chemin'], comp: ['Compute time', 'زمن الحساب', 'Temps de calcul'], nopath: ['No path', 'لا يوجد مسار', 'Aucun chemin'],
  pw: ['Password', 'كلمة المرور', 'Mot de passe'], salt: ['Salt (random)', 'الملح (عشوائي)', 'Sel (aléatoire)'], iters: ['Iterations', 'عدد التكرارات', 'Itérations'], derive: ['Derive key', 'اشتقاق المفتاح', 'Dériver la clé'],
  took: ['Took', 'استغرق', 'Durée'], plain: ['Plain SHA-256 takes', 'SHA-256 العادية تستغرق', 'SHA-256 simple : '], times: ['× faster, which is exactly why it is wrong for passwords.', '× أسرع، ولهذا هي غير مناسبة لكلمات المرور.', '× plus rapide, donc inadaptée aux mots de passe.'],
  est: ['Time to try every password on this one device', 'زمن تجربة كل كلمات المرور على هذا الجهاز وحده', 'Temps pour tout essayer sur cet appareil seul'], pA: ['8 lowercase letters', '8 أحرف صغيرة', '8 minuscules'], pB: ['8 letters + digits', '8 أحرف وأرقام', '8 lettres + chiffres'], pC: ['12 letters + digits', '12 حرفاً ورقماً', '12 lettres + chiffres'],
  hashNote: ['PBKDF2 is used here; this site\'s admin uses bcrypt on the server. Attackers have faster hardware, so length matters too.', 'نستخدم PBKDF2 هنا؛ أما لوحة تحكم هذا الموقع فتستخدم bcrypt على الخادم. المهاجمون لديهم عتاد أسرع، لذا الطول مهم أيضاً.', 'PBKDF2 ici ; l\'admin de ce site utilise bcrypt côté serveur. Les attaquants ont du matériel plus rapide : la longueur compte aussi.'],
  lim: ['Limit', 'الحد', 'Limite'], win: ['Window (s)', 'النافذة (ثانية)', 'Fenêtre (s)'], send: ['Send request', 'أرسل طلباً', 'Envoyer'], auto: ['Auto 5/s', 'تلقائي 5/ث', 'Auto 5/s'], reset: ['Reset', 'إعادة', 'Réinit.'],
  ok: ['Accepted', 'مقبول', 'Accepté'], no: ['Blocked (429)', 'محجوب (429)', 'Bloqué (429)'], retry: ['Retry after', 'أعد المحاولة بعد', 'Réessayer dans'],
  sliding: ['Sliding window log', 'سجل النافذة المنزلقة', 'Fenêtre glissante'], fixed: ['Fixed window', 'النافذة الثابتة', 'Fenêtre fixe'], bucket: ['Token bucket', 'دلو الرموز', 'Seau à jetons'],
  rateNote: ['This site\'s login uses a sliding window: 5 attempts per 15 minutes per IP (compressed here so you can see it).', 'تسجيل الدخول في هذا الموقع يستخدم نافذة منزلقة: 5 محاولات كل 15 دقيقة لكل IP (مضغوطة هنا لتراها).', 'La connexion de ce site utilise une fenêtre glissante : 5 essais par 15 minutes et par IP (compressé ici).'],
  ping: ['Measure my API', 'قِس سرعة الـAPI', 'Mesurer mon API'], mn: ['min', 'الأدنى', 'min'], av: ['avg', 'المتوسط', 'moy'], md: ['median', 'الوسيط', 'médiane'], mx: ['max', 'الأقصى', 'max'], reg: ['Server region', 'منطقة الخادم', 'Région du serveur'],
  backNote: ['20 real requests to /api/ping on this site, timed in your browser.', '20 طلباً حقيقياً إلى /api/ping في هذا الموقع، تُقاس في متصفحك.', '20 vraies requêtes vers /api/ping sur ce site, chronométrées dans votre navigateur.'],
  codeNote: ['Simplified excerpts from this portfolio\'s own source code. Hover or tap a line.', 'مقتطفات مبسّطة من الشيفرة الفعلية لهذا الموقع. مرّر أو المس سطراً.', 'Extraits simplifiés du code source de ce portfolio. Survolez ou touchez une ligne.'],
};
const CODE = [
  { n: ['Login rate limit', 'تحديد محاولات الدخول', 'Limite de connexion'], l: [
    ["const since = new Date(Date.now() - 15 * 60e3)", ["Look back 15 minutes: a sliding window.", "ننظر 15 دقيقة للخلف: نافذة منزلقة.", "On regarde 15 minutes en arrière : fenêtre glissante."]],
    ["const { count } = await db.from('login_attempts')", null], ["  .eq('ip', ip).gte('at', since)", ["Count this IP's recent attempts in the database, so the limit survives serverless restarts.", "نعدّ محاولات هذا الـIP الأخيرة في قاعدة البيانات، فيبقى الحد قائماً حتى مع إعادة تشغيل الخادم.", "On compte les essais récents de cette IP en base : la limite survit aux redémarrages serverless."]],
    ["if (count >= 5) return { error: 'Too many attempts' }", ["Block before touching any password: no free guesses.", "نحجب قبل فحص أي كلمة مرور: لا تخمينات مجانية.", "On bloque avant tout test de mot de passe : pas d'essais gratuits."]],
    ["await db.from('login_attempts').insert({ ip })", ["Every attempt is recorded, right or wrong.", "كل محاولة تُسجَّل، صحيحة أو خاطئة.", "Chaque essai est enregistré, bon ou mauvais."]],
    ["if (!(await bcrypt.compare(password, hash))) return invalid", ["bcrypt is deliberately slow and uses a per-password salt.", "bcrypt بطيئة عمداً وتستخدم ملحاً خاصاً بكل كلمة مرور.", "bcrypt est volontairement lent et utilise un sel par mot de passe."]],
    ["await db.from('login_attempts').delete().eq('ip', ip)", ["A correct login clears the counter.", "الدخول الصحيح يصفّر العدّاد.", "Une connexion réussie remet le compteur à zéro."]]] },
  { n: ['Session cookie', 'ملف تعريف الجلسة', 'Cookie de session'], l: [
    ["const token = await new SignJWT({ u, mc })", ["A signed token (HS256) carries the username and a must-change-password flag.", "رمز موقّع (HS256) يحمل اسم المستخدم وعلامة وجوب تغيير كلمة المرور.", "Un jeton signé (HS256) porte le nom et l'indicateur de changement de mot de passe."]],
    ["  .setExpirationTime('8h').sign(key())", ["It expires after 8 hours.", "ينتهي بعد 8 ساعات.", "Il expire après 8 heures."]], ["cookies().set('sid', token, {", null],
    ["  httpOnly: true,", ["Page JavaScript cannot read it, which limits the damage of an XSS bug.", "لا تستطيع JavaScript في الصفحة قراءته، فيقلّ ضرر ثغرة XSS.", "Le JavaScript de la page ne peut pas le lire, ce qui limite les dégâts d'une faille XSS."]],
    ["  secure: true, sameSite: 'strict',", ["Sent only over HTTPS and never on cross-site requests, which blocks CSRF.", "يُرسل عبر HTTPS فقط وليس في الطلبات من مواقع أخرى، فيمنع CSRF.", "Envoyé en HTTPS seulement et jamais sur les requêtes inter-sites, ce qui bloque le CSRF."]], ["  maxAge: 28800 })", null]] },
  { n: ['Upload validation', 'التحقق من الملفات المرفوعة', 'Validation des fichiers'], l: [
    ["const buf = Buffer.from(await file.arrayBuffer())", null],
    ["const head = buf.subarray(0, 12)", ["Read the first bytes: the file's real signature, not its name.", "نقرأ أول البايتات: توقيع الملف الحقيقي لا اسمه.", "On lit les premiers octets : la vraie signature du fichier, pas son nom."]],
    ["const ext = isJpeg(head) ? 'jpg' : isPng(head) ? 'png'\n  : isWebp(head) ? 'webp' : null", ["Only three known signatures pass; a renamed .exe is rejected.", "تمرّ ثلاثة توقيعات معروفة فقط؛ وملف .exe بعد تغيير اسمه يُرفض.", "Seules trois signatures passent ; un .exe renommé est rejeté."]],
    ["if (!ext) return error(400)", null], ["const name = crypto.randomUUID() + '.' + ext", ["The stored name is random, never the visitor's file name, so no path tricks.", "الاسم المخزَّن عشوائي وليس اسم ملف الزائر، فلا حيل في المسارات.", "Le nom stocké est aléatoire, jamais celui du visiteur : pas d'astuces de chemin."]]] },
];
const hex = (u) => [...u].map((b) => b.toString(16).padStart(2, '0')).join('');
const fromHex = (s) => new Uint8Array(s.match(/../g).map((h) => parseInt(h, 16)));
const human = (s, lang) => { const u = lang === 'ar' ? ['ثانية', 'دقيقة', 'ساعة', 'يوماً', 'سنة'] : lang === 'fr' ? ['s', 'min', 'h', 'jours', 'ans'] : ['s', 'min', 'h', 'days', 'years']; if (s < 60) return s.toFixed(s < 10 ? 2 : 0) + ' ' + u[0]; if (s < 3600) return (s / 60).toFixed(0) + ' ' + u[1]; if (s < 86400) return (s / 3600).toFixed(0) + ' ' + u[2]; if (s < 31557600) return (s / 86400).toFixed(0) + ' ' + u[3]; const y = s / 31557600; return (y >= 1e6 ? y.toExponential(1) : Math.round(y).toLocaleString('en')) + ' ' + u[4]; };
/* ---------- sorting ---------- */
function* algos(name, a, s) {
  const C = (i, j) => { s.cmp++; s.hi = [i, j]; }, W = () => { s.wr++; };
  function* ms(l, r) { if (l >= r) return; const m = (l + r) >> 1; yield* ms(l, m); yield* ms(m + 1, r); const L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1); let i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) { C(l + i, m + 1 + j); yield; a[k++] = L[i] <= R[j] ? L[i++] : R[j++]; W(); s.hi = [k - 1]; yield; } while (i < L.length) { a[k++] = L[i++]; W(); s.hi = [k - 1]; yield; } while (j < R.length) { a[k++] = R[j++]; W(); s.hi = [k - 1]; yield; } }
  function* qs(lo, hi) { if (lo >= hi) return; const p = a[hi]; let i = lo; for (let j = lo; j < hi; j++) { C(j, hi); yield; if (a[j] < p) { [a[i], a[j]] = [a[j], a[i]]; W(); i++; yield; } } [a[i], a[hi]] = [a[hi], a[i]]; W(); yield; yield* qs(lo, i - 1); yield* qs(i + 1, hi); }
  function* sift(n, i) { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < n) { C(l, m); yield; if (a[l] > a[m]) m = l; } if (r < n) { C(r, m); yield; if (a[r] > a[m]) m = r; } if (m === i) return; [a[i], a[m]] = [a[m], a[i]]; W(); yield; i = m; } }
  if (name === 'bubble') { for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - i - 1; j++) { C(j, j + 1); yield; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; W(); yield; } } }
  else if (name === 'insertion') { for (let i = 1; i < a.length; i++) { let j = i; while (j > 0) { C(j - 1, j); yield; if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; W(); yield; j--; } else break; } } }
  else if (name === 'selection') { for (let i = 0; i < a.length - 1; i++) { let m = i; for (let j = i + 1; j < a.length; j++) { C(m, j); yield; if (a[j] < a[m]) m = j; } if (m !== i) { [a[i], a[m]] = [a[m], a[i]]; W(); yield; } } }
  else if (name === 'merge') yield* ms(0, a.length - 1); else if (name === 'quick') yield* qs(0, a.length - 1);
  else { for (let i = (a.length >> 1) - 1; i >= 0; i--) yield* sift(a.length, i); for (let e = a.length - 1; e > 0; e--) { [a[0], a[e]] = [a[e], a[0]]; W(); yield; yield* sift(e, 0); } }
}
const BIG = { bubble: 'O(n²)', insertion: 'O(n²)', selection: 'O(n²)', merge: 'O(n log n)', quick: 'O(n log n)', heap: 'O(n log n)' };
const PLAIN = {
  bubble: (a) => { for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - i - 1; j++) if (a[j] > a[j + 1]) { const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; } },
  insertion: (a) => { for (let i = 1; i < a.length; i++) { const v = a[i]; let j = i - 1; while (j >= 0 && a[j] > v) { a[j + 1] = a[j]; j--; } a[j + 1] = v; } },
  selection: (a) => { for (let i = 0; i < a.length - 1; i++) { let m = i; for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j; const t = a[i]; a[i] = a[m]; a[m] = t; } },
  merge: (a) => { const b = a.slice(), go = (l, r) => { if (r <= l) return; const m = (l + r) >> 1; go(l, m); go(m + 1, r); let i = l, j = m + 1, k = l; while (i <= m && j <= r) b[k++] = a[i] <= a[j] ? a[i++] : a[j++]; while (i <= m) b[k++] = a[i++]; while (j <= r) b[k++] = a[j++]; for (let x = l; x <= r; x++) a[x] = b[x]; }; go(0, a.length - 1); },
  quick: (a) => { const go = (lo, hi) => { while (lo < hi) { const p = a[hi]; let i = lo; for (let j = lo; j < hi; j++) if (a[j] < p) { const t = a[i]; a[i] = a[j]; a[j] = t; i++; } const t = a[i]; a[i] = a[hi]; a[hi] = t; if (i - lo < hi - i) { go(lo, i - 1); lo = i + 1; } else { go(i + 1, hi); hi = i - 1; } } }; go(0, a.length - 1); },
  heap: (a) => { const n0 = a.length, sift = (n, i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < n && a[l] > a[m]) m = l; if (r < n && a[r] > a[m]) m = r; if (m === i) return; const t = a[i]; a[i] = a[m]; a[m] = t; i = m; } }; for (let i = (n0 >> 1) - 1; i >= 0; i--) sift(n0, i); for (let e = n0 - 1; e > 0; e--) { const t = a[0]; a[0] = a[e]; a[e] = t; sift(e, 0); } },
};
function SortLab({ t }) {
  const cv = useRef(null), st = useRef({ a: [], it: null, hi: [], done: false, cmp: 0, wr: 0 }), [algo, setAlgo] = useState('quick'), [n, setN] = useState(48), [sp, setSp] = useState(6), [run, setRun] = useState(false), [stats, setStats] = useState({ cmp: 0, wr: 0 }), [bench, setBench] = useState(null);
  const draw = () => { const c = cv.current; if (!c) return; const r = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); if (c.width !== Math.round(r.width * d)) { c.width = Math.round(r.width * d); c.height = Math.round(r.height * d); } const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, r.width, r.height); const s = st.current, bw = r.width / s.a.length;
    s.a.forEach((v, i) => { const h = (v / 100) * (r.height - 6); x.fillStyle = s.done ? '#FFC800' : s.hi.includes(i) ? '#FFC800' : '#4f7bff'; x.fillRect(i * bw + 1, r.height - h, Math.max(1, bw - 2), h); }); };
  const shuffle = () => { const s = st.current; s.a = Array.from({ length: n }, () => 8 + Math.floor(Math.random() * 92)); s.it = null; s.hi = []; s.done = false; s.cmp = s.wr = 0; setStats({ cmp: 0, wr: 0 }); setRun(false); draw(); };
  useEffect(shuffle, [n, algo]); useEffect(() => { const f = () => draw(); addEventListener('resize', f); return () => removeEventListener('resize', f); }, []);
  useEffect(() => { if (!run) return; const s = st.current; if (s.done) { shuffle(); return; } if (!s.it) s.it = algos(algo, s.a, s); const per = [1, 1, 2, 3, 5, 8, 14, 24, 40, 70][sp - 1];
    const id = setInterval(() => { for (let k = 0; k < per; k++) { const r = s.it.next(); if (r.done) { s.done = true; s.hi = []; clearInterval(id); setRun(false); break; } } draw(); setStats({ cmp: s.cmp, wr: s.wr }); }, sp < 3 ? 70 : 16); return () => clearInterval(id); }, [run]);
  const doBench = () => { const base = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 1e6)), out = Object.keys(PLAIN).map((k) => { const a = base.slice(), t0 = performance.now(); PLAIN[k](a); const ms = performance.now() - t0; let ok = true; for (let i = 1; i < a.length; i++) if (a[i - 1] > a[i]) { ok = false; break; } return { k, ms, ok }; }); setBench(out); };
  const mxb = bench ? Math.max(...bench.map((b) => b.ms)) : 1;
  return <div><div className="lab-ctl"><label>{t('alg')}<select value={algo} onChange={(e) => setAlgo(e.target.value)}>{Object.keys(BIG).map((k) => <option key={k} value={k}>{k} · {BIG[k]}</option>)}</select></label>
    <label>{t('size')} {n}<input type="range" min="10" max="90" value={n} onChange={(e) => setN(+e.target.value)} /></label><label>{t('speed')}<input type="range" min="1" max="10" value={sp} onChange={(e) => setSp(+e.target.value)} /></label>
    <button className="lb p" onClick={() => setRun((r) => !r)}>{run ? t('pause') : t('run')}</button><button className="lb" onClick={shuffle}>{t('shuffle')}</button></div>
    <canvas ref={cv} className="lab-cv" aria-label="sorting visualisation" /><p className="lab-st"><span>{t('cmp')}: <b data-k="cmp">{stats.cmp}</b></span><span>{t('wr')}: <b>{stats.wr}</b></span><span>{BIG[algo]}</span></p>
    <button className="lb" onClick={doBench}>{t('bench')}</button>{bench && <div className="lab-bars">{bench.map((b) => <div key={b.k}><span>{b.k} {b.ok ? '✓' : '✗'}</span><i style={{ width: Math.max(2, (b.ms / mxb) * 100) + '%' }} /><b>{b.ms.toFixed(1)} ms</b></div>)}</div>}<p className="lab-n">{t('benchNote')}</p></div>;
}
/* ---------- pathfinding ---------- */
const GW = 30, GH = 14;
function solve(kind, walls, s, e) { const idx = (x, y) => y * GW + x, N = GW * GH, dist = new Array(N).fill(Infinity), prev = new Array(N).fill(-1), seen = new Uint8Array(N), order = [], h = (x, y) => Math.abs(x - e[0]) + Math.abs(y - e[1]);
  const open = [[0, s[0], s[1]]]; dist[idx(s[0], s[1])] = 0;
  while (open.length) { let bi = 0; for (let i = 1; i < open.length; i++) if (open[i][0] < open[bi][0]) bi = i; const [, x, y] = open.splice(bi, 1)[0], id = idx(x, y); if (seen[id]) continue; seen[id] = 1; order.push(id); if (x === e[0] && y === e[1]) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= GW || ny >= GH) continue; const nid = idx(nx, ny); if (walls[nid] || seen[nid]) continue; const nd = dist[id] + 1; if (nd < dist[nid]) { dist[nid] = nd; prev[nid] = id; open.push([kind === 'bfs' ? nd : kind === 'astar' ? nd + h(nx, ny) : h(nx, ny), nx, ny]); } } }
  const path = []; let c = idx(e[0], e[1]); if (seen[c]) while (c !== -1) { path.push(c); c = prev[c]; } return { order, path: path.reverse() }; }
function PathLab({ t }) {
  const cv = useRef(null), S = useRef({ walls: Uint8Array.from({ length: GW * GH }, (_, i) => { const x = i % GW, y = Math.floor(i / GW); return (x === 14 && y < 11) || (x === 19 && y > 2) ? 1 : 0; }), s: [3, 7], e: [26, 7], vis: 0, order: [], path: [], pshow: 0, solved: false, drag: null, mode: 1, raf: 0 }), [algo, setAlgo] = useState('astar'), [dm, setDm] = useState(false), [info, setInfo] = useState({ v: 0, l: 0, ms: 0, none: false });
  const draw = () => { const c = cv.current; if (!c) return; const r = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); if (c.width !== Math.round(r.width * d)) { c.width = Math.round(r.width * d); c.height = Math.round(r.height * d); } const x = c.getContext('2d'), cs = r.width / GW, s = S.current; x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, r.width, r.height);
    for (let i = 0; i < GW * GH; i++) { const cx = (i % GW) * cs, cy = Math.floor(i / GW) * cs; x.fillStyle = s.walls[i] ? '#c9d4ff' : '#101d58'; x.fillRect(cx + 0.5, cy + 0.5, cs - 1, cs - 1); }
    for (let k = 0; k < s.vis; k++) { const i = s.order[k]; x.fillStyle = '#1F4FD8'; x.fillRect((i % GW) * cs + 0.5, Math.floor(i / GW) * cs + 0.5, cs - 1, cs - 1); }
    for (let k = 0; k < s.pshow; k++) { const i = s.path[k]; x.fillStyle = '#FFC800'; x.fillRect((i % GW) * cs + 2, Math.floor(i / GW) * cs + 2, cs - 4, cs - 4); }
    x.fillStyle = '#4ade80'; x.fillRect(s.s[0] * cs + 1, s.s[1] * cs + 1, cs - 2, cs - 2); x.fillStyle = '#ff6b6b'; x.fillRect(s.e[0] * cs + 1, s.e[1] * cs + 1, cs - 2, cs - 2); };
  const compute = (animate) => { const s = S.current; cancelAnimationFrame(s.raf); const t0 = performance.now(), r = solve(algo, s.walls, s.s, s.e), ms = performance.now() - t0; s.order = r.order; s.path = r.path; s.solved = true; setInfo({ v: r.order.length, l: Math.max(0, r.path.length - 1), ms, none: !r.path.length });
    if (!animate) { s.vis = r.order.length; s.pshow = r.path.length; draw(); return; } s.vis = 0; s.pshow = 0; const t1 = performance.now(), vr = Math.max(100, s.order.length / 1.6) / 1000, pr = 0.04; const step = () => { const el = performance.now() - t1; s.vis = Math.min(s.order.length, Math.floor(el * vr)); const pt = el - s.order.length / vr; s.pshow = pt > 0 ? Math.min(s.path.length, Math.floor(pt * pr)) : 0; draw(); if (s.vis < s.order.length || s.pshow < s.path.length) s.raf = requestAnimationFrame(step); }; step(); };
  const clear = (keepWalls) => { const s = S.current; cancelAnimationFrame(s.raf); if (!keepWalls) s.walls = new Uint8Array(GW * GH); s.vis = s.pshow = 0; s.order = []; s.path = []; s.solved = false; setInfo({ v: 0, l: 0, ms: 0, none: false }); draw(); };
  const maze = () => { const s = S.current; s.walls = Uint8Array.from({ length: GW * GH }, () => (Math.random() < 0.28 ? 1 : 0)); s.walls[s.s[1] * GW + s.s[0]] = 0; s.walls[s.e[1] * GW + s.e[0]] = 0; clear(true); };
  const cell = (ev) => { const r = cv.current.getBoundingClientRect(), cs = r.width / GW; return [Math.min(GW - 1, Math.max(0, Math.floor((ev.clientX - r.left) / cs))), Math.min(GH - 1, Math.max(0, Math.floor((ev.clientY - r.top) / cs)))]; };
  const down = (ev) => { if (ev.pointerType === 'touch' && !dm) return; const s = S.current, [x, y] = cell(ev); cv.current.setPointerCapture(ev.pointerId); if (x === s.s[0] && y === s.s[1]) s.drag = 's'; else if (x === s.e[0] && y === s.e[1]) s.drag = 'e'; else { s.drag = 'w'; s.mode = s.walls[y * GW + x] ? 0 : 1; s.walls[y * GW + x] = s.mode; } after(); };
  const move = (ev) => { const s = S.current; if (!s.drag) return; const [x, y] = cell(ev), i = y * GW + x; if (s.drag === 's' && !s.walls[i] && !(x === s.e[0] && y === s.e[1])) s.s = [x, y]; else if (s.drag === 'e' && !s.walls[i] && !(x === s.s[0] && y === s.s[1])) s.e = [x, y]; else if (s.drag === 'w' && !(x === s.s[0] && y === s.s[1]) && !(x === s.e[0] && y === s.e[1])) s.walls[i] = s.mode; after(); };
  const after = () => { if (S.current.solved) compute(false); else draw(); };
  useEffect(() => { draw(); const f = () => draw(); addEventListener('resize', f); return () => { removeEventListener('resize', f); cancelAnimationFrame(S.current.raf); }; }, []); useEffect(() => { if (S.current.solved) compute(false); }, [algo]);
  return <div><div className="lab-ctl"><label>{t('alg')}<select value={algo} onChange={(e) => setAlgo(e.target.value)}><option value="astar">A* · {`O(E log V)`}</option><option value="bfs">BFS / Dijkstra</option><option value="greedy">Greedy best-first</option></select></label>
    <button className="lb p" onClick={() => compute(true)}>{t('run')}</button><button className={'lb touch-only' + (dm ? ' on' : '')} onClick={() => setDm((v) => !v)}>{t('drawBtn')}</button><button className="lb" onClick={maze}>{t('maze')}</button><button className="lb" onClick={() => clear(false)}>{t('clear')}</button></div>
    <canvas ref={cv} className="lab-cv grid" style={{ aspectRatio: GW / GH, touchAction: dm ? 'none' : 'pan-y' }} onPointerDown={down} onPointerMove={move} onPointerUp={() => { S.current.drag = null; }} aria-label="pathfinding grid" />
    <p className="lab-st"><span>{t('visited')}: <b data-k="vis">{info.v}</b></span><span>{t('len')}: <b data-k="len">{info.none ? t('nopath') : info.l}</b></span><span>{t('comp')}: <b>{info.ms.toFixed(2)} ms</b></span></p><p className="lab-n">{t('draw')}</p></div>;
}
/* ---------- password hashing ---------- */
function HashLab({ t, lang }) {
  const [pw, setPw] = useState('correct horse'), [it, setIt] = useState(100000), [salt, setSalt] = useState(''), [out, setOut] = useState(null), [busy, setBusy] = useState(false);
  const newSalt = () => setSalt(hex(crypto.getRandomValues(new Uint8Array(16)))); useEffect(newSalt, []);
  const derive = async () => { if (!salt) return; setBusy(true); const enc = new TextEncoder(), key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']); const t0 = performance.now(); const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(salt), iterations: it }, key, 256); const ms = performance.now() - t0;
    const data = enc.encode(pw), t1 = performance.now(); for (let i = 0; i < 300; i++) await crypto.subtle.digest('SHA-256', data); const fast = (performance.now() - t1) / 300; setOut({ h: hex(new Uint8Array(bits)), ms, fast }); setBusy(false); };
  const rows = [[t('pA'), 26 ** 8], [t('pB'), 62 ** 8], [t('pC'), 62 ** 12]];
  return <div><div className="lab-ctl"><label>{t('pw')}<input value={pw} onChange={(e) => setPw(e.target.value)} dir="ltr" maxLength={64} /></label><label>{t('iters')}<select value={it} onChange={(e) => setIt(+e.target.value)}>{[1000, 10000, 100000, 600000].map((v) => <option key={v} value={v}>{v.toLocaleString('en')}</option>)}</select></label>
    <button className="lb p" onClick={derive} disabled={busy}>{t('derive')}</button></div>
    <p className="lab-hex"><small>{t('salt')}</small> <code data-k="salt">{salt}</code> <button className="lb sm" onClick={newSalt} aria-label="new salt">↻</button></p>
    {out && <><p className="lab-hex"><code data-k="hash">{out.h}</code></p><p className="lab-st"><span>{t('took')}: <b data-k="ms">{out.ms.toFixed(1)} ms</b></span><span>{t('plain')} {out.fast.toFixed(3)} ms → {Math.max(1, Math.round(out.ms / Math.max(out.fast, 0.0005))).toLocaleString('en')}{t('times')}</span></p>
      <table className="lab-tb"><caption>{t('est')}</caption><tbody>{rows.map(([n, c]) => <tr key={n}><td>{n}</td><td dir="ltr">{human((c / 2) * (out.ms / 1000), lang)}</td></tr>)}</tbody></table></>}<p className="lab-n">{t('hashNote')}</p></div>;
}
/* ---------- rate limiting ---------- */
function RateLab({ t }) {
  const cv = useRef(null), S = useRef({ ev: [], log: [], fx: { s: 0, c: 0 }, tb: { v: 5, l: 0 }, retry: 0, raf: 0 }), [algo, setAlgo] = useState('sliding'), [L, setL] = useState(5), [Wn, setWn] = useState(10), [auto, setAuto] = useState(false), [cnt, setCnt] = useState({ ok: 0, no: 0, retry: 0 });
  const reset = () => { const s = S.current; s.ev = []; s.log = []; s.fx = { s: 0, c: 0 }; s.tb = { v: L, l: 0 }; s.retry = 0; setCnt({ ok: 0, no: 0, retry: 0 }); }; useEffect(reset, [algo, L, Wn]);
  const send = () => { const s = S.current, now = performance.now() / 1000; let ok = false, retry = 0;
    if (algo === 'sliding') { s.log = s.log.filter((x) => x > now - Wn); if (s.log.length < L) { s.log.push(now); ok = true; } else retry = s.log[0] + Wn - now; }
    else if (algo === 'fixed') { if (now - s.fx.s >= Wn) s.fx = { s: now, c: 0 }; if (s.fx.c < L) { s.fx.c++; ok = true; } else retry = s.fx.s + Wn - now; }
    else { const rate = L / Wn; s.tb.v = Math.min(L, s.tb.v + (s.tb.l ? (now - s.tb.l) * rate : 0)); s.tb.l = now; if (s.tb.v >= 1) { s.tb.v--; ok = true; } else retry = (1 - s.tb.v) / rate; }
    s.ev.push({ t: now, ok }); s.ev = s.ev.filter((x) => x.t > now - 40); s.retry = ok ? 0 : retry; setCnt((c) => ({ ok: c.ok + (ok ? 1 : 0), no: c.no + (ok ? 0 : 1), retry: ok ? 0 : retry })); };
  useEffect(() => { if (!auto) return; const id = setInterval(send, 200); return () => clearInterval(id); }, [auto, algo, L, Wn]);
  useEffect(() => { const loop = () => { const c = cv.current; if (c) { const r = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); if (c.width !== Math.round(r.width * d)) { c.width = Math.round(r.width * d); c.height = Math.round(r.height * d); } const x = c.getContext('2d'), now = performance.now() / 1000, span = 30; x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, r.width, r.height);
    const X = (tt) => r.width - ((now - tt) / span) * r.width; if (algo === 'sliding') { x.fillStyle = '#ffc80022'; x.fillRect(X(now - Wn), 0, r.width - X(now - Wn), r.height); x.strokeStyle = '#FFC800'; x.strokeRect(X(now - Wn), 1, r.width - X(now - Wn) - 1, r.height - 2); }
    x.strokeStyle = '#ffffff22'; for (let k = 0; k <= 6; k++) { x.beginPath(); x.moveTo((k * r.width) / 6, 0); x.lineTo((k * r.width) / 6, r.height); x.stroke(); }
    S.current.ev.forEach((e, i) => { x.fillStyle = e.ok ? '#4ade80' : '#ff6b6b'; x.beginPath(); x.arc(X(e.t), r.height / 2 + ((i % 3) - 1) * 18, 6, 0, 7); x.fill(); }); } S.current.raf = requestAnimationFrame(loop); }; loop(); return () => cancelAnimationFrame(S.current.raf); }, [algo, Wn]);
  return <div><div className="lab-ctl"><label>{t('alg')}<select value={algo} onChange={(e) => setAlgo(e.target.value)}><option value="sliding">{t('sliding')}</option><option value="fixed">{t('fixed')}</option><option value="bucket">{t('bucket')}</option></select></label>
    <label>{t('lim')} {L}<input type="range" min="2" max="12" value={L} onChange={(e) => setL(+e.target.value)} /></label><label>{t('win')} {Wn}<input type="range" min="4" max="20" value={Wn} onChange={(e) => setWn(+e.target.value)} /></label>
    <button className="lb p" onClick={send}>{t('send')}</button><button className={'lb' + (auto ? ' on' : '')} onClick={() => setAuto((a) => !a)}>{t('auto')}</button><button className="lb" onClick={reset}>{t('reset')}</button></div>
    <canvas ref={cv} className="lab-cv short" aria-label="rate limit timeline" /><p className="lab-st"><span className="g">{t('ok')}: <b data-k="ok">{cnt.ok}</b></span><span className="r">{t('no')}: <b data-k="no">{cnt.no}</b></span>{cnt.retry > 0 && <span>{t('retry')}: {cnt.retry.toFixed(1)} s</span>}</p><p className="lab-n">{t('rateNote')}</p></div>;
}
/* ---------- backend latency ---------- */
function BackLab({ t }) {
  const cv = useRef(null), [r, setR] = useState([]), [busy, setBusy] = useState(false), [reg, setReg] = useState('');
  const run = async () => { setBusy(true); const rs = []; for (let i = 0; i < 20; i++) { const t0 = performance.now(); const j = await fetch('/api/ping?i=' + i, { cache: 'no-store' }).then((x) => x.json()).catch(() => null); rs.push(performance.now() - t0); if (j?.region) setReg(j.region); setR([...rs]); await new Promise((o) => setTimeout(o, 100)); } setBusy(false); };
  useEffect(() => { const c = cv.current; if (!c) return; const b = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); c.width = Math.round(b.width * d); c.height = Math.round(b.height * d); const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, b.width, b.height); if (!r.length) return; const mx = Math.max(...r) * 1.15;
    x.strokeStyle = '#FFC800'; x.lineWidth = 2; x.beginPath(); r.forEach((v, i) => { const px = (i / 19) * (b.width - 12) + 6, py = b.height - 8 - (v / mx) * (b.height - 16); i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.stroke(); x.fillStyle = '#FFC800'; r.forEach((v, i) => { const px = (i / 19) * (b.width - 12) + 6, py = b.height - 8 - (v / mx) * (b.height - 16); x.beginPath(); x.arc(px, py, 3.5, 0, 7); x.fill(); }); }, [r]);
  const s = [...r].sort((a, b) => a - b), q = (p) => (s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0);
  return <div><div className="lab-ctl"><button className="lb p" onClick={run} disabled={busy}>{t('ping')}</button></div><canvas ref={cv} className="lab-cv short" aria-label="latency chart" />
    {r.length > 0 && <p className="lab-st"><span>{t('mn')}: <b>{s[0].toFixed(0)} ms</b></span><span>{t('av')}: <b data-k="avg">{(r.reduce((a, b) => a + b, 0) / r.length).toFixed(0)} ms</b></span><span>{t('md')}: <b>{q(0.5).toFixed(0)} ms</b></span><span>p95: <b>{q(0.95).toFixed(0)} ms</b></span><span>{t('mx')}: <b>{s[s.length - 1].toFixed(0)} ms</b></span>{reg && <span>{t('reg')}: <b>{reg}</b></span>}</p>}<p className="lab-n">{t('backNote')}</p></div>;
}
/* ---------- code walkthrough ---------- */
function CodeLab({ t, lang }) {
  const [sn, setSn] = useState(0), [ln, setLn] = useState(null), S = CODE[sn], note = ln != null && S.l[ln][1] ? S.l[ln][1][I[lang]] : null;
  return <div><div className="lab-sub">{CODE.map((c, k) => <button key={k} aria-pressed={k === sn} onClick={() => { setSn(k); setLn(null); }}>{c.n[I[lang]]}</button>)}</div>
    <div className="lab-code" dir="ltr"><pre>{S.l.map(([code, nt], k) => <div key={k} className={'cl' + (nt ? ' has' : '') + (ln === k ? ' sel' : '')} onMouseEnter={() => nt && setLn(k)} onClick={() => nt && setLn(k)}><i>{k + 1}</i><code>{code}</code></div>)}</pre>
      <div className="lab-note" dir={lang === 'ar' ? 'rtl' : 'ltr'}>{note || <span className="dim">{t('codeNote')}</span>}</div></div></div>;
}
export default function Lab({ lang }) {
  const t = (k) => T[k][I[lang] ?? 0], [tab, setTab] = useState('algo'), [sub, setSub] = useState({ algo: 'sort', sec: 'hash' });
  const tabs = ['algo', 'sec', 'back', 'code'], subs = { algo: ['sort', 'path'], sec: ['hash', 'rate'] };
  return <div className="lab"><div className="lab-tabs" role="tablist">{tabs.map((k) => <button key={k} role="tab" aria-pressed={tab === k} onClick={() => setTab(k)}>{t(k)}</button>)}</div>
    <div className="lab-box">{subs[tab] && <div className="lab-sub">{subs[tab].map((k) => <button key={k} aria-pressed={sub[tab] === k} onClick={() => setSub({ ...sub, [tab]: k })}>{t(k)}</button>)}</div>}
      {tab === 'algo' && (sub.algo === 'sort' ? <SortLab t={t} /> : <PathLab t={t} />)}{tab === 'sec' && (sub.sec === 'hash' ? <HashLab t={t} lang={lang} /> : <RateLab t={t} />)}{tab === 'back' && <BackLab t={t} />}{tab === 'code' && <CodeLab t={t} lang={lang} />}</div></div>;
}
