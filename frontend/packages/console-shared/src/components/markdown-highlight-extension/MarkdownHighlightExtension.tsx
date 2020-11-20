import * as React from 'react';
import { extension } from 'showdown';
import { Spotlight } from '../spotlight';
import { HIGHLIGHT_REGEXP } from './highlight-consts';

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
type MarkdownHighlightExtensionProps = {
  docContext: HTMLDocument;
};
const MarkdownHighlightExtension: React.FC<MarkdownHighlightExtensionProps> = ({ docContext }) => {
  const [selector, setSelector] = React.useState<string>(null);
  React.useEffect(() => {
    const elements = docContext.querySelectorAll('[data-highlight]');
    let timeoutId: NodeJS.Timeout;
    function startHighlight(e) {
      const highlightId = e.target.getAttribute('data-highlight');
      if (!highlightId) {
        return;
      }
      setSelector(null);
      timeoutId = setTimeout(() => {
        setSelector(`[data-tour-id="${highlightId}"]`);
      }, 0);
    }
    elements.forEach((elm) => elm.addEventListener('click', startHighlight));
    return () => {
      clearTimeout(timeoutId);
      elements.forEach((elm) => elm.removeEventListener('click', startHighlight));
    };
  }, [docContext]);
  if (!selector) {
    return null;
  }
  return <Spotlight selector={selector} interactive />;
};
export default MarkdownHighlightExtension;
