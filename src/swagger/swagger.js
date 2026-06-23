const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Loja — v2.0.0 (MySQL)',
    version: '2.0.0',
    description:
      'API REST migrada de MongoDB para MySQL. ' +
      'Para acessar rotas protegidas: faça login, copie o token e clique em **Authorize** informando `Bearer <token>`.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      RegisterInput: {
        type: 'object',
        required: ['nome', 'email', 'password'],
        properties: {
          nome:     { type: 'string',  example: 'João Silva' },
          email:    { type: 'string',  format: 'email', example: 'joao@email.com' },
          password: { type: 'string',  minLength: 6,    example: 'senha123' },
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
          usuario: {
            type: 'object',
            properties: {
              id:    { type: 'integer', example: 1 },
              nome:  { type: 'string',  example: 'João Silva' },
              email: { type: 'string',  example: 'joao@email.com' },
            },
          },
        },
      },
      Categoria: {
        type: 'object',
        properties: {
          id_categoria: { type: 'integer', example: 1 },
          nome:         { type: 'string',  example: 'Eletrônicos' },
        },
      },
      CategoriaInput: {
        type: 'object',
        required: ['nome'],
        properties: {
          nome: { type: 'string', example: 'Eletrônicos' },
        },
      },
      Produto: {
        type: 'object',
        properties: {
          id_produto:               { type: 'integer', example: 1 },
          nome:                     { type: 'string',  example: 'Notebook Dell' },
          valor:                    { type: 'number',  example: 3500.00 },
          estoque:                  { type: 'integer', example: 10 },
          categorias_id_categoria:  { type: 'integer', example: 1 },
          categoria_nome:           { type: 'string',  example: 'Eletrônicos' },
        },
      },
      ProdutoInput: {
        type: 'object',
        required: ['nome', 'valor', 'categorias_id_categoria'],
        properties: {
          nome:                    { type: 'string',  example: 'Notebook Dell' },
          valor:                   { type: 'number',  example: 3500.00 },
          estoque:                 { type: 'integer', example: 10, description: 'Padrão: 1' },
          categorias_id_categoria: { type: 'integer', example: 1 },
        },
      },
      Cliente: {
        type: 'object',
        properties: {
          id_cliente: { type: 'integer', example: 1 },
          nome:       { type: 'string',  example: 'Maria Souza' },
          telefone:   { type: 'string',  example: '51999998888' },
          status:     { type: 'string',  enum: ['bom', 'medio', 'ruim'], example: 'bom' },
        },
      },
      ClienteInput: {
        type: 'object',
        required: ['nome', 'telefone'],
        properties: {
          nome:     { type: 'string', example: 'Maria Souza' },
          telefone: { type: 'string', example: '51999998888' },
          status:   { type: 'string', enum: ['bom', 'medio', 'ruim'], example: 'bom', description: 'Padrão: medio' },
        },
      },
      ItemPedido: {
        type: 'object',
        required: ['produtos_id_produto', 'quantidade', 'valor'],
        properties: {
          produtos_id_produto: { type: 'integer', example: 1 },
          produto_nome:        { type: 'string',  example: 'Notebook Dell' },
          quantidade:          { type: 'number',  example: 2 },
          valor:               { type: 'number',  example: 3500.00 },
        },
      },
      Pedido: {
        type: 'object',
        properties: {
          id_pedido:            { type: 'integer', example: 1 },
          data:                 { type: 'string',  format: 'date', example: '2026-06-22' },
          clientes_id_cliente:  { type: 'integer', example: 1 },
          cliente_nome:         { type: 'string',  example: 'Maria Souza' },
          itens:                { type: 'array', items: { $ref: '#/components/schemas/ItemPedido' } },
        },
      },
      PedidoInput: {
        type: 'object',
        required: ['data', 'clientes_id_cliente'],
        properties: {
          data:                { type: 'string', format: 'date', example: '2026-06-22' },
          clientes_id_cliente: { type: 'integer', example: 1 },
          itens: {
            type: 'array',
            items: {
              type: 'object',
              required: ['produtos_id_produto', 'quantidade', 'valor'],
              properties: {
                produtos_id_produto: { type: 'integer', example: 1 },
                quantidade:          { type: 'number',  example: 2 },
                valor:               { type: 'number',  example: 3500.00 },
              },
            },
          },
        },
      },
      ErrorMessage: {
        type: 'object',
        properties: { message: { type: 'string' } },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/status': {
      get: {
        tags: ['Monitoramento'],
        summary: '🟢 Status da API (público — sem autenticação)',
        security: [],
        responses: {
          200: {
            description: 'API online',
            content: {
              'application/json': {
                example: { versao: '2.0.0', status: 'online', banco: 'MySQL', timestamp: '2025-06-15T12:00:00.000Z' },
              },
            },
          },
        },
      },
    },
    '/api/versao': {
      get: {
        tags: ['Monitoramento'],
        summary: 'Versão da API (público)',
        security: [],
        responses: {
          200: {
            description: 'Versão retornada',
            content: { 'application/json': { example: { versao: '2.0.0', status: 'online' } } },
          },
        },
      },
    },
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
          201: { description: 'Usuário criado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'E-mail já existe',   content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          500: { description: 'Erro no servidor',   content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
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
          200: { description: 'Login bem-sucedido', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          401: { description: 'Credenciais inválidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/categorias': {
      get: {
        tags: ['Categorias 🔒'],
        summary: 'Listar todas as categorias',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de categorias', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Categoria' } } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      post: {
        tags: ['Categorias 🔒'],
        summary: 'Criar nova categoria',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriaInput' } } },
        },
        responses: {
          201: { description: 'Categoria criada',   content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } },
          400: { description: 'Dados inválidos',    content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/categorias/{id}': {
      get: {
        tags: ['Categorias 🔒'],
        summary: 'Buscar categoria por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Categoria encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrada',      content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      put: {
        tags: ['Categorias 🔒'],
        summary: 'Atualizar categoria',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriaInput' } } },
        },
        responses: {
          200: { description: 'Atualizada com sucesso', content: { 'application/json': { example: { message: 'Categoria atualizada com sucesso.', id_categoria: '1', nome: 'Eletrônicos' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrada',      content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      delete: {
        tags: ['Categorias 🔒'],
        summary: 'Deletar categoria',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Deletada com sucesso', content: { 'application/json': { example: { message: 'Categoria deletada com sucesso.' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrada',      content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
 
    '/api/produtos': {
      get: {
        tags: ['Produtos 🔒'],
        summary: 'Listar todos os produtos',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de produtos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Produto' } } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      post: {
        tags: ['Produtos 🔒'],
        summary: 'Criar novo produto',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutoInput' } } },
        },
        responses: {
          201: { description: 'Produto criado',  content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } },
          400: { description: 'Dados inválidos ou categoria inexistente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/produtos/{id}': {
      get: {
        tags: ['Produtos 🔒'],
        summary: 'Buscar produto por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Produto encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      put: {
        tags: ['Produtos 🔒'],
        summary: 'Atualizar produto',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutoInput' } } },
        },
        responses: {
          200: { description: 'Atualizado com sucesso', content: { 'application/json': { example: { message: 'Produto atualizado com sucesso.', id_produto: '1' } } } },
          400: { description: 'Dados inválidos ou categoria inexistente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      delete: {
        tags: ['Produtos 🔒'],
        summary: 'Deletar produto',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Deletado com sucesso', content: { 'application/json': { example: { message: 'Produto deletado com sucesso.' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
 
    '/api/clientes': {
      get: {
        tags: ['Clientes 🔒'],
        summary: 'Listar todos os clientes',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de clientes', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Cliente' } } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      post: {
        tags: ['Clientes 🔒'],
        summary: 'Criar novo cliente',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ClienteInput' } } },
        },
        responses: {
          201: { description: 'Cliente criado',  content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } },
          400: { description: 'Dados inválidos',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/clientes/{id}': {
      get: {
        tags: ['Clientes 🔒'],
        summary: 'Buscar cliente por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Cliente encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      put: {
        tags: ['Clientes 🔒'],
        summary: 'Atualizar cliente',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ClienteInput' } } },
        },
        responses: {
          200: { description: 'Atualizado com sucesso', content: { 'application/json': { example: { message: 'Cliente atualizado com sucesso.', id_cliente: '1' } } } },
          400: { description: 'Dados inválidos',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      delete: {
        tags: ['Clientes 🔒'],
        summary: 'Deletar cliente',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Deletado com sucesso', content: { 'application/json': { example: { message: 'Cliente deletado com sucesso.' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',     content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
 
    '/api/pedidos': {
      get: {
        tags: ['Pedidos 🔒'],
        summary: 'Listar todos os pedidos',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de pedidos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pedido' } } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      post: {
        tags: ['Pedidos 🔒'],
        summary: 'Criar novo pedido (com itens, em transação)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PedidoInput' } } },
        },
        responses: {
          201: { description: 'Pedido criado',   content: { 'application/json': { schema: { $ref: '#/components/schemas/Pedido' } } } },
          400: { description: 'Dados inválidos, cliente ou produto inexistente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
    '/api/pedidos/{id}': {
      get: {
        tags: ['Pedidos 🔒'],
        summary: 'Buscar pedido por ID (com itens)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Pedido encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pedido' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',    content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      put: {
        tags: ['Pedidos 🔒'],
        summary: 'Atualizar dados do pedido (data e cliente)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['data', 'clientes_id_cliente'],
                properties: {
                  data:                { type: 'string', format: 'date', example: '2026-06-22' },
                  clientes_id_cliente: { type: 'integer', example: 1 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Atualizado com sucesso', content: { 'application/json': { example: { message: 'Pedido atualizado com sucesso.', id_pedido: '1' } } } },
          400: { description: 'Dados inválidos ou cliente inexistente', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',    content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
      delete: {
        tags: ['Pedidos 🔒'],
        summary: 'Deletar pedido (e seus itens)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } }],
        responses: {
          200: { description: 'Deletado com sucesso', content: { 'application/json': { example: { message: 'Pedido deletado com sucesso.' } } } },
          401: { description: 'Token ausente ou inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
          404: { description: 'Não encontrado',    content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorMessage' } } } },
        },
      },
    },
  },
};
 
module.exports = swaggerDefinition;
 