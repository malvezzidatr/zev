import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevCarousel as ZevCarouselElement } from '@malvezzidatr/zev-core';

export const ZevCarousel = createComponent({
  tagName: 'zev-carousel',
  elementClass: ZevCarouselElement,
  react: React,
  events: {
    onCarouselChange: 'carousel-change' as EventName<CustomEvent<{ index: number; previousIndex: number }>>,
  },
});
