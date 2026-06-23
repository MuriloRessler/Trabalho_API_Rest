require('dotenv').config();
const express    = require('express');
const swaggerUi  = require('swagger-ui-express');

require('./src/config/database'); // testa a conexão ao iniciar

const swaggerDefinition = require('./src/swagger/swagger');
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition, {
  swaggerOptions: { persistAuthorization: true },
}));

// Rotas PÚBLICAS
app.use('/api', require('./src/routes/apiRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));

// Rotas PRIVADAS
app.use('/api/categorias', require('./src/routes/categoriaRoutes'));
app.use('/api/produtos', require('./src/routes/produtosRoutes'));
app.use('/api/clientes', require('./src/routes/clientesRoutes'));
app.use('/api/pedidos', require('./src/routes/pedidosRoutes'));

app.get('/', (req, res) =>
  res.json({ message: 'API Loja v2.0.0 — MySQL 🚀', docs: '/api-docs' })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Docs: http://localhost:${PORT}/api-docs`);
  console.log(`🟢 Status: http://localhost:${PORT}/api/status`);
});