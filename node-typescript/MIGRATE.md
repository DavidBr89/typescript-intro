# Handleiding: Een bestaande Express-applicatie aanpassen naar TypeScript

In deze handleiding leer je hoe je een bestaande Express-applicatie kunt migreren naar TypeScript.

---

## Stappenplan voor migratie

### 1. Installeer TypeScript en benodigdheden

Voeg TypeScript en de benodigde type-definities toe aan je project:

```bash
yarn add typescript ts-node @types/node @types/express -D
```

### 2. Initialiseer TypeScript

Genereer een TypeScript-configuratiebestand:

```bash
tsc --init
```

Pas de `tsconfig.json` aan:

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

### 3. Herstructureer de bestanden

Verplaats al je JavaScript-bestanden naar een nieuwe `src/` map en wijzig de extensies van `.js` naar `.ts`.

Voorbeeld projectstructuur:

```
src/
├── routes/
│   └── index.ts
├── controllers/
│   └── userController.ts
├── middleware/
│   └── errorMiddleware.ts
├── app.ts
└── server.ts
```

### 4. Update Express-imports en Types

In elk bestand waar `Express` wordt gebruikt, voeg je de juiste types toe:

#### Voorbeeld: `app.ts`

```typescript
import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use("/api", routes);

export default app;
```

#### Voorbeeld: `server.ts`

```typescript
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
```

### 5. Voeg type-definities toe aan middleware en controllers

#### Middleware

Gebruik het `Request`, `Response`, en `NextFunction` type voor je middleware.

```typescript
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).send("Interne serverfout");
};
```

#### Controller

Typ de parameters en retourwaarden expliciet:

```typescript
import { Request, Response } from "express";

export const getUser = (req: Request, res: Response): void => {
  const userId = req.params.id;
  res.json({ id: userId, name: "John Doe" });
};
```

### 6. Voeg type-ondersteuning toe voor externe bibliotheken

Voor externe middleware zoals `cors`, `helmet`, of `jsonwebtoken`, installeer je de type-definities:

```bash
yarn add @types/cors @types/helmet @types/jsonwebtoken -D
```

Gebruik de geïnstalleerde types in je code:

```typescript
import cors from "cors";
import helmet from "helmet";

app.use(cors());
app.use(helmet());
```

### 7. Bouw en voer het project uit met Nodemon

Tijdens ontwikkeling kun je `nodemon` gebruiken om wijzigingen automatisch te detecteren en je server te herstarten. Nodemon werkt goed samen met `ts-node` voor TypeScript.

1. **Installeer Nodemon**:

   ```bash
   yarn add nodemon -D
   ```

2. **Configureer Nodemon**:
   Maak een bestand `nodemon.json` in de root van je project:

   ```json
   {
     "watch": ["src"],
     "ext": "ts",
     "ignore": ["dist"],
     "exec": "ts-node ./src/server.ts"
   }
   ```

3. **Pas je scripts aan in `package.json`**:

   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/server.js",
     "dev": "nodemon"
   }
   ```

4. **Start de ontwikkelserver**:
   Gebruik het volgende commando om je server in ontwikkelmodus te draaien:
   ```bash
   yarn dev
   ```

Wanneer je nu wijzigingen aanbrengt in je TypeScript-bestanden, zal Nodemon automatisch je server herstarten.

Voeg de volgende scripts toe aan je `package.json`:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "ts-node src/server.ts"
}
```

Gebruik `yarn build` om de TypeScript-code te compileren naar JavaScript en voer de server uit met:

```bash
yarn start
```

Voor ontwikkelmodus gebruik je:

```bash
yarn dev
```

---

## Veelvoorkomende issues

1. **`Cannot find module` fout**:
   Zorg ervoor dat de juiste type-definities zijn geïnstalleerd (bijvoorbeeld `@types/express`).

2. **Configuratiefouten**:
   Controleer of het pad naar `rootDir` en `outDir` in je `tsconfig.json` correct is ingesteld.

3. **Externe bibliotheken zonder typen**:
   Voeg een eigen `.d.ts` bestand toe om ontbrekende typen te definiëren.

---

Met deze stappen kun je je bestaande Express-applicatie succesvol migreren naar TypeScript. Laat weten of je meer hulp nodig hebt!
