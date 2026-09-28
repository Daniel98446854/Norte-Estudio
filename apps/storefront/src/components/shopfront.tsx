"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const products = [
  {
    id: "atlas",
    name: "Botella Atlas",
    category: "Accesorios",
    price: 28,
    shape: "bottle",
    bg: "#d8e4d7",
    object: "#315c46",
    detail: "#d7ec7a",
    tag: "Más vendido",
  },
  {
    id: "senda",
    name: "Vela Senda",
    category: "Hogar",
    price: 24,
    shape: "jar",
    bg: "#f0d5c7",
    object: "#e9b391",
    detail: "#315c46",
    tag: "Hecho a mano",
  },
  {
    id: "nube",
    name: "Crema Nube",
    category: "Cuidado",
    price: 19,
    shape: "jar",
    bg: "#e6e3cb",
    object: "#f4f3ed",
    detail: "#ef765c",
    tag: "",
  },
  {
    id: "sur",
    name: "Taza Sur",
    category: "Hogar",
    price: 32,
    shape: "mug",
    bg: "#d6dfec",
    object: "#5b7892",
    detail: "#d7ec7a",
    tag: "Edición corta",
  },
  {
    id: "bruma",
    name: "Jabón Bruma",
    category: "Cuidado",
    price: 12,
    shape: "jar",
    bg: "#edc5c0",
    object: "#c97867",
    detail: "#f4f3ed",
    tag: "",
  },
  {
    id: "terral",
    name: "Bolso Terral",
    category: "Accesorios",
    price: 46,
    shape: "bag",
    bg: "#e6d5ac",
    object: "#a37b47",
    detail: "#315c46",
    tag: "Nuevo",
  },
  {
    id: "oliva",
    name: "Cuenco Oliva",
    category: "Hogar",
    price: 36,
    shape: "bowl",
    bg: "#d9dfc7",
    object: "#74805a",
    detail: "#ef765c",
    tag: "",
  },
  {
    id: "calma",
    name: "Aceite Calma",
    category: "Cuidado",
    price: 22,
    shape: "bottle",
    bg: "#f0d6a8",
    object: "#bd8450",
    detail: "#315c46",
    tag: "",
  },
];

const categories = ["Todo", "Hogar", "Cuidado", "Accesorios"];
const money = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function Shopfront() {
  const [category, setCategory] = useState("Todo");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          category === "Todo" || product.category === category;
        const matchesSearch = product.name
          .toLocaleLowerCase("es")
          .includes(search.toLocaleLowerCase("es"));
        return matchesCategory && matchesSearch;
      }),
    [category, search],
  );
  const cartLines = products.filter((product) => cart[product.id]);
  const itemCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const subtotal = cartLines.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  );

  function addToCart(productId: string) {
    setOrderId("");
    setCart((current) => ({
      ...current,
      [productId]: Math.min((current[productId] ?? 0) + 1, 20),
    }));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutError("");
    setSubmitting(true);
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

    try {
      for (const product of cartLines) {
        const lineResponse = await fetch(`${apiUrl}/cart/lines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            quantity: cart[product.id],
          }),
        });
        if (!lineResponse.ok)
          throw new Error("No se pudo actualizar la cesta.");
      }

      const orderResponse = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerEmail }),
      });
      if (!orderResponse.ok) throw new Error("No se pudo crear el pedido.");
      const order = (await orderResponse.json()) as { id: string };
      setOrderId(order.id);
      setCart({});
    } catch {
      setCheckoutError(
        "No se pudo procesar el pedido. Comprueba que la API esté en ejecución.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="shop-shell">
      <div className="top-note">
        ENVÍO GRATUITO EN PEDIDOS SUPERIORES A 60 €
      </div>
      <header className="site-header">
        <a className="wordmark" href="#inicio">
          norte estudio
        </a>
        <nav className="header-links" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#nosotros">Nuestra mirada</a>
        </nav>
        <button
          className="cart-trigger"
          type="button"
          onClick={() => setCartOpen(true)}
          aria-label={`Abrir cesta, ${itemCount} artículos`}
        >
          Cesta <span className="cart-count">{itemCount}</span>
        </button>
      </header>

      <section className="intro" id="inicio">
        <div>
          <p className="eyebrow">Objetos con intención · Colección 01</p>
          <h1>
            Lo cotidiano,
            <br />
            <em>mejor elegido.</em>
          </h1>
        </div>
        <p className="intro-copy" id="nosotros">
          Piezas honestas, hechas para durar y acompañar los pequeños rituales
          de cada día. Diseñadas con calma, escogidas aquí.
        </p>
      </section>

      <section
        className="catalogue"
        id="coleccion"
        aria-label="Catálogo de productos"
      >
        <div className="catalogue-tools">
          <div
            className="filters"
            role="group"
            aria-label="Filtrar por categoría"
          >
            {categories.map((item) => (
              <button
                className="filter-button"
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            className="search-input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar en la colección"
            aria-label="Buscar productos"
          />
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article
              className="product-card"
              key={product.id}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div
                className={`product-art product-art--${product.shape}`}
                style={
                  {
                    "--art-bg": product.bg,
                    "--art-object": product.object,
                    "--art-detail": product.detail,
                  } as CSSProperties
                }
                role="img"
                aria-label={`${product.name}, objeto de diseño`}
              >
                {product.tag && (
                  <span className="product-tag">{product.tag}</span>
                )}
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <span className="product-price">
                  {money.format(product.price)}
                </span>
                <span className="product-category">{product.category}</span>
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  Añadir a la cesta
                </button>
              </div>
            </article>
          ))}
          {visibleProducts.length === 0 && (
            <p className="empty-state">
              No encontramos productos con esa búsqueda.
            </p>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <span>norte estudio · Objetos para todos los días</span>
        <span>Diseñado para durar.</span>
      </footer>

      {cartOpen && (
        <aside
          className="cart-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          <div className="cart-heading">
            <h2 id="cart-title">Tu cesta ({itemCount})</h2>
            <button
              className="close-cart"
              type="button"
              onClick={() => setCartOpen(false)}
              aria-label="Cerrar cesta"
            >
              ×
            </button>
          </div>
          {orderId ? (
            <div className="order-success">
              <p className="eyebrow">Pedido recibido</p>
              <p>
                Gracias por tu compra. Tu referencia es{" "}
                <strong>{orderId.slice(0, 8)}</strong>.
              </p>
              <button
                className="checkout-button"
                type="button"
                onClick={() => setCartOpen(false)}
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <>
              <div className="cart-lines">
                {cartLines.length === 0 ? (
                  <p className="empty-state">
                    Tu cesta está esperando algo bonito.
                  </p>
                ) : (
                  cartLines.map((product) => (
                    <div className="cart-line" key={product.id}>
                      <span>
                        {product.name}
                        <small>Cantidad: {cart[product.id]}</small>
                      </span>
                      <strong>
                        {money.format(product.price * cart[product.id])}
                      </strong>
                    </div>
                  ))
                )}
              </div>
              <form className="checkout-form" onSubmit={submitOrder}>
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>{money.format(subtotal)}</span>
                </div>
                <label>
                  Nombre
                  <input
                    required
                    minLength={2}
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </label>
                <label>
                  Correo electrónico
                  <input
                    required
                    type="email"
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                  />
                </label>
                {checkoutError && (
                  <p className="checkout-error" role="alert">
                    {checkoutError}
                  </p>
                )}
                <button
                  className="checkout-button"
                  type="submit"
                  disabled={itemCount === 0 || submitting}
                >
                  {submitting
                    ? "Procesando pedido…"
                    : "Crear pedido de demostración"}
                </button>
              </form>
            </>
          )}
        </aside>
      )}
    </main>
  );
}
