import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon classique */}
        <link rel="icon" href="/favicons/favicon.ico" />

        {/* PNG modernes */}
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/web-app-manifest-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/web-app-manifest-512x512.png"
        />

        {/* Apple iOS */}
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />

        {/* Web manifest */}
        <link rel="manifest" href="/favicons/site.webmanifest" />

        {/* Windows / Chrome theme colors */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
