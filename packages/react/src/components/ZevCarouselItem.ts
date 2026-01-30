import React from 'react';
import { createComponent } from '@lit/react';
import { ZevCarouselItem as ZevCarouselItemElement } from '@malvezzidatr/zev-core';

export const ZevCarouselItem = createComponent({
  tagName: 'zev-carousel-item',
  elementClass: ZevCarouselItemElement,
  react: React,
});
