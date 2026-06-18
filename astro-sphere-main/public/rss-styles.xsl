<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> — Flux RSS</title>
        <style>
          :root { color-scheme: light dark; }
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 32px 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6; color: #111; background: #fff;
          }
          .wrap { max-width: 680px; margin: 0 auto; }
          .badge {
            display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .08em;
            text-transform: uppercase; padding: 4px 10px; border-radius: 999px;
            background: #111; color: #fff;
          }
          h1 { font-size: 28px; margin: 16px 0 4px; }
          .desc { margin: 0; opacity: .75; }
          .hint {
            margin-top: 20px; padding: 12px 14px; border-radius: 10px;
            background: rgba(128,128,128,.12); font-size: 14px;
          }
          .hint a { color: inherit; font-weight: 600; }
          main { margin-top: 28px; border-top: 1px solid rgba(128,128,128,.25); }
          article { padding: 20px 0; border-bottom: 1px solid rgba(128,128,128,.18); }
          h2 { font-size: 19px; margin: 0 0 4px; }
          h2 a { color: inherit; text-decoration: none; }
          h2 a:hover { text-decoration: underline; }
          .date { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; opacity: .55; }
          .summary { margin: 0; opacity: .85; }
          footer { margin-top: 24px; font-size: 13px; opacity: .6; text-align: center; }
          @media (prefers-color-scheme: dark) {
            body { color: #f2f2f2; background: #0b0b0c; }
            .badge { background: #f2f2f2; color: #0b0b0c; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <span class="badge">Flux RSS</span>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
            <p class="hint">
              📡 Ceci est un <strong>flux RSS</strong> : copie l'adresse de cette page dans un lecteur de flux (Feedly, NetNewsWire…) pour être notifié de mes nouveaux projets et articles —
              <a>
                <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
                ou retourne au site
              </a>.
            </p>
          </header>
          <main>
            <xsl:for-each select="/rss/channel/item">
              <article>
                <h2>
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="date"><xsl:value-of select="pubDate"/></p>
                <p class="summary"><xsl:value-of select="description"/></p>
              </article>
            </xsl:for-each>
          </main>
          <footer>
            <a>
              <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
              <xsl:value-of select="/rss/channel/title"/>
            </a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
