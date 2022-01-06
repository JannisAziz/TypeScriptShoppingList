import ShoppingListItem from "../models/ShoppingListItem";
import {MouseEventHandler} from "react";

export default function ItemCard({item, onUpdateItemCount, onRemoveItem}: {item: ShoppingListItem, onUpdateItemCount: Function, onRemoveItem: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div>
            {item.name} x
            <input type="number" value={item.count || 1} onChange={(e) => onUpdateItemCount(item, e.target.value)} />
            <button onClick={onRemoveItem}>Remove</button>
        </div>
    )
}