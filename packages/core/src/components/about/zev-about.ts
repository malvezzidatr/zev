import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { sectionStyles } from '../../base/shared-styles.js';
import { styles } from './zev-about.styles.js';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

@customElement('zev-about')
export class ZevAbout extends ZevBase {
  static styles = [...ZevBase.styles, sectionStyles, styles];

  @property() tag = '[02]';
  @property() title = '';
  @property() bio = '';
  @property({ type: Array }) skills: string[] = [];
  @property({ type: Array }) timeline: TimelineItem[] = [];

  render() {
    return html`
      <section class="section about">
        <div class="section__container">
          <div class="section__header">
            <span class="section__tag">${this.tag}</span>
            <h2 class="section__title">${this.title}</h2>
          </div>

          <div class="about__grid">
            <div class="about__content">
              <div class="about__bio">
                ${this.bio.split('\n').map(p => html`<p>${p}</p>`)}
              </div>
              <div class="about__skills">
                ${this.skills.map(skill => html`
                  <span class="about__skill-tag">${skill}</span>
                `)}
              </div>
            </div>

            <div class="about__timeline">
              ${this.timeline.map(item => html`
                <div class="about__timeline-item">
                  <div class="about__timeline-dot"></div>
                  <div class="about__timeline-content">
                    <span class="about__timeline-year">${item.year}</span>
                    <h4 class="about__timeline-title">${item.title}</h4>
                    <p class="about__timeline-desc">${item.description}</p>
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-about': ZevAbout;
  }
}
