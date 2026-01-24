import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevHero as ZevHeroElement } from '@zev/core';

export const ZevHero = createComponent({
  tagName: 'zev-hero',
  elementClass: ZevHeroElement,
  react: React,
  events: {
    onCtaClick: 'cta-click' as EventName<CustomEvent<{ href: string }>>,
  },
});
