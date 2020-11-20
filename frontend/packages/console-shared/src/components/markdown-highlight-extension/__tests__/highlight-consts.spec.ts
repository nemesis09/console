import {
  INVALID_HIGHLIGHT_LABELS,
  INVALID_HIGHLIGHT_LINKS,
  INVALID_IDS,
  VALID_HIGHLIGHT_LABELS,
  VALID_HIGHLIGHT_LINKS,
  VALID_IDS,
} from './test-data';
import { HIGHLIGHT_REGEXP, LINK_LABEL, SELECTOR_ID } from '../highlight-consts';

const createTestLoop = (
  shouldPass: boolean,
  label: string,
  values: string[],
  regExpString: string,
) => {
  const regExp = new RegExp(`^${regExpString}$`);
  describe(`${label} - ${shouldPass ? '' : 'not '}${regExpString}`, () => {
    values.forEach((value: string) => {
      it(`expect to successfully ${shouldPass ? '' : 'not '}match against "${value}"`, () => {
        expect(regExp.test(value)).toBe(shouldPass);
      });
    });
  });
};

const successfullyTestValues = (label: string, values: string[], regExpString: string) =>
  createTestLoop(true, label, values, regExpString);
const failTestValuesSuccessfully = (label: string, values: string[], regExpString: string) =>
  createTestLoop(false, label, values, regExpString);

describe('Convert Markdown To Highlight RegExp Tests', () => {
  successfullyTestValues('Valid Labels', VALID_HIGHLIGHT_LABELS, LINK_LABEL);
  successfullyTestValues('Valid Ids', VALID_IDS, SELECTOR_ID);
  successfullyTestValues('Valid Links', VALID_HIGHLIGHT_LINKS, HIGHLIGHT_REGEXP.source);

  failTestValuesSuccessfully('Invalid Labels', INVALID_HIGHLIGHT_LABELS, LINK_LABEL);
  failTestValuesSuccessfully('Invalid Ids', INVALID_IDS, SELECTOR_ID);
  failTestValuesSuccessfully('Invalid Links', INVALID_HIGHLIGHT_LINKS, HIGHLIGHT_REGEXP.source);

  it('should get back 3 matches from the HIGHLIGHT_REGEXP', () => {
    const matches = HIGHLIGHT_REGEXP.exec('[label]{{highlight tour-perspective-switcher}}');
    expect(matches).not.toBe(null);
    expect(matches.length).toBe(5);
    // index 0 is the whole string
    expect(matches[1]).toBe('label');
    expect(matches[2]).toBe('highlight');
    expect(matches[3]).toBe('tour-perspective-switcher');
  });
});
