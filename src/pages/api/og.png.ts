import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import OgImage from "./_og-image";
import { readFileSync } from "fs";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const Inter_24ptRegular = readFileSync(
    `${process.cwd()}/public/fonts/Inter_24pt-Regular.ttf`,
  );
  const Inter_24ptSemiBold = readFileSync(
    `${process.cwd()}/public/fonts/Inter_24pt-SemiBold.ttf`,
  );

  const title = url.searchParams.get("title") ?? "The default title";

  return new ImageResponse(
    OgImage({
      title,
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter Regular",
          data: Inter_24ptRegular,
          style: "normal",
        },
        {
          name: "Inter SemiBold",
          data: Inter_24ptSemiBold,
          style: "normal",
        },
      ],
    },
  );
};
