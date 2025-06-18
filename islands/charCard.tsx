import { useEffect, useState } from "preact/hooks";
import { char } from "../types.tsx";
import { addFavorito, eraseFavorito, esFavorito } from "../cookies.ts";

type data = {
    char:char
}

export default function CharCard({char}:data){
    const [fav,setFav] = useState<boolean>(false)
    const [first,setFirst] = useState<boolean>(true)

    useEffect(() => {
        console.log(fav)
        if(first){
            setFirst(false)
            setFav(esFavorito(char))
        }else {
            if(!fav){
                eraseFavorito(char)
            } else {
                addFavorito(char)
            }
        }
    },[fav])

    return(
        <div class="card">
            {char.image !== ""&& <img src={char.image} alt={char.name} />}
            {char.image === "" && <img src="../no-image.jpg" alt={char.name} />}
            <div class="card-info">
                <a class="name" href={"/characters/"+char.id}>{char.name}</a>
                {fav && <span class="star fav" onClick={() => setFav(false)}>★<div></div></span>}
                {!fav && <span class="star" onClick={() => setFav(true)}>★<div></div></span>}
            </div>
        </div>
    )
}