import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>

        <link rel="icon" type="image/x-icon" href="/SVGs/LogoMobile.svg"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </Html>
  )
}
