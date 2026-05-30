const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevOps Infrastructure — Sistemas Operativos II</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Raleway:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --gold: #c9a84c;
      --gold-light: #f0d080;
      --gold-dim: #6b5a2a;
      --bug-teal: #4ecdc4;
      --bug-pink: #ff6b9d;
      --bug-purple: #a855f7;
      --dark: #050508;
      --dark2: #0a0a10;
      --dark3: #0f0f18;
      --panel: rgba(12,12,20,0.85);
      --border: rgba(201,168,76,0.25);
      --text: #d4c9a8;
      --text-dim: #7a7060;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Raleway', sans-serif;
      background: var(--dark);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
      cursor: crosshair;
    }

    /* STARFIELD */
    #stars {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    /* SILK THREADS */
    .silk-bg {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(ellipse at 15% 50%, rgba(168,85,247,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 85% 30%, rgba(78,205,196,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 90%, rgba(201,168,76,0.04) 0%, transparent 50%);
    }

    /* CRAWL INTRO */
    .crawl-wrapper {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: #000;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: crawl-fade 0.5s ease 4s forwards;
    }
    @keyframes crawl-fade {
      to { opacity: 0; pointer-events: none; }
    }
    .crawl-pre {
      color: var(--bug-teal);
      font-family: 'Cinzel', serif;
      font-size: clamp(12px, 2vw, 18px);
      letter-spacing: 8px;
      text-transform: uppercase;
      animation: blink-pre 1s ease 1s forwards;
      opacity: 0;
    }
    @keyframes blink-pre {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
    .crawl-title {
      color: var(--gold);
      font-family: 'Cinzel', serif;
      font-size: clamp(28px, 6vw, 72px);
      font-weight: 900;
      letter-spacing: 4px;
      text-align: center;
      margin-top: 20px;
      opacity: 0;
      animation: title-appear 1.5s ease 1.8s forwards;
      text-shadow: 0 0 60px rgba(201,168,76,0.6);
    }
    @keyframes title-appear {
      to { opacity: 1; }
    }

    /* MAIN CONTENT */
    .main {
      position: relative;
      z-index: 1;
      max-width: 1100px;
      margin: 0 auto;
      padding: 60px 24px 80px;
      opacity: 0;
      animation: main-appear 1s ease 4.5s forwards;
    }
    @keyframes main-appear {
      to { opacity: 1; }
    }

    /* HEADER */
    .header {
      text-align: center;
      margin-bottom: 60px;
      position: relative;
    }
    .header::before, .header::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }
    .header::before { top: -20px; width: 300px; }
    .header::after { bottom: -20px; width: 200px; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(78,205,196,0.1);
      border: 1px solid rgba(78,205,196,0.3);
      color: var(--bug-teal);
      padding: 6px 18px;
      border-radius: 2px;
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 24px;
      font-family: 'Raleway', sans-serif;
    }
    .badge-dot {
      width: 6px; height: 6px;
      background: var(--bug-teal);
      border-radius: 50%;
      animation: pulse-dot 2s ease infinite;
      box-shadow: 0 0 8px var(--bug-teal);
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }

    .title {
      font-family: 'Cinzel', serif;
      font-size: clamp(28px, 5vw, 56px);
      font-weight: 900;
      color: var(--gold);
      letter-spacing: 3px;
      line-height: 1.1;
      text-shadow: 0 0 40px rgba(201,168,76,0.3);
      margin-bottom: 12px;
    }
    .subtitle {
      font-size: 14px;
      color: var(--text-dim);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .student {
      font-size: 13px;
      color: var(--bug-pink);
      letter-spacing: 2px;
    }

    /* RUNE DIVIDER */
    .rune-div {
      text-align: center;
      color: var(--gold-dim);
      font-size: 18px;
      letter-spacing: 12px;
      margin: 40px 0;
      opacity: 0.6;
    }

    /* STATS GRID */
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 24px 20px;
      text-align: center;
      position: relative;
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
      transition: border-color 0.3s, transform 0.3s;
    }
    .stat-card:hover {
      border-color: rgba(201,168,76,0.5);
      transform: translateY(-3px);
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .stat-card:hover::before { opacity: 1; }

    .stat-icon { font-size: 24px; margin-bottom: 10px; filter: drop-shadow(0 0 8px currentColor); }
    .stat-label {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 8px;
    }
    .stat-val {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 600;
      color: var(--gold-light);
    }

    /* SERVICES */
    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 28px 32px;
      margin-bottom: 20px;
      position: relative;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    }
    .panel-title {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .panel-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--gold-dim), transparent);
    }

    .service-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid rgba(201,168,76,0.08);
      transition: padding-left 0.2s;
    }
    .service-row:last-child { border-bottom: none; }
    .service-row:hover { padding-left: 8px; }

    .service-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .insect-icon { font-size: 16px; }
    .service-name {
      font-size: 14px;
      color: var(--text);
      font-weight: 600;
    }
    .service-detail {
      font-size: 12px;
      color: var(--text-dim);
      letter-spacing: 1px;
    }
    .service-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--bug-teal);
      letter-spacing: 1px;
    }
    .status-gem {
      width: 8px; height: 8px;
      background: var(--bug-teal);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation: gem-pulse 3s ease infinite;
      box-shadow: 0 0 10px var(--bug-teal);
    }
    @keyframes gem-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* TECH TAGS */
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .tag {
      padding: 6px 16px;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      border: 1px solid;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: all 0.2s;
    }
    .tag:nth-child(3n+1) { border-color: rgba(201,168,76,0.4); color: var(--gold); background: rgba(201,168,76,0.05); }
    .tag:nth-child(3n+2) { border-color: rgba(78,205,196,0.4); color: var(--bug-teal); background: rgba(78,205,196,0.05); }
    .tag:nth-child(3n+3) { border-color: rgba(168,85,247,0.4); color: var(--bug-purple); background: rgba(168,85,247,0.05); }
    .tag:hover { transform: translateY(-2px); filter: brightness(1.3); }

    /* FOOTER */
    .footer {
      text-align: center;
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
    }
    .footer-text {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 16px;
    }
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 32px;
      flex-wrap: wrap;
    }
    .footer-link {
      color: var(--gold);
      text-decoration: none;
      font-size: 12px;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s, text-shadow 0.2s;
    }
    .footer-link:hover {
      color: var(--gold-light);
      text-shadow: 0 0 12px rgba(201,168,76,0.5);
    }

    /* CORNER DECO */
    .corner-tl, .corner-br {
      position: fixed;
      width: 80px; height: 80px;
      pointer-events: none;
      z-index: 2;
    }
    .corner-tl { top: 20px; left: 20px; border-top: 1px solid var(--gold-dim); border-left: 1px solid var(--gold-dim); }
    .corner-br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--gold-dim); border-right: 1px solid var(--gold-dim); }

    /* FLOATING PARTICLES */
    .particle {
      position: fixed;
      pointer-events: none;
      z-index: 1;
      border-radius: 50%;
      animation: float-up linear infinite;
      opacity: 0;
    }
    @keyframes float-up {
      0% { transform: translateY(100vh) translateX(0); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.2; }
      100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
    }
  </style>
</head>
<body>

<!-- STAR WARS CRAWL -->
<div class="crawl-wrapper" id="crawl">
  <div class="crawl-pre">A long time ago in a galaxy far, far away...</div>
  <div class="crawl-title">DEVOPS AWAKENS</div>
</div>

<!-- CANVAS STARFIELD -->
<canvas id="stars"></canvas>
<div class="silk-bg"></div>

<!-- CORNER DECORATIONS -->
<div class="corner-tl"></div>
<div class="corner-br"></div>

<div class="main">

  <!-- HEADER -->
  <div class="header">
    <div class="badge"><span class="badge-dot"></span>Sistema Activo</div>
    <div class="title">INFRAESTRUCTURA<br>DEVOPS EN LA NUBE</div>
    <div class="subtitle">Sistemas Operativos II — Universidad Mariano Gálvez</div>
    <div class="student">⚔ Rolando Corado ⚔</div>
  </div>

  <div class="rune-div">◆ ◇ ◆ ◇ ◆</div>

  <!-- STATS -->
  <div class="stats">
    <div class="stat-card">
      <div class="stat-icon" style="color:#f0d080">⚡</div>
      <div class="stat-label">Uptime del Sistema</div>
      <div class="stat-val">${hours}h ${minutes}m ${seconds}s</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="color:#4ecdc4">🌌</div>
      <div class="stat-label">Servidor Cloud</div>
      <div class="stat-val">AWS EC2</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="color:#a855f7">🐝</div>
      <div class="stat-label">Orquestación</div>
      <div class="stat-val">Docker Swarm</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="color:#ff6b9d">💎</div>
      <div class="stat-label">Réplicas API</div>
      <div class="stat-val">2 Activas</div>
    </div>
  </div>

  <!-- SERVICES -->
  <div class="panel">
    <div class="panel-title">⟡ Servicios del Stack</div>
    <div class="service-row">
      <div class="service-left">
        <span class="insect-icon">🦋</span>
        <div>
          <div class="service-name">Nginx Load Balancer</div>
          <div class="service-detail">Puerto 80 → API Service</div>
        </div>
      </div>
      <div class="service-status"><span class="status-gem"></span>Online</div>
    </div>
    <div class="service-row">
      <div class="service-left">
        <span class="insect-icon">🐛</span>
        <div>
          <div class="service-name">API Node.js</div>
          <div class="service-detail">2 Réplicas · Puerto 3000</div>
        </div>
      </div>
      <div class="service-status"><span class="status-gem"></span>Online</div>
    </div>
    <div class="service-row">
      <div class="service-left">
        <span class="insect-icon">🕷</span>
        <div>
          <div class="service-name">MongoDB</div>
          <div class="service-detail">Base de Datos · Puerto 27017</div>
        </div>
      </div>
      <div class="service-status"><span class="status-gem"></span>Online</div>
    </div>
    <div class="service-row">
      <div class="service-left">
        <span class="insect-icon">🌟</span>
        <div>
          <div class="service-name">Grafana Dashboard</div>
          <div class="service-detail">Monitoreo · <a href="http://18.118.136.12:3000" target="_blank" style="color:var(--bug-teal);text-decoration:none;">Puerto 3000 ↗</a></div>
        </div>
      </div>
      <div class="service-status"><span class="status-gem"></span>Online</div>
    </div>
  </div>

  <!-- TECH STACK -->
  <div class="panel">
    <div class="panel-title">⟡ Tecnologías Implementadas</div>
    <div class="tags">
      <span class="tag">Docker</span>
      <span class="tag">Docker Swarm</span>
      <span class="tag">GitHub Actions</span>
      <span class="tag">AWS EC2</span>
      <span class="tag">Nginx</span>
      <span class="tag">MongoDB</span>
      <span class="tag">Grafana</span>
      <span class="tag">Node.js</span>
      <span class="tag">CI/CD Pipeline</span>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-text">Pipeline CI/CD · GitHub Actions → AWS EC2 · Docker Swarm</div>
    <div class="footer-links">
      <a href="http://18.118.136.12:3000" target="_blank" class="footer-link">📊 Grafana Dashboard</a>
      <a href="https://github.com/mcoradog5-ctrl/proyecto-devops" target="_blank" class="footer-link">⚔ Repositorio GitHub</a>
    </div>
    <div style="margin-top:24px;font-size:10px;letter-spacing:2px;color:var(--text-dim);opacity:0.4;">
      MAY THE FORCE BE WITH THE CONTAINERS
    </div>
  </div>

</div>

<script>
// STARFIELD
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.twinkle += 0.02;
    s.y -= s.speed;
    if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
    const op = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = \`rgba(240,220,180,\${op})\`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resize();
initStars();
drawStars();
window.addEventListener('resize', () => { resize(); initStars(); });

// FLOATING PARTICLES (silk threads)
const colors = ['rgba(78,205,196,', 'rgba(201,168,76,', 'rgba(168,85,247,', 'rgba(255,107,157,'];
for (let i = 0; i < 15; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const c = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 3 + 1;
  p.style.cssText = \`
    width:\${size}px;height:\${size}px;
    left:\${Math.random()*100}vw;
    background:\${c}0.8);
    box-shadow:0 0 \${size*3}px \${c}0.6);
    animation-duration:\${Math.random()*20+15}s;
    animation-delay:\${Math.random()*15}s;
  \`;
  document.body.appendChild(p);
}

// REMOVE CRAWL AFTER ANIMATION
setTimeout(() => {
  const crawl = document.getElementById('crawl');
  if (crawl) crawl.style.display = 'none';
}, 5000);
</script>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});