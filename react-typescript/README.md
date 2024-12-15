# React TypeScript Handleiding

Hier leer je hoe je een React-project opzet met Vite en TypeScript en hoe je TypeScript effectief kunt gebruiken binnen React.

---

## Een React-project opzetten met Vite en TypeScript

Vite is een snelle build-tool die perfect werkt met React en TypeScript.

### Stappenplan:

1. **Maak een nieuw Vite-project aan**:

   ```bash
   yarn create vite mijn-react-app --template react-ts
   ```

2. **Navigeer naar de projectmap**:

   ```bash
   cd mijn-react-app
   ```

3. **Installeer afhankelijkheden**:

   ```bash
   yarn
   ```

4. **Start de ontwikkelserver**:
   ```bash
   yarn dev
   ```

---

## TypeScript Gebruiken in React

### Typing van Props

Gebruik interfaces of type aliases om de props van een component te typeren.

#### Voorbeeld met een functioneel component:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps): React.ReactNode => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Typing van State

Gebruik `useState` met een expliciet type:

```typescript
import { useState } from "react";

const Counter = (): React.ReactNode => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Typing van Events

TypeScript biedt ingebouwde typen voor events zoals `MouseEvent` en `ChangeEvent`.

#### Voorbeeld: MouseEvent

Gebruik `MouseEvent` voor click-events:

```typescript
const ClickButton = (): React.ReactNode => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked!", event.clientX, event.clientY);
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

#### Voorbeeld: ChangeEvent

Gebruik `ChangeEvent` voor input-events:

```typescript
const InputField = (): React.ReactNode => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input type="text" onChange={handleChange} />;
};
```

TypeScript biedt ingebouwde typen voor events zoals `MouseEvent` en `ChangeEvent`.

```typescript
const InputField = (): React.ReactNode => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input type="text" onChange={handleChange} />;
};
```

### Typing van Context

Maak een context met een type voor betere typeveiligheid.

```typescript
import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export { ThemeProvider, useTheme };
```

---

## ReactNode, ReactElement, en hun Verschillen

### Wat is `ReactNode`?

`ReactNode` is een TypeScript-type dat alles beschrijft wat React kan renderen. Dit omvat:

- Strings: `"hello"`
- Numbers: `123`
- Booleans (maar alleen `null` en `false` worden gerenderd als niets): `false`
- `ReactElement` objecten
- `null` of `undefined`
- Arrays van bovengenoemde waarden

### Wat is `ReactElement`?

`ReactElement` is een specifiek type dat wordt gebruikt om een React-component of HTML-element te beschrijven, inclusief de props en children. Dit type wordt vaak geretourneerd door JSX.

### Verschillen tussen `ReactNode` en `ReactElement`

- **`ReactNode`**: Beschrijft _alles_ wat React kan renderen.
- **`ReactElement`**: Beschrijft alleen een specifiek React-element.

#### Voorbeeld:

```typescript
const element: ReactElement = <div>Hello</div>;
const node: ReactNode = "Hello";
const anotherNode: ReactNode = <div>{node}</div>;
```

Gebruik `ReactNode` als de returnwaarde flexibel moet zijn.

---

## Generics Gebruiken in React

Generics maken je code flexibeler, ook in React-componenten.

### Generics in Componenten

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T>({ items, renderItem }: ListProps<T>): React.ReactNode => {
  return <ul>{items.map(renderItem)}</ul>;
};

const App = (): React.ReactNode => {
  const numbers = [1, 2, 3];

  return (
    <List
      items={numbers}
      renderItem={(number) => <li key={number}>{number}</li>}
    />
  );
};
```

---

## Aanvullende Informatie

### Handige Links

- [TypeScript Documentatie](https://www.typescriptlang.org/docs/)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Vite Documentatie](https://vitejs.dev/guide/)
