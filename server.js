const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Proyecto DevOps - Sistemas Operativos II</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
                    min-height: 100vh;
                    padding: 30px 20px;
                    color: white;
                }
                .container { max-width: 900px; margin: 0 auto; }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding: 40px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .badge {
                    display: inline-block;
                    background: #48bb78;
                    color: white;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .header h1 { font-size: 32px; margin-bottom: 8px; color: #63b3ed; }
                .header p { color: #a0aec0; font-size: 16px; }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 24px;
                }
                .card {
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                }
                .card .icon { font-size: 28px; margin-bottom: 10px; }
                .card .label { font-size: 12px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; }
                .card .value { font-size: 20px; font-weight: bold; color: #63b3ed; margin-top: 4px; }
                .services {
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                }
                .services h3 { color: #63b3ed; margin-bottom: 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
                .service-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .service-row:last-child { border-bottom: none; }
                .service-detail { font-size: 13px; color: #a0aec0; }
                .dot {
                    width: 10px; height: 10px;
                    border-radius: 50%;
                    background: #48bb78;
                    display: inline-block;
                    margin-right: 8px;
                    animation: pulse 2s infinite;
                }
                .tech-stack {
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                }
                .tech-stack h3 { color: #63b3ed; margin-bottom: 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
                .tags { display: flex; flex-wrap: wrap; gap: 10px; }
                .tag {
                    background: rgba(99,179,237,0.15);
                    border: 1px solid rgba(99,179,237,0.3);
                    color: #63b3ed;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 13px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 12px;
                    color: #a0aec0;
                    font-size: 14px;
                }
                .footer a {
                    color: #63b3ed;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .footer a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="badge">● Sistema Activo</div>
                    <h1>Infraestructura DevOps en la Nube</h1>
                    <p>Sistemas Operativos II — Universidad Mariano Gálvez</p>
                    <p style="margin-top:8px; color:#68d391;">Estudiante: Rolando Corado</p>
                </div>

                <div class="grid">
                    <div class="card">
                        <div class="icon">⚡</div>
                        <div class="label">Uptime</div>
                        <div class="value">${hours}h ${minutes}m ${seconds}s</div>
                    </div>
                    <div class="card">
                        <div class="icon">🖥️</div>
                        <div class="label">Servidor</div>
                        <div class="value">AWS EC2</div>
                    </div>
                    <div class="card">
                        <div class="icon">🐳</div>
                        <div class="label">Orquestación</div>
                        <div class="value">Docker Swarm</div>
                    </div>
                    <div class="card">
                        <div class="icon">📦</div>
                        <div class="label">Réplicas API</div>
                        <div class="value">2 activas</div>
                    </div>
                </div>

                <div class="services">
                    <h3>🔧 Servicios del Stack</h3>
                    <div class="service-row">
                        <span><span class="dot"></span>Nginx Load Balancer</span>
                        <span class="service-detail">Puerto 80 → API</span>
                    </div>
                    <div class="service-row">
                        <span><span class="dot"></span>API Node.js</span>
                        <span class="service-detail">2 réplicas · Puerto 3000</span>
                    </div>
                    <div class="service-row">
                        <span><span class="dot"></span>MongoDB</span>
                        <span class="service-detail">Base de datos · Puerto 27017</span>
                    </div>
                    <div class="service-row">
                        <span><span class="dot"></span>Grafana</span>
                        <span class="service-detail">Monitoreo · <a href="http://18.118.136.12:3000" target="_blank" style="color:#63b3ed;">Puerto 3000</a></span>
                    </div>
                </div>

                <div class="tech-stack">
                    <h3>🛠️ Tecnologías Implementadas</h3>
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

                <div class="footer">
                    <p>Pipeline CI/CD · GitHub Actions → AWS EC2 · Docker Swarm</p>
                    <p style="margin-top:8px;">
                        <a href="http://18.118.136.12:3000" target="_blank">📊 Grafana Dashboard</a>
                        <a href="https://github.com/mcoradog5-ctrl/proyecto-devops" target="_blank">📁 Repositorio GitHub</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
