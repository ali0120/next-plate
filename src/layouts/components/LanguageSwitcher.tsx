import config from "@/config/config.json";
import languages from "@/config/language.json";
import { getDefaultLanguage } from "@/lib/languageParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function LanguageSwitcher({
  className,
  lang,
}: {
  className?: string;
  lang: string;
}) {
  const defaultLang = useMemo(getDefaultLanguage, []);
  const [language, setLanguage] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();
console.log(pathname)
const redirectedPathName = useCallback(
  (locale: string) => {
    const segments = pathname.split("/");

    if (config.settings.default_language_in_subdir) {
      // If the default language is in the subdirectory
      segments[1] = locale; // Change the locale
    } else {
      // If the default language is not in the subdirectory
      if (locale === defaultLang) {
        // If the selected locale is the default language
        segments.splice(1, 1); // Remove the language segment
      } else {
        // If the selected locale is not the default language
        segments[1] = locale; // Change the locale
      }
    }

    router.push(segments.join("/"));
  },
  [pathname, defaultLang, router],
);

  return (
    <select
      name="language"
      aria-label="Language Selector"
      value={language}
      className={className}
      onChange={(e) => {
        const language = e.target.value;
        setLanguage(language);
        redirectedPathName(language);
      }}
    >
      {languages.map((language) => (
        <option
          key={language.languageCode}
          id={language.languageCode}
          value={language.languageCode.toLowerCase()}
        >
          {language.languageName}
        </option>
      ))}
    </select>
  );
}
