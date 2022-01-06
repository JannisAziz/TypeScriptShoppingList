import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import ShoppingListItem from "../models/ShoppingListItem";

export default function ShoppingList(){

    const [userInput, setUserInput] = useState('')
    const updateInput = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        setUserInput(inputEvent.target.value)
    }

    const ITEM_LIST_KEY = "ITEM_STORE"
    const [items, setItems] = useState<ShoppingListItem[]>(JSON.parse(localStorage.getItem(ITEM_LIST_KEY) as string) || [])

    useEffect(() => {
        localStorage.setItem(ITEM_LIST_KEY, JSON.stringify(items));
    }, [items]);

    const addNewItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newItem: ShoppingListItem = {
            id: uuidv4(),
            name: userInput
        }

        setItems( [...items, newItem] )

        setUserInput('')
    }
    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    //DONT NEED THIS?!
    const getItemCount = (currentItem: ShoppingListItem) => {
         return items.filter( item => item === currentItem )[0].count || 1
    }

    const updateItemCount = (itemToChange: ShoppingListItem, newCount: number) => {
        const tmpItems = [...items]

        const itemIndex = tmpItems.findIndex(item => item === itemToChange)

        tmpItems.filter( item => item !== itemToChange)

        tmpItems[itemIndex] = {
            ...tmpItems[itemIndex],
            count: newCount
        }

        setItems(tmpItems)
    }

    return (
        <article className="article">
            <ul>
                {items.map( (item, id) => (
                    <li key={id}>
                        {item.name} x
                        <input type="number" value={item.count || 1} onChange={(e) => updateItemCount(item, e.target.value as unknown as number)} />
                        <button onClick={()=>{removeItem(item.id)}}>Remove</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={addNewItem}>
                <input value={userInput} onChange={updateInput} placeholder="new item here" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                <button type="submit">ADD</button>
            </form>
        </article>
    )
}



