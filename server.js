const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Proyecto Final - Sistemas Operativos II</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f6f9;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .card {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                    max-width: 450px;
                    width: 90%;
                }
                h1 { color: #1a365d; margin-bottom: 5px; font-size: 26px; }
                h2 { color: #4a5568; font-size: 18px; margin-top: 0; font-weight: 400; margin-bottom: 20px; }
                .status {
                    background-color: #c6f6d5;
                    color: #22543d;
                    padding: 8px 20px;
                    border-radius: 20px;
                    display: inline-block;
                    font-weight: bold;
                    margin: 15px 0;
                    font-size: 14px;
                }
                .project-info {
                    text-align: left;
                    background: #edf2f7;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 20px;
                    font-size: 15px;
                    color: #2d3748;
                    line-height: 1.6;
                }
                img {
                    max-width: 120px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Simple_shiny_blue_cube.svg" alt="Logo DevOps">
                
                <h1>Sistemas Operativos II</h1>
                <h2>Infraestructura DevOps en la Nube</h2>
                
                <div class="status">● Contenedor Activo (Local)</div>
                
                <div class="project-info">
                    <strong>Proyecto Individual</strong><br>
                    Estudiante: Rolando<br>
                    Estado: Fase 1 (Contenerización Local Completa)
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});