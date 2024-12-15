# Handleiding: Een bestaande Vite React-applicatie aanpassen naar TypeScript

In deze handleiding leer je hoe je een bestaande Vite React-applicatie kunt migreren naar TypeScript.

---

## Stappenplan voor migratie

### 1. Installeer TypeScript en benodigde pakketten

Voeg TypeScript en de type-definities voor React toe aan je project:

```bash
yarn add typescript @types/react @types/react-dom -D
```

---

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
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

### 3. Wijzig bestandsextensies

Verander de extensies van je React-bestanden van `.jsx` naar `.tsx`:

```bash
mv src/index.jsx src/index.tsx
mv src/App.jsx src/App.tsx
```

Doe hetzelfde voor andere bestanden die React-componenten bevatten.

---

### 4. Typing van je bestanden

Pas de bestanden aan om typefouten te voorkomen.

#### Voorbeeld: `src/App.tsx`

```typescript
import React from "react";

interface AppProps {
  title?: string; // Optioneel prop
}

const App: React.FC<AppProps> = ({ title = "Mijn App" }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default App;
```

#### Voorbeeld: `src/main.tsx`

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App title="Welkom!" />
  </React.StrictMode>
);
```

---

### 5. Voeg type-ondersteuning toe voor externe bibliotheken

Als je externe bibliotheken zoals `react-router-dom` gebruikt, installeer je de type-definities:

```bash
yarn add @types/react-router-dom -D
```

Pas je routes aan om typen te gebruiken:

```typescript
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const App = (): React.ReactNode => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

### 6. Pas de scripts in `package.json` aan

Werk je scripts bij om TypeScript te ondersteunen:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

---

### 7. Optionele configuraties

#### Gebruik van aliassen

Met de bovenstaande `tsconfig.json` kun je aliassen instellen voor eenvoudiger imports:

```typescript
import Component from "@/components/Component";
```

Pas ook `vite.config.ts` aan:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

### 8. Test je project

Start de ontwikkelserver:

```bash
yarn dev
```

Bouw het project om er zeker van te zijn dat alles correct werkt:

```bash
yarn build
```

---

## Veelvoorkomende problemen

1. **Typefouten in componenten**:
   Controleer of je props correct hebt getypt en alle externe bibliotheken de juiste type-definities hebben.

2. **Configuratiefouten**:
   Zorg ervoor dat je `tsconfig.json` en `vite.config.ts` correct zijn ingesteld.

3. **`Cannot find module` fouten**:
   Controleer of alle bestanden de juiste extensie hebben (.tsx/.ts).

---

Met deze stappen kun je je bestaande Vite React-applicatie succesvol migreren naar TypeScript. Laat weten of je meer hulp nodig hebt!
