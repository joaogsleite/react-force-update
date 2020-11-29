# react-force-update

React helper package to force components to re-render

### Example usage:

* Cart service:

```typescript
import ForceUpdate from "react-force-update"

const { forceUpdate, useForceUpdate } = ForceUpdate()

const cart = []

export function addToCart(product) {
  cart.push(product)
  forceUpdate()
}

export function useCart() {
  useForceUpdate()
  return cart
}
```

* Cart Component:

```tsx
import { addToCart, useCart } from "../services/cart"

function Cart() {
  const cart = useCart()
  const handleClick = useCallback(() => {
    addToCart('Another item')
  }, [])
  return (
    <div className="container">
      <main>
        <h1>Your cart</h1>
        <ul>
          {cart.map((item, index) =>
            <li key={index}>{item}</li>
          )}
        </ul>
        <button onClick={handleClick}>
          Add to cart
        </button>
      </main>
    </div>
  )
}
```