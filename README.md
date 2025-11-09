# MLH Global Hack Week: API Week — Express Starter (with CRUD + CORS)

Minimal Express API with health/hello/joke endpoints, **toggleable in-memory Tasks CRUD**, and **CORS** enabled.

## Endpoints
- `GET /health` → `{ "status": "ok" }`
- `GET /hello?name=Prince` → `{ "message": "Hello, Prince" }`
- `GET /joke` → Two-part joke with deterministic fallback
- **(Toggle)** `GET /tasks` → `{ tasks: [...] }`
- **(Toggle)** `POST /tasks` → `{ id, text, done }` (JSON body: `{ text: string }`)
- **(Toggle)** `PATCH /tasks/:id` → Update `{ text?, done? }`
- **(Toggle)** `DELETE /tasks/:id`

## Toggle Tasks On/Off
Controlled by env var **`TASKS_ENABLED`** (default `true`).

**Windows PowerShell (current session)**
```powershell
$env:TASKS_ENABLED = "false"; npm start   # disable
$env:TASKS_ENABLED = "true"; npm start    # enable
```

**Render**: set `TASKS_ENABLED` in "Environment" to `true` or `false` (default is `true` via `render.yaml`).

## Local Setup
```bash
npm install
npm start
# http://localhost:3000/health
```

## Deploy to Render
Click the button or create a Web Service from this repo. Render uses `render.yaml`.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Run on Replit
Import this repo → it runs `npm start`. API path shows in the webview.

## Notes
- CORS is enabled globally via the `cors` package.
- In-memory tasks reset on each deploy/restart (sufficient for GHW daily challenges).
