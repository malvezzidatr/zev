import { html, PropertyValues } from 'lit';
import { customElement, property, state, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-carousel.styles.js';

export type CarouselGap = 'none' | 'sm' | 'md' | 'lg';

@customElement('zev-carousel')
export class ZevCarousel extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: Number, attribute: 'slides-per-view', reflect: true })
  slidesPerView = 1;

  @property({ type: String, reflect: true })
  gap: CarouselGap = 'none';

  @property({ type: Boolean, reflect: true })
  loop = false;

  @property({ type: Boolean, reflect: true })
  autoplay = false;

  @property({ type: Number, attribute: 'autoplay-interval' })
  autoplayInterval = 5000;

  @property({ type: Boolean, attribute: 'hide-nav', reflect: true })
  hideNav = false;

  @property({ type: Boolean, attribute: 'hide-indicators', reflect: true })
  hideIndicators = false;

  @property({ type: Boolean, attribute: 'pause-on-hover' })
  pauseOnHover = true;

  @state() private _currentIndex = 0;
  @state() private _isDragging = false;
  @state() private _slideCount = 0;
  @state() private _isPaused = false;

  @query('.carousel__track') private _track!: HTMLElement;

  private _autoplayTimer: number | null = null;
  private _startX = 0;
  private _currentX = 0;
  private _translateX = 0;

  connectedCallback() {
    super.connectedCallback();
    if (this.autoplay) {
      this._startAutoplay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('autoplay')) {
      if (this.autoplay) {
        this._startAutoplay();
      } else {
        this._stopAutoplay();
      }
    }
  }

  private get _totalSlides(): number {
    return this._slideCount;
  }

  private get _maxIndex(): number {
    return Math.max(0, this._totalSlides - this.slidesPerView);
  }

  private get _canGoPrev(): boolean {
    return this.loop || this._currentIndex > 0;
  }

  private get _canGoNext(): boolean {
    return this.loop || this._currentIndex < this._maxIndex;
  }

  private _startAutoplay() {
    this._stopAutoplay();
    this._autoplayTimer = window.setInterval(() => {
      this._next();
    }, this.autoplayInterval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer !== null) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  private _handleMouseEnter() {
    if (this.autoplay && this.pauseOnHover) {
      this._stopAutoplay();
    }
  }

  private _handleMouseLeave() {
    if (this.autoplay && this.pauseOnHover && !this._isPaused) {
      this._startAutoplay();
    }
  }

  private _togglePause() {
    this._isPaused = !this._isPaused;
    if (this._isPaused) {
      this._stopAutoplay();
    } else {
      this._startAutoplay();
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this._prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this._next();
        break;
    }
  }

  goTo(index: number) {
    const prevIndex = this._currentIndex;

    if (this.loop) {
      if (index < 0) {
        this._currentIndex = this._maxIndex;
      } else if (index > this._maxIndex) {
        this._currentIndex = 0;
      } else {
        this._currentIndex = index;
      }
    } else {
      this._currentIndex = Math.max(0, Math.min(index, this._maxIndex));
    }

    if (prevIndex !== this._currentIndex) {
      this.emitEvent('carousel-change', {
        index: this._currentIndex,
        previousIndex: prevIndex,
      });
    }

    this._updateTrackPosition();
  }

  private _prev() {
    this.goTo(this._currentIndex - 1);
  }

  private _next() {
    this.goTo(this._currentIndex + 1);
  }

  private _updateTrackPosition() {
    if (!this._track) return;
    const slideWidth = 100 / this.slidesPerView;
    this._translateX = -(this._currentIndex * slideWidth);
    this._track.style.transform = `translateX(${this._translateX}%)`;
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();
    this._slideCount = assignedElements.length;
    this._updateTrackPosition();
  }

  // Touch/Mouse drag handling
  private _handleDragStart(e: MouseEvent | TouchEvent) {
    this._isDragging = true;
    this._startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this._currentX = this._startX;
  }

  private _handleDragMove(e: MouseEvent | TouchEvent) {
    if (!this._isDragging) return;

    this._currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = this._currentX - this._startX;
    const viewportWidth = this._track.parentElement?.offsetWidth || 1;
    const percentDiff = (diff / viewportWidth) * 100;

    const slideWidth = 100 / this.slidesPerView;
    const baseTranslate = -(this._currentIndex * slideWidth);
    this._track.style.transform = `translateX(${baseTranslate + percentDiff}%)`;
  }

  private _handleDragEnd() {
    if (!this._isDragging) return;
    this._isDragging = false;

    const diff = this._currentX - this._startX;
    const viewportWidth = this._track.parentElement?.offsetWidth || 1;
    const threshold = viewportWidth * 0.15; // 15% threshold

    if (diff > threshold && this._canGoPrev) {
      this._prev();
    } else if (diff < -threshold && this._canGoNext) {
      this._next();
    } else {
      this._updateTrackPosition();
    }
  }

  render() {
    const trackClasses = {
      carousel__track: true,
      'carousel__track--dragging': this._isDragging,
    };

    return html`
      <div
        class="carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Carrossel de conteúdo"
        tabindex="0"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @keydown=${this._handleKeydown}
      >
        <div
          class="carousel__viewport"
          @mousedown=${this._handleDragStart}
          @mousemove=${this._handleDragMove}
          @mouseup=${this._handleDragEnd}
          @mouseleave=${this._handleDragEnd}
          @touchstart=${this._handleDragStart}
          @touchmove=${this._handleDragMove}
          @touchend=${this._handleDragEnd}
        >
          <div class=${classMap(trackClasses)}>
            <slot @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>

        ${!this.hideNav ? html`
          <button
            class="carousel__nav carousel__nav--prev"
            @click=${this._prev}
            ?disabled=${!this._canGoPrev}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            class="carousel__nav carousel__nav--next"
            @click=${this._next}
            ?disabled=${!this._canGoNext}
            aria-label="Próximo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        ` : null}

        ${this.autoplay ? html`
          <button
            class="carousel__pause"
            @click=${this._togglePause}
            aria-label=${this._isPaused ? 'Reproduzir carrossel' : 'Pausar carrossel'}
          >
            ${this._isPaused ? html`
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ` : html`
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            `}
          </button>
        ` : null}

        <div class="carousel__live" aria-live="polite" aria-atomic="true">
          Slide ${this._currentIndex + 1} de ${this._maxIndex + 1}
        </div>

        ${!this.hideIndicators && this._totalSlides > 1 ? html`
          <div class="carousel__indicators" role="tablist">
            ${Array.from({ length: this._maxIndex + 1 }, (_, i) => html`
              <button
                class="carousel__indicator ${i === this._currentIndex ? 'carousel__indicator--active' : ''}"
                @click=${() => this.goTo(i)}
                role="tab"
                aria-selected=${i === this._currentIndex}
                aria-label="Slide ${i + 1}"
              ></button>
            `)}
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-carousel': ZevCarousel;
  }
}
