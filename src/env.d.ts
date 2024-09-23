/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL: string;
  readonly PUBLIC_GOOGLE_MID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
