# Projeto GymPass Style App.

# RFs (Requisitos funcionais)
## Funcionalidades da aplicação, aquilo que será possivél o usuario fazer

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de im usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histório de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-ins em academias;
- [ ] Deve ser possível validar o check-ins de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

# RNs (Regras de negócio)
## Caminhos que cada requisito pode tomar. Condições aplicadas para cada requisito funcional

- [ ] Emails não podem ser duplicados para cadastros;
- [ ] Não deve ser possivél fazer mais de 1 check-in no mesmo dia;
- [ ] Não deve ser possivél fazer check-in se estiver longe da academia (100m) da academia;
- [ ] O check-in só pode ser validado após 20mim de criado;
- [ ] O check-in só pode ser valudado por adms;
- [ ] A academia só pode ser cadastradas por adms;

# RNFs (Requisitos não-funcionais)
## Requisotos que não partem do cliente. Coisas de dev

- [ ] A senha do usúario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas lista de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser indentificado por um JWT;

# Comando importantes para utilizar o prisma

## instalação 

npm i -D prisma
npx prisma init 
Após criar a tabela usamos 
npx prisma generate
PAra fazer nossas migratios 
npx prisma migrate dev

# Docker 

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=123456 -e POSTGRESQL_DATABASE=apisolid -p 5432:5432  bitnami/postgresql
