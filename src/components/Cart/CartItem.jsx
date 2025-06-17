
import { currencyFormatter } from '../../utils/formatting';

export default function CartItem({name, quantity, price, image, onDecrease, onIncrease}) {
    return <li className="cart-item">
        <p><img src={`http://localhost:3000/${image}`} alt={name} /> <strong>{name}</strong>&nbsp;- {quantity} x {currencyFormatter.format(price)}</p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}