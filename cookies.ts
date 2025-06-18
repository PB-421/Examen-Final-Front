import { char } from "./types.tsx";

export function getFavoritos(): string[] {
  const cookies = document.cookie.split("; ");
  const favoritos = cookies.find((cookie) => cookie.trim().startsWith("favs="))
    ?.split("=")[1];
  if (favoritos) {
    const favs = favoritos.split(",");
    return favs;
  } else {
    return [];
  }
}

export function esFavorito(char: char): boolean {
  const cookies = document.cookie.split("; ");
  const favoritos = cookies.find((cookie) => cookie.trim().startsWith("favs="))
    ?.split("=")[1];
  if (favoritos) {
    const favs = favoritos.split(",");
    return favs.some((id) => id === char.id);
  } else {
    return false;
  }
}

export function addFavorito(char: char): void {
  const date = new Date();
  const expire = new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000)
    .toUTCString();
  const favs = getFavoritos();
  favs.push(char.id);
  document.cookie = `favs=${favs.join(",")}; path=/; expires=${expire}`;
}

export function eraseFavorito(char: char): void {
  const favs = getFavoritos();
  const filtrados = favs.filter((id) => id !== char.id);
  if (filtrados.length === 0) {
    const date = new Date();
    const expire = new Date(date.getTime() - 365 * 24 * 60 * 60 * 1000)
      .toUTCString();
    document.cookie = `favs=${filtrados.join(",")}; path=/; expires=${expire}`;
  } else {
    const date = new Date();
    const expire = new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000)
      .toUTCString();
    document.cookie = `favs=${filtrados.join(",")}; path=/; expires=${expire}`;
  }
}
