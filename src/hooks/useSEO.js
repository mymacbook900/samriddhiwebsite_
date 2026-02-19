// src/hooks/useSEO.js
import { useEffect } from "react";

export default function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);
  }, [title, description]);
}
