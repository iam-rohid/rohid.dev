/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL: string;
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
