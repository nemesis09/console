import * as React from 'react';
import { extension } from 'showdown';
import { SyncMarkdownView } from '@console/internal/components/markdown-view';
import { HIGHLIGHT_REGEXP } from '@console/shared/src/components/markdown-highlight-extension/highlight-consts';

type QuickStartMarkdownViewProps = {
  content: string;
};
const QuickStartMarkdownView: React.FC<QuickStartMarkdownViewProps> = ({ content }) => {
  extension('quickstart', () => {
    return [
      {
        type: 'lang',
        regex: HIGHLIGHT_REGEXP,
        replace: (text: string, linkLabel: string, linkType: string, linkId: string): string => {
          if (!linkLabel || !linkType || !linkId) return text;
          return `<button class="pf-c-button pf-m-inline pf-m-link" data-highlight="${linkId}">${linkLabel}</button>`;
        },
      },
    ];
  });
  return <SyncMarkdownView content={content} highlight />;
};

export default QuickStartMarkdownView;
