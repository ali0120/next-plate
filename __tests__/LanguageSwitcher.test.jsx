import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import languages from "@/config/language.json";
import config from "@/config/config.json";
import { getDefaultLanguage } from "@/lib/languageParser";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("./../src/lib/languageParser", () => ({
  getDefaultLanguage: jest.fn(),
}));

describe("LanguageSwitcher", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
    usePathname.mockReturnValue("/en/pathname");
    getDefaultLanguage.mockReturnValue("en");
    mockPush.mockClear();
  });

  it("renders the component with the correct initial language", () => {
    render(<LanguageSwitcher className="test-class" lang="en" />);

    const select = screen.getByRole("combobox", { name: /language/i });
    expect(select).toHaveClass("test-class");
    expect(select).toHaveValue("en");
  });

  it("renders all language options", () => {
    render(<LanguageSwitcher lang="en" />);

    languages.forEach((language) => {
      expect(screen.getByRole("option", { name: language.languageName })).toBeInTheDocument();
    });
  });

  it("changes language and redirects correctly when a different language is selected", () => {
    render(<LanguageSwitcher lang="en" />);

    const select = screen.getByRole("combobox", { name: /language/i });
    fireEvent.change(select, { target: { value: "fr" } });

    expect(select).toHaveValue("fr");

    if (config.settings.default_language_in_subdir) {
      expect(mockPush).toHaveBeenCalledWith("/fr/pathname");
    } else {
      expect(mockPush).toHaveBeenCalledWith("/fr/pathname");
    }
  });

  it("redirects correctly when the default language is selected", () => {
    render(<LanguageSwitcher lang="en" />);

    const select = screen.getByRole("combobox", { name: /language/i });
    fireEvent.change(select, { target: { value: "en" } });

    expect(select).toHaveValue("en");

    if (!config.settings.default_language_in_subdir) {
      expect(mockPush).toHaveBeenCalledWith("/pathname");
    } else {
      expect(mockPush).toHaveBeenCalledWith("/en/pathname");
    }
  });
});
