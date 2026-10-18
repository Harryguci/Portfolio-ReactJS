# PORTFOLIO by React Js

Author: Harryguci

## Stack

- Frontend: React + Vite
- Backend: ASP.NET Core (Blog API + CMS auth)
- Database: SQLite
- Deploy: build images locally → registry → Docker Compose pull/up on Ubuntu VPS

## Quick start (local)

```bash
pnpm install
pnpm dev:full
```

- Site: http://localhost:3000
- Blog: http://localhost:3000/blog
- CMS: http://localhost:3000/cms/login (`admin` / `changeme`)

See [DEPLOY.md](./DEPLOY.md) for Docker / VPS deployment.
