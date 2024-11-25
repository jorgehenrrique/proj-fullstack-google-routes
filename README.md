# Projeto

## Comandos para trabalhar com o projeto

### Durante o Desenvolvimento

1. **Desenvolvimento Local (Recomendado)**:

   - Para backend: `npm run dev` (na pasta backend)
   - Para frontend: `npm run dev` (na pasta frontend)
   - Esta é a forma mais rápida para desenvolvimento

2. **Desenvolvimento com Docker**:

```bash
docker-compose up --build
```

### Ambiente de Produção

O mesmo comando é usado para produção, mas com a flag `-d` (detached):

```bash
docker-compose up --build -d
```

O Docker irá:

- Executar o build dos projetos
- Iniciar os serviços em modo produção
- Backend ficará disponível em: http://localhost:8080
- Frontend ficará disponível em: http://localhost:80

### Forma Recomendada de Trabalho

1. **Durante desenvolvimento**:

   - Execute os projetos separadamente sem Docker
   - Use `npm run dev` em cada projeto
   - Mantenha dois terminais abertos (um para cada projeto)

2. **Para produção/testes de integração**:
   - Use Docker Compose
   - Garanta que o arquivo .env está configurado
   - Execute: `docker-compose up --build -d`

### Comandos Úteis do Docker

```bash
# Iniciar os serviços
docker-compose up

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs

# Ver logs em tempo real
docker-compose logs -f

# Iniciar serviço específico
docker-compose up backend
docker-compose up frontend

# Remover todos os containers e volumes
docker-compose down -v
```

### Observações Importantes

1. O arquivo .env deve estar na raiz do projeto
2. A variável GOOGLE_API_KEY deve estar configurada no .env
3. As portas 80 e 8080 devem estar disponíveis no seu sistema
