# Client

React 19 + Vite frontend for the public Kabalan construction site and the
protected `/admin` content-management portal.

## Development

From the repository root, start the client and API together:

```bash
npm run dev
```

The client runs at http://localhost:5173 and proxies `/api` and `/uploads` to
the Express server on port 5000.

To run only the client:

```bash
npm install
npm run dev
```

If the API is hosted on a different origin, copy `.env.example` to `.env` and set
`VITE_API_URL` to the API base URL.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite               |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint               |

See the root [`README.md`](../README.md) for full setup, database, and admin
instructions.
