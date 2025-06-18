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
    GET: async (_req:Request,ctx:FreshContext<unknown,data>) => {
      const personajes = await getPersonajes()
      return ctx.render({chars:personajes})
    }
}

export default function Home(props:PageProps<data>) {
  const {chars} = props.data
  return (
    <CharList chars={chars}/>
  );
}
