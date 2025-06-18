import { Handlers,FreshContext,PageProps } from "$fresh/server.ts";
import CharDetail from "../../islands/charDetail.tsx";
import { char } from "../../types.tsx";

type data = {
    char: char
}

async function getPersonaje(id: string):Promise<char> {
    const data = await fetch("https://hp-api.onrender.com/api/character/"+id)
    if(data.status!==200) throw new Error("Api error")
    const response = await data.json()
    return response[0]
}

export const handler:Handlers<data> = {
    GET: async (_req: Request,ctx: FreshContext<unknown,data>) => {
        const {id} = ctx.params
        const personaje = await getPersonaje(id)
        return ctx.render({char: personaje})
    }
}

export default function Page(props:PageProps<data>){
    const {char} = props.data

    return(
        <CharDetail char={char} />
    )
}