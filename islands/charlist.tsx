import CharCard from "./charCard.tsx";
import { char } from "../types.tsx";


type data = {
    chars:char[]
}

export default function CharList({chars}:data){
    return(
        <div class="grid">
            {chars.length === 0 && <h3>No hay favoritos</h3>}
            {chars.map((char) => (<div> <CharCard char={char} /></div>))}
        </div>
    )
}