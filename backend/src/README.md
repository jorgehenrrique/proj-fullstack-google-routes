# Ride API Documentação

## Visão Geral

Esta API gerencia corridas, permitindo estimativa, confirmação e listagem de viagens.

## Endpoints

### 1. Estimar Corrida

- **URL:** `/ride/estimate`
- **Método:** `POST`
- **Descrição:** Calcula estimativa de corrida com motoristas disponíveis

#### Requisição

```json
{
  "customer_id": "string",
  "origin": "string",
  "destination": "string"
}
```

#### Resposta de Sucesso

```json
{
  "origin": {
    "latitude": number,
    "longitude": number
  },
  "destination": {
    "latitude": number,
    "longitude": number
  },
  "distance": number,
  "duration": "string",
  "options": [
    {
      "id": number,
      "name": "string",
      "vehicle": "string",
      "description": "string",
      "review": {
        "rating": number,
        "comment": "string"
      },
      "value": number
    }
  ],
  "routeResponse": object
}
```

### 2. Confirmar Corrida

- **URL:** `/ride/confirm`
- **Método:** `PATCH`
- **Descrição:** Confirma e salva uma corrida

#### Requisição

```json
{
  "customer_id": "string",
  "origin": "string",
  "destination": "string",
  "distance": number,
  "duration": "string",
  "driver": {
    "id": number,
    "name": "string"
  },
  "value": number
}
```

#### Resposta de Sucesso

```json
{
  "success": true
}
```

### 3. Listar Corridas

- **URL:** `/ride/{customer_id}`
- **Método:** `GET`
- **Descrição:** Lista corridas de um usuário
- **Parâmetros de Consulta:**
  - `driver_id` (opcional): Filtrar por motorista específico

#### Resposta de Sucesso

```json
{
  "customer_id": "string",
  "rides": [
    {
      "id": number,
      "date": "datetime",
      "origin": "string",
      "destination": "string",
      "distance": number,
      "duration": "string",
      "driver": {
        "id": number,
        "name": "string"
      },
      "value": number
    }
  ]
}
```

## Códigos de Erro Padrão

- `400 Bad Request`: Dados inválidos
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Validações

- Todos os campos são obrigatórios
- Endereços de origem e destino não podem ser iguais
- Distância deve ser positiva
- Motorista deve ser válido

## Exemplos de Uso

### Estimar Corrida

```http
POST http://localhost:8080/ride/estimate
Content-Type: application/json

{
  "customer_id": "1",
  "origin": "Rua B, 123, São Paulo, SP",
  "destination": "Av. C, 1000, São Paulo, SP"
}
```

### Confirmar Corrida

```http
PATCH http://localhost:8080/ride/confirm
Content-Type: application/json

{
  "customer_id": "1",
  "origin": "Rua B, 123, São Paulo, SP",
  "destination": "Av. C, 1000, São Paulo, SP",
  "distance": 10,
  "duration": "10 minutos",
  "driver": {
    "id": 2,
    "name": "Motorista Teste"
  },
  "value": 10
}
```

### Listar Corridas

```http
GET http://localhost:8080/ride/1?driver_id=2
```

## Requisitos

- Node.js
- MongoDB
- Chave de API do Google Maps

## Configuração

1. Clone o repositório
2. Instale dependências: `npm install`
3. Configure variáveis de ambiente
4. Inicie o servidor: `npm run dev`
