The primary mark: official black letterforms on paper. Vector by default — exact at any size, no font needed. Pass `vector={false}` when the wordmark must be editable copy.

```jsx
<div style={{ background: 'var(--surface-page)', padding: 'var(--pad-hero)' }}>
  <Wordmark size="lg" showSubtitle tagline="Horneada como allá, gozada como acá" />
</div>
```

Variants: `size` sm/md/lg/xl or a raw px number; `showSubtitle` adds "Pizzería"; `tagline` adds the terracota Bungee line; `print={false}` drops the offset shadow for light backgrounds. The colour split is fixed — never recolour it.
