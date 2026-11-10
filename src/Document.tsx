import type { ParentProps } from "solid-js";
import { HydrationScript } from "@solidjs/web";
import { getLocaleInfo } from "@rimelight/i18n";
import "/src/styles/kitty.css";
import "virtual:uno.css";
import "/src/styles/dashboard.css";
import "/src/styles/playful.css";

export default function Document(props: ParentProps) {
  return (
    <html
      lang={getLocaleInfo().tag}
      dir={getLocaleInfo().dir}
      class="font-sans [color-scheme:light] [&_*]:box-border"
    >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pomodoro Kitty</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <HydrationScript />
      </head>
      <body id="kitty-app" class="cozy-theme m-0 min-h-svh min-w-80">
        {props.children}
      </body>
    </html>
  );
}
