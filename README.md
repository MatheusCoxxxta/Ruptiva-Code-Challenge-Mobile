# Ruptiva Code Challenge - Matheus Costa

## Table of Contents

- [Sobre](#about)
- [Observação Importante](#obs)
- [Projeto](#project)
- [Inicializando](#getting_started)
- [Utilizando](#usage)
- [Referências](#references)

## Sobre <a name = "about"></a>

O Ruptiva Code Challenge é desenvolvido como desafio do processo seletivo da Ruptiva.
Deve ser desenvolvido com React Native (Expo) e Typescript.

<img width=500px height=250px src="https://i.imgur.com/QSEpTD3.png" alt="Project Screenshot"></a>

# Principais ferramentas

**Foi utilizado:**

- React Native
- Styled Components
- Hooks
- Integração com API REST

Foi desenvolvido também como atividade extra, pequena demonstração de como seria a aplicação
utilizando Redux: https://github.com/MatheusCoxxxta/Ruptiva-Code-Challenge-Front-end

## Observação Importante <a name = "obs"></a>

Como comunicado anteriormente ao Hoberdan Engel por e-mail, o Expo está com uma instabilidade em uma biblioteca de integração com o Firestore, então criei uma API com as funcionalidades necessárias no desafio e deixarei disponivel para qualquer candidato com o mesmo problema entre Expo e Firestore.

## Projeto <a name = "project"></a>

Primeiramente foi desenvolvido o design (UI) e recursos gráficos necessários no Figma.

Para o desenvolvimento do projeto React Native, foram criados os componentes (Formulário e Lista de usuários), que recebem dados e funções do componente principal (Main), dessa forma esses dados e funções poderiam ser utilizados em outros componentes em caso de expansão do projeto.

**Link para download do APK:** https://drive.google.com/file/d/1ZEdRNGtQQT8hWbL7-VHrm10DhtzoUpqe/view?usp=sharing

## Utilizando <a name = "usage"></a>

O app tem como principal função adicionar usuários ao banco de dados e mostra-los.

Na tela, digite um nome e um documento, podendo ser CPF ou CNPJ. Ao pressionar o botão "Cadastrar"
o usuário será adicionado a lista. Nessa lista, você poderá deletar o usuário, através do icone de cesto
de lixo á direita de cada usuário.

## Inicializando <a name = "getting_started"></a>

Esse é o passo á passo para utilizar o código do projeto.

### Pre-requisitos

Você precisa ter um ambiente Expo configurado (Expo CLI, Node.js, Yarn)

### Instalando

Dê clone nesse repositório

```
git clone https://github.com/MatheusCoxxxta/Ruptiva-Code-Challenge-Mobile.git
```

Instale os pacotes

```
yarn install
```

ou

```
npm install
```

Inicie o servidor local do Expo

```
yarn start
```

ou

```
npm run start
```

Dessa forma você conseguirá visualizar o dashboard do Expo em `localhost:19002`

## Referências <a name = "references"></a>

- API utilizada: https://github.com/MatheusCoxxxta/Ruptiva-Code-Challenge-server
- Design e recursos gráficos: https://www.figma.com/file/Fz4CKqEij6XM4lHvRoh4dF/Ruptiva-Code-Challenge?node-id=1%3A23
