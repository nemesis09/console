import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import TrafficSplitting from '../TrafficSplitting';
import {
  mockRevisions,
  mockServiceData,
} from '../../../utils/__mocks__/traffic-splitting-utils-mock';

describe('TrafficSplitting', () => {
  it('should match the previous traffic splitting snapshot', () => {
    const tree = Renderer.create(
      <TrafficSplitting service={mockServiceData} revisions={mockRevisions} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
