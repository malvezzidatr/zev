import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevSkillCard as ZevSkillCardElement } from '@malvezzidatr/zev-core';
import type { SkillResource } from '@malvezzidatr/zev-core';

export const ZevSkillCard = createComponent({
  tagName: 'zev-skill-card',
  elementClass: ZevSkillCardElement,
  react: React,
  events: {
    onResourceClick: 'resource-click' as EventName<CustomEvent<SkillResource>>,
  },
});
