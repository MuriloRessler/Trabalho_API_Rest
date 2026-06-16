const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Catálogo de Produtos',
    version: '1.0.0',
    description:
      'Documentação da API REST de Catálogo de Produtos com autenticação JWT. ' +
      'Para testar rotas protegidas, faça login, copie o token retornado e clique em **Authorize** (cadeado) informando: `Bearer <seu_token>`.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name:     { type: 'string',  example: 'João Silva' },
          email:    { type: 'string',  format: 'email', example: 'joao@email.com' },
          password: { type: 'string',  minLength: 6, example: 'senha123' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email:    { type: 'string', format: 'email', example: 'joao@email.com' },
          password: { type: 'string', example: 'senha123' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: {
            type: 'object',
            properties: {
              id:    { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
              name:  { type: 'string', example: 'João Silva' },
              email: { type: 'string', example: 'joao@email.com' },
            },
          },
        },
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'category'],
        properties: {
          name:        { type: 'string',  example: 'Notebook Gamer' },
          description: { type: 'string',  example: 'Notebook com placa de vídeo dedicada' },
          price:       { type: 'number',  minimum: 0, example: 4999.99 },
          category: {
            type: 'string',
            enum: ['eletronicos', 'roupas', 'alimentos', 'outros'],
            example: 'eletronicos',
          },
          stock:      { type: 'integer', minimum: 0, example: 10 },
          attributes: {
            type: 'object',
            additionalProperties: { type: 'string' },
            example: { ram: '16GB', processador: 'Intel i7' },
          },
        },
      },
      Product: {
        allOf: [
          { $ref: '#/components/schemas/ProductInput' },
          {
            type: 'object',
            properties: {
              _id:       { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
              createdBy: {
                type: 'object',
                properties: {
                  _id:   { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0a' },
                  name:  { type: 'string', example: 'João Silva' },
                  email: { type: 'string', example: 'joao@email.com' },
                },
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        ],
      },
      ErrorMessage: {
        type: 'object',
        properties: { message: { type: 'string' } },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Autenticação'],
        summary: 'Registrar novo usuário',
        security: [],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } },
        },
        responses: {
          201: { description: 'Usuário criado com sucesso',   content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'E-mail já cadastrado',         content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' }, example: { message: 'Email já cadastrado.' } } } },
          500: { description: 'Erro interno do servidor',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Login de usuário',
        security: [],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } },
        },
        responses: {
          200: { description: 'Login realizado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          401: { description: 'Credenciais inválidas',       content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' }, example: { message: 'Email ou senha incorretos.' } } } },
          500: { description: 'Erro interno do servidor',    content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/products': {
      get: {
        tags: ['Produtos'],
        summary: 'Listar todos os produtos',
        responses: {
          200: { description: 'Lista retornada com sucesso', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } } },
          401: { description: 'Token inválido ou ausente',   content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          500: { description: 'Erro interno',                content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      post: {
        tags: ['Produtos'],
        summary: 'Criar novo produto',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } },
        },
        responses: {
          201: { description: 'Produto criado',          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          400: { description: 'Dados inválidos',         content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token inválido ou ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        tags: ['Produtos'],
        summary: 'Buscar produto por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' } }],
        responses: {
          200: { description: 'Produto encontrado',      content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          401: { description: 'Token inválido ou ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Produto não encontrado',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' }, example: { message: 'Produto não encontrado.' } } } },
          500: { description: 'Erro interno',            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      put: {
        tags: ['Produtos'],
        summary: 'Atualizar produto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } },
        },
        responses: {
          200: { description: 'Produto atualizado',      content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          400: { description: 'Dados inválidos',         content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token inválido ou ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Produto não encontrado',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' }, example: { message: 'Produto não encontrado.' } } } },
        },
      },
      delete: {
        tags: ['Produtos'],
        summary: 'Deletar produto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' } }],
        responses: {
          200: { description: 'Produto deletado',        content: { 'application/json': { example: { message: 'Produto deletado com sucesso.' } } } },
          401: { description: 'Token inválido ou ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Produto não encontrado',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' }, example: { message: 'Produto não encontrado.' } } } },
          500: { description: 'Erro interno',            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;