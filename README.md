A project using [CoinGecko's API](https://www.coingecko.com/en/api) to display a list of knwon exchanges and some information about them inlcuding social media links.

## Stack
- [Next.js](https://nextjs.org)
- [WindiCSS](https://windicss.org)
- [TypeScript](https://www.typescriptlang.org)

## Commands

After installing using `npm install` the following comands are  available 

```bash
npm run dev #run the development server 
```

```bash
npm run build #generate the production build
```

```bash
npm run format #format the projet using prettier
```

```bash
npm run lint #run eslint on the project 
```

```bash
npm run e2e #run integration tests using cypress
```
## Routes

`/`: show the first 10 exchanges ranked by the trust score

`/?page={page}`: show the specific page of the exchanges

`/exchange/{exchange_id}`: show more details about a specific exchange 