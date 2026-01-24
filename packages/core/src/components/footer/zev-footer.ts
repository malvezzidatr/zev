import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-footer.styles.js';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterInfo {
  label: string;
  value: string;
}

@customElement('zev-footer')
export class ZevFooter extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() heading = '';
  @property({ type: Array }) links: FooterLink[] = [];
  @property({ type: Array }) info: FooterInfo[] = [];
  @property({ attribute: 'decorative-name' }) decorativeName = '';
  @property() copyright = '';

  render() {
    return html`
      <footer class="footer">
        <div class="footer__container">
          <div class="footer__grid">
            <div class="footer__contact">
              <h3 class="footer__heading">${this.heading}</h3>
              <div class="footer__links">
                ${this.links.map(link => html`
                  <a class="footer__link" href=${link.href} target="_blank" rel="noopener">
                    ${link.label}
                  </a>
                `)}
              </div>
            </div>
            <div class="footer__info">
              ${this.info.map(item => html`
                <div class="footer__info-item">
                  <span class="footer__info-label">${item.label}</span>
                  <span class="footer__info-value">${item.value}</span>
                </div>
              `)}
            </div>
          </div>
          <div class="footer__bottom">
            <span class="footer__decorative-name">${this.decorativeName}</span>
            <span class="footer__copyright">${this.copyright}</span>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-footer': ZevFooter;
  }
}
