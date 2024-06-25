import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import ThemeSwitcher from "../src/layouts/components/ThemeSwitcher";
import { ThemeProvider } from "next-themes";
describe("ThemeSwitcher component", () => {
  it("renders without crashing", () => {
    render(<ThemeSwitcher />);
  });
  
  it("renders without crashing", async () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher className="custom-class" />
      </ThemeProvider>,
    );
    const themeSwitcherElement = await screen.findByText("theme switcher");
    expect(themeSwitcherElement).toBeInTheDocument();
  });

  it("toggles between dark and light themes", () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher className="custom-class" />
      </ThemeProvider>,
    );

    const themeSwitcher = getByTestId("theme-switcher");
    const darkThemeIcon = getByTestId("dark-theme-icon");
    const lightThemeIcon = getByTestId("light-theme-icon");

    // Initial state check
    expect(themeSwitcher).toBeInTheDocument();
    expect(themeSwitcher).not.toBeChecked();
    expect(lightThemeIcon).toBeInTheDocument();
    expect(darkThemeIcon).toHaveClass('opacity-0')

    // Simulate toggle to dark theme
    fireEvent.click(themeSwitcher);

    // Verify state after toggling
    expect(themeSwitcher).toBeChecked();
    expect(darkThemeIcon).toHaveClass('dark:opacity-100');

    // Simulate toggle back to light theme
    fireEvent.click(themeSwitcher);

    // Verify state after toggling back
    expect(themeSwitcher).not.toBeChecked();
    expect(lightThemeIcon).toBeInTheDocument();
    expect(darkThemeIcon).toHaveClass('opacity-0')
  });
});
