import "whatwg-fetch";
import "@testing-library/jest-dom";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

beforeEach(() => {
    useRouter.mockImplementation(() => ({
        replace: jest.fn(),
    }));
    useSearchParams.mockImplementation(() => ({
        get: jest.fn().mockReturnValue(""), // Mock get method
        toString: jest.fn().mockReturnValue(""), // Mock toString method
    }));
});

jest.mock("next/image", () => {
    const ImageMock = ({ src, alt }) => {
        return <img src = { src }
        alt = { alt }
        />;
    };

    return ImageMock;
});

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver;