import React from 'react';
import { createComponent } from '@lit/react';
import { ZevFooter as ZevFooterElement } from '@malvezzidatr/zev-core';

export const ZevFooter = createComponent({
  tagName: 'zev-footer',
  elementClass: ZevFooterElement,
  react: React,
});
