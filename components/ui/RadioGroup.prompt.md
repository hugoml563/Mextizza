A required single-choice group. Nothing is preselected on purpose: `value === null` is the signal that the form is incomplete, so the submit button stays disabled until the customer answers.

```jsx
const [pago, setPago] = React.useState(null);
const [tried, setTried] = React.useState(false);

<RadioGroup label="Forma de pago" required
  options={['Efectivo', 'Transferencia', 'Tarjeta']}
  value={pago} onChange={setPago}
  invalid={tried && !pago}
  hint={tried && !pago ? 'Elige una forma de pago para continuar.' : 'Se cobra al entregar.'} />
```
