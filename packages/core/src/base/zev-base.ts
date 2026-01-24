import { LitElement } from 'lit';
import { sharedStyles } from './shared-styles.js';

export class ZevBase extends LitElement {
  static styles = [sharedStyles];

  protected emitEvent<T>(name: string, detail?: T) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    });
    this.dispatchEvent(event);
    return event;
  }

  protected get isMobile(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
  }
}
