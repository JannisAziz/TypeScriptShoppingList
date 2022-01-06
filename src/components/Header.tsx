import "./Header.css"

export default function Header (props: { title: string } ){

    return (
        <header className="header">
            {props.title}
        </header>
    )
}
