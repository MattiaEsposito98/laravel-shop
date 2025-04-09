import style from './Card.module.css'

export default function Card({ product }) {
  console.log(product)
  const randomImg = 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <>
      <div className={style.card}>
        <img src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : randomImg} alt={product.name} className={style.img} />
        <div className={style.cardDetails}>
          <h4>{product.name}</h4>
          <p><strong>Prezzo:</strong> {product.price}€</p>
        </div>

      </div>
    </>
  )
}