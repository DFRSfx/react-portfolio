# React Portfolio

Portfolio pessoal desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **React Router** - Navegação
- **Bootstrap** - Framework CSS
- **CSS Modules** - Estilos isolados
- **EmailJS** - Envio de emails

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🛠️ Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

## 🏗️ Build

```bash
# Gerar build de produção
npm run build
```

Os arquivos serão gerados na pasta `dist/`

## 👀 Preview

```bash
# Visualizar build de produção localmente
npm run preview
```

## 🚀 Deploy

```bash
# Deploy para GitHub Pages
npm run deploy
```

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                  # Componente principal
├── Routes.tsx               # Configuração de rotas
├── main.tsx                 # Entry point
│
├── pages/                   # Páginas da aplicação
│   ├── Home.tsx            # Página inicial
│   ├── About.tsx           # Sobre
│   ├── Portfolio.tsx       # Portfólio
│   └── Contact.tsx         # Contato
│
└── components/             # Componentes reutilizáveis
    ├── Header.tsx         # Cabeçalho e menu
    ├── SocialIcons.tsx    # Ícones sociais
    ├── ThemeToggle.tsx    # Alternador de tema
    └── AnimatedCursor.tsx # Cursor animado
```

## ✏️ Personalização

### Dados Pessoais

Edite diretamente nos componentes:

**Home** (`src/pages/Home.tsx`)
- Nome, título e descrição
- Frases do typewriter
- Imagem de fundo

**About** (`src/pages/About.tsx`)
- Biografia
- Timeline de trabalho
- Skills e níveis
- Serviços oferecidos

**Portfolio** (`src/pages/Portfolio.tsx`)
- Projetos (imagem, descrição, link)

**Contact** (`src/pages/Contact.tsx`)
- Email e telefone
- Configuração EmailJS

**Header** (`src/components/Header.tsx`)
- Logo
- Links de redes sociais

**Social Icons** (`src/components/SocialIcons.tsx`)
- Perfis de redes sociais

### Estilos

Cada componente possui seu arquivo CSS Module:
- `Home.module.css`
- `About.module.css`
- `Portfolio.module.css`
- etc.

Edite os arquivos `.module.css` para customizar o visual.

### Temas

O projeto suporta tema claro/escuro. As variáveis CSS estão em `src/index.css`:

```css
[data-theme="light"] {
  --primary-color: #fff;
  --secondary-color: #000;
  --text-color: #000;
  ...
}

[data-theme="dark"] {
  --primary-color: #000;
  --secondary-color: #fff;
  --text-color: #fff;
  ...
}
```

## 📝 Licença

Este projeto está sob a licença MIT.
