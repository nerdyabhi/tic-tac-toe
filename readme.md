## How to install tailwind CSS (like a pro)

1. npm install -D tailwindcss postcss autoprefixer vite
2. npx tailwindcss init -p
3. Add '\*' in content of tailwind config file
4. create main.css and insert

   - @tailwind base;
   - @tailwind components;
   - @tailwind utilities;

5. After all this , run `npm run start` on terminal.

### Package.json will look like this

```json
{
  "scripts": {
    "start": "vite"
  },
  "devDependencies": {
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "vite": "^5.3.4"
  },
  "dependencies": {
    "autoprefixer": "^10.4.19"
  }
}
```

### Tailwind.config.js will look like this

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
