declare module 'date-fns/locale/*' {
  const locale: any
  export default locale
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module 'transliterate' {
  interface TransliterateOptions {
    from?: string;
    to?: string;
  }

  function transliterate(word: string, options?: TransliterateOptions): string;
  export default transliterate;
}

declare module 'sanscript' {
  interface Sanscript {
    t(text: string, from: string, to: string): string;
  }

  const Sanscript: Sanscript;
  export default Sanscript;
}

/// <reference types="vite/client" />

// types/import-meta.d.ts
declare module 'import-meta' {
  export interface ImportMeta {
    env: {
      [key: string]: string;
    };
  }
}