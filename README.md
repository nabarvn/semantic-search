# Semantic Search

A super smart search engine that is designed to help you find precisely what you're looking for in the database. All of this is possible by combining traditional keyword-based search with advanced semantic analysis using cosine similarity algorithm, ensuring highly relevant results for every query.

## Screenshot

<img src="./screenshot.png">

<p align="center">
  <a href="https://semantic-search.nabarun.app"><strong>View Project »</strong></a>
</p>

## Running Locally

This application requires Node.js v18.20.1+.

### Cloning the repository to the local machine:

```bash
git clone https://github.com/nabarvn/semantic-search.git
cd semantic-search
```

### Installing the dependencies:

```bash
pnpm install
```

### Setting up the `.env` file:

```bash
cp .env.example .env
```

### Configuring Drizzle:

```bash
pnpm drizzle-kit push:pg
```

### Seeding the application:

```bash
pnpm drizzle:seed
```

### Running the application:

```bash
pnpm dev
```

## Tech Stack:

- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **ORM Toolkit**: [Drizzle](https://orm.drizzle.team/docs/overview)
- **Embedding Provider**: [OpenAI](https://platform.openai.com/docs/overview)
- **Vector Database**: [Upstash](https://upstash.com/docs/vector/overall/getstarted)
- **Postgres Database**: [Neon](https://neon.tech/docs/introduction/about)
- **Deployment**: [Vercel](https://vercel.com)

## Credits

Learned a ton while building this project. All thanks to Josh for the next level (no pun intended) tutorial!

<hr />

<div align="center">Don't forget to leave a STAR 🌟</div>
