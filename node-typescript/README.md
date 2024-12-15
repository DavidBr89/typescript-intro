# Express + TypeScript Handleiding (Express 5)

Hier leer je hoe je een Express 5-project opzet met TypeScript en gebruik maakt van populaire middleware zoals `bcrypt`, `cors`, `helmet`, en `express-validator`. Ook wordt uitgelegd hoe je routes, controllers en middleware structureert in aparte bestanden met type-veiligheid.

---

## Een Express 5-project opzetten met TypeScript

### Stappenplan:

1. **Maak een nieuw project aan**:

   ```bash
   mkdir mijn-express-app && cd mijn-express-app
   yarn init -y
   ```

2. **Installeer benodigde pakketten**:

   ```bash
   yarn add express bcrypt cors helmet express-validator jsonwebtoken dotenv
   yarn add -D typescript ts-node @types/node @types/express @types/bcrypt @types/cors @types/helmet @types/jsonwebtoken @types/express-validator nodemon
   ```

3. **Initialiseer TypeScript**:

   ```bash
   tsc --init
   ```

4. **Pas de `tsconfig.json` aan**:
   Zorg dat je de volgende configuratie hebt:

   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "CommonJS",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

5. **Projectstructuur**:
   Maak de volgende structuur:

   ```
   src/
   ├── controllers/
   │   └── authController.ts
   ├── middleware/
   │   ├── authMiddleware.ts
   │   └── errorMiddleware.ts
   ├── routes/
   │   └── authRoutes.ts
   ├── app.ts
   └── server.ts
   ```

6. **Startscripts toevoegen**:
   Voeg de volgende scripts toe aan je `package.json`:

   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/server.js",
     "dev": "nodemon src/server.ts"
   }
   ```

7. **Start de ontwikkelserver**:
   ```bash
   yarn dev
   ```

---

## Codevoorbeelden

### `app.ts`

De centrale configuratie van Express:

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);

export default app;
```

### `server.ts`

De entry point van de applicatie:

```typescript
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
```

### Routes: `authRoutes.ts`

Definieer routes en koppel ze aan controllers:

```typescript
import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
```

### Controllers: `authController.ts`

Definieer de logica van je routes met Express 5 async ondersteuning:

```typescript
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Alle velden zijn verplicht" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // Sla de gebruiker op in de database (mockvoorbeeld)

  res.status(201).json({ message: "Gebruiker geregistreerd" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Alle velden zijn verplicht" });
    return;
  }

  // Controleer de gebruiker in de database (mockvoorbeeld)
  const isMatch = await bcrypt.compare(password, "mockHashedPassword");

  if (!isMatch) {
    res.status(401).json({ message: "Ongeldige inloggegevens" });
    return;
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};
```

### Middleware: `authMiddleware.ts`

Controleer of een token aanwezig is:

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Geen token geleverd" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Ongeldige token" });
  }
};
```

---

## Veelgebruikte Types

### Request en Response

```typescript
import { Request, Response } from "express";
```

### Middleware

```typescript
import { NextFunction } from "express";
```

### Router

```typescript
import { Router } from "express";
```

Met deze structuur en voorbeelden ben je klaar om een veilige en schaalbare Express 5-applicatie te bouwen met TypeScript. Laat weten of er aanvullingen nodig zijn!
