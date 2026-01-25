/**
 * Helper function to wait for Lit element to update
 */
export async function elementUpdated(element: HTMLElement): Promise<void> {
  await (element as any).updateComplete;
}

/**
 * Helper to create and append element to DOM
 */
export function fixture<T extends HTMLElement>(tagName: string): T {
  const element = document.createElement(tagName) as T;
  document.body.appendChild(element);
  return element;
}

/**
 * Helper to cleanup element from DOM
 */
export function cleanup(element: HTMLElement): void {
  element.remove();
}

/**
 * Helper to query shadow DOM
 */
export function shadowQuery<T extends Element>(
  element: HTMLElement,
  selector: string
): T | null {
  return element.shadowRoot?.querySelector<T>(selector) ?? null;
}

/**
 * Helper to query all in shadow DOM
 */
export function shadowQueryAll<T extends Element>(
  element: HTMLElement,
  selector: string
): T[] {
  return Array.from(element.shadowRoot?.querySelectorAll<T>(selector) ?? []);
}
