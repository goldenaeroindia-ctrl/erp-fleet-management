## Fleet Auth System

Full-stack role-based auth powered by:

- **Frontend:** Next.js 16 + App Router + Tailwind
- **Backend:** Express + MongoDB + JWT + cookie auth
- **Roles:** `ADMIN` (full control) and `MANAGER` (Excel workflow only)

---

## Environment

Create a `.env` file in the project root with at least:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=super-secret-string
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000
```

`NEXT_PUBLIC_API_URL` feeds client-side fetch calls, while `FRONTEND_URL` lets the Express server configure CORS + cookies.

---

## Scripts

Run both servers in separate terminals:

```bash
# 1) Next.js frontend (http://localhost:3000)
npm run dev

# 2) Express API (http://localhost:5000)
npm run server
```

---

## Backend API

| Method | Route           | Description                            | Access   |
|--------|-----------------|----------------------------------------|----------|
| POST   | `/auth/signup`  | Public manager signup (role locked)    | Public   |
| POST   | `/auth/login`   | Login, issues JWT httpOnly cookie      | Public   |
| POST   | `/auth/logout`  | Clear auth cookie                      | Auth     |
| GET    | `/auth/me`      | Returns current user profile           | Auth     |
| POST   | `/users/create` | Create Admin or Manager                | Admin    |
| GET    | `/users`        | List all users                         | Admin    |

JWT payload = `{ id, role }`, valid for 7 days, stored in `token` httpOnly cookie.

---

## Frontend Routes & Guards

- Public: `/`, `/login`, `/signup`
- Admin only: `/admin/**`, `/create-user`, `/user-list`, `/settings`
- Manager only: `/manager/**`, `/upload`, `/excel-edit`

`middleware.ts` verifies the JWT on every protected route using the shared `JWT_SECRET`. Users are redirected to `/login` when missing/invalid tokens, or to their own dashboard if they try to hit an unauthorized route.

---

## Role Logic

- **Managers**
  - Can self-signup
  - Access Excel upload + edit tools
- **Admins**
  - Cannot signup publicly
  - Must be created by an existing Admin via `/create-user`
  - Can create Admins/Managers, view roster, manage settings

---

## Next Steps

- Wire upload + Excel edit pages to actual APIs/storage
- Add analytics for dashboard stats
- Extend `/settings` to persist platform preferences
- Introduce email invites + password reset flows

The current codebase already handles secure auth, cookies, route permissions, and UI for both roles—plug in your business logic where indicated. Enjoy! 🎯

