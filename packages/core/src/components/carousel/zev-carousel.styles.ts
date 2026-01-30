import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
  }

  .carousel {
    position: relative;
    overflow: hidden;
  }

  .carousel__viewport {
    overflow: hidden;
    touch-action: pan-y pinch-zoom;
  }

  .carousel__track {
    display: flex;
    transition: transform 0.3s ease-out;
    will-change: transform;
  }

  .carousel__track--dragging {
    transition: none;
  }

  .carousel__slide {
    flex-shrink: 0;
    width: 100%;
    box-sizing: border-box;
  }

  /* Slotted items (carousel-item or any direct children) */
  ::slotted(*) {
    flex-shrink: 0;
    width: 100%;
    box-sizing: border-box;
  }

  /* Navigation Buttons */
  .carousel__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--zev-color-bg-primary);
    color: var(--zev-color-text-primary);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s, opacity 0.2s, transform 0.2s;
  }

  .carousel__nav:hover {
    background: var(--zev-color-bg-secondary);
    transform: translateY(-50%) scale(1.05);
  }

  .carousel__nav:active {
    transform: translateY(-50%) scale(0.95);
  }

  .carousel__nav:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  .carousel__nav--prev {
    left: 0.5rem;
  }

  .carousel__nav--next {
    right: 0.5rem;
  }

  .carousel__nav svg {
    width: 20px;
    height: 20px;
  }

  /* Hide navigation */
  :host([hide-nav]) .carousel__nav {
    display: none;
  }

  /* Indicators (dots) */
  .carousel__indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0;
  }

  .carousel__indicator {
    width: 8px;
    height: 8px;
    border: none;
    border-radius: 50%;
    background: var(--zev-color-text-secondary);
    opacity: 0.3;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s, transform 0.2s, width 0.2s;
  }

  .carousel__indicator:hover {
    opacity: 0.6;
  }

  .carousel__indicator--active {
    opacity: 1;
    background: var(--zev-color-accent);
    width: 24px;
    border-radius: 4px;
  }

  /* Hide indicators */
  :host([hide-indicators]) .carousel__indicators {
    display: none;
  }

  /* Multiple slides per view */
  :host([slides-per-view="2"]) ::slotted(*) {
    width: 50%;
  }

  :host([slides-per-view="3"]) ::slotted(*) {
    width: 33.333%;
  }

  :host([slides-per-view="4"]) ::slotted(*) {
    width: 25%;
  }

  :host([slides-per-view="5"]) ::slotted(*) {
    width: 20%;
  }

  /* Gap between slides */
  :host([gap="sm"]) ::slotted(*) {
    padding: 0 0.25rem;
  }

  :host([gap="md"]) ::slotted(*) {
    padding: 0 0.5rem;
  }

  :host([gap="lg"]) ::slotted(*) {
    padding: 0 1rem;
  }

  /* Slide content styling for images */
  ::slotted(img) {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  /* Responsive - mobile shows 1 slide by default */
  @media (max-width: 768px) {
    :host([slides-per-view="3"]) ::slotted(*),
    :host([slides-per-view="4"]) ::slotted(*),
    :host([slides-per-view="5"]) ::slotted(*) {
      width: 100%;
    }

    :host([slides-per-view="2"]) ::slotted(*) {
      width: 50%;
    }

    .carousel__nav {
      width: 36px;
      height: 36px;
    }

    .carousel__nav svg {
      width: 18px;
      height: 18px;
    }
  }

  /* Pause on hover when autoplay is active */
  :host([autoplay]:hover) .carousel__track {
    animation-play-state: paused;
  }
`;
