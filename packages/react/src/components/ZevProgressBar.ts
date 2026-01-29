import React from 'react';
import { createComponent } from '@lit/react';
import { ZevProgressBar as ZevProgressBarElement } from '@malvezzidatr/zev-core';

export const ZevProgressBar = createComponent({
  tagName: 'zev-progress-bar',
  elementClass: ZevProgressBarElement,
  react: React,
});
