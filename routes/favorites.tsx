import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharList from "../components/charlist.tsx";
import { char } from "../types.tsx";

async function getPersonajes():Promise<char[]> {
  const data = await fetch("https://hp-api.onrender.com/api/characters")
  if(data.status!==200) throw new Error("Api error")
  const response = await data.json()
  return response
}
type data = {
  chars:char[]
}

export const handler:Handlers<data> = {
    GET: async (req:Request,ctx:FreshContext<unknown,data>) => {
      const personajesOG = await getPersonajes()
      const headers = req.headers
      const favs = headers.get("Cookie")?.split("; ").find((cookie) => cookie.trim().startsWith("favs="))?.split("=")[1].split(",")
      if(favs){
      const personajesFiltrados = personajesOG.filter((char) => favs?.includes(char.id))
      return ctx.render({chars:personajesFiltrados})
      } else {
        return ctx.render({chars: []})
      }
    }
}

export default function Home(props:PageProps<data>) {
  const {chars} = props.data
  return (
    <CharList chars={chars} />
  );
}