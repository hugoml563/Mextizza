The illustrated mark. `pala` for headers (peel + cutter above the letters), `completo` for the full lockup with the ingredient icons — use `completo` in the places that used to carry a `DotRow` under the wordmark.

```jsx
<Lockup variant="pala" size={28} align="left" base="../../" />

<Lockup variant="completo" tone="hueso" size={52} base="../../"
  subtitle="Pizzería" tagline="Horneada como allá, gozada como acá" />
```

`size` is the letter cap height, so the two variants line up at the same value.
