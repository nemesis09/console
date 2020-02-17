import * as React from 'react';
import { K8sResourceKind } from '@console/internal/module/k8s';
import { FirehoseResult } from '@console/internal/components/utils';
import { transformTrafficSplitingData } from '../../utils/traffic-splitting-utils';
import TrafficSplitting from './TrafficSplitting';

type ControllerProps = {
  loaded?: boolean;
  obj: K8sResourceKind;
  resources?: {
    configurations: FirehoseResult;
    revisions: FirehoseResult;
  };
};

const Controller: React.FC<ControllerProps> = (props) => {
  const { loaded, obj, resources } = props;
  const revisions = transformTrafficSplitingData(obj, resources);
  return loaded ? <TrafficSplitting {...props} service={obj} revisions={revisions} /> : null;
};

export default Controller;
