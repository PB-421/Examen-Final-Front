import { char } from "../types.tsx";
import { useEffect, useState } from "preact/hooks";
import { addFavorito, eraseFavorito, esFavorito } from "../cookies.ts";

type data = {
  char: char;
};

export default function CharDetail({ char }: data) {
  const [fav, setFav] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    console.log(fav);
    if (first) {
      setFirst(false);
      setFav(esFavorito(char));
    } else {
      if (!fav) {
        eraseFavorito(char);
      } else {
        addFavorito(char);
      }
    }
  }, [fav]);

  return (
    <div class="detail">
      {char.image !== "" && <img src={char.image} alt={char.name} />}
      {char.image === "" && <img src="../no-image.jpg" alt={char.name} />}
      <h2>
        {char.name} {fav && (
          <span
            class="star fav"
            onClick={() => setFav(false)}
          >
            ★<div></div>
          </span>
        )}
        {!fav && (
          <span
            class="star"
            onClick={() => setFav(true)}
          >
            ★<div></div>
          </span>
        )}
      </h2>
      {char.house !== "" && <p>Casa: {char.house}</p>}
      {char.house === "" && <p>Casa: Desconocida</p>}
      {char.alive && <p>Estado: Vivo</p>}
      {!char.alive && <p>Estado: Muerto</p>}
      <a href="/">Volver</a>
    </div>
  );
}
