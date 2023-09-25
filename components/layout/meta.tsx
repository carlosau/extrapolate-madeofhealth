import Head from "next/head";

const DOMAIN = "https://myskin.madeofhealth.com";

export default function Meta({
  title = "MadeOfHealth - promoting your health and well-being",
  description = "MadeOfHealth is a website with the best articles and videos about health, beauty and well-being.",
  image = `${DOMAIN}/madeofhealth-logo.png`,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content={image} />
      <meta property="og:logo" content={`${DOMAIN}/madeofhealth-logo.png`}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://myskin.madeofhealth.com/thumbnail-wp-saudetube-minhapele.png" />
    </Head>
  );
}
