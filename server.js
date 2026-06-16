require('dotenv').config();
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');               
const connectDB = require('./src/config/database');
const swaggerDefinition = require('./src/swagger/swagger');    

const app = express();

// Conectar ao banco
connectDB();

// Middlewares globais
app.use(express.json());

// 🛡️ Proteção contra NoSQL Injection
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.query) mongoSanitize.sanitize(req.query);
  next();
});

// 📄 Documentação Swagger em /api-docs                        
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition, {
  swaggerOptions: { persistAuthorization: true },
}));

// Rotas
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

// Rota de verificação
app.get('/', (req, res) => res.json({ message: 'API Catálogo de Produtos funcionando! 🚀' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Docs: http://localhost:${PORT}/api-docs`);
});