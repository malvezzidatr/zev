import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevNavbar as ZevNavbarElement } from '@malvezzidatr/zev-core';

export const ZevNavbar = createComponent({
  tagName: 'zev-navbar',
  elementClass: ZevNavbarElement,
  react: React,
  events: {
    onLangToggle: 'lang-toggle' as EventName<CustomEvent<{ lang: string }>>,
    onNavClick: 'nav-click' as EventName<CustomEvent<{ link: { label: string; href: string } }>>,
  },
});
