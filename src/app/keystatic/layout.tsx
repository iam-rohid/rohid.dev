import { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Keystatic",
};
export default function RootLayout() {
  return (
    <html>
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
