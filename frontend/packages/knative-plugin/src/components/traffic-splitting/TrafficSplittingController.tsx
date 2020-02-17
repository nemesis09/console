import * as React from 'react';
import { K8sResourceKind } from '@console/internal/module/k8s';
import { Firehose } from '@console/internal/components/utils';
import { createModalLauncher, ModalComponentProps } from '@console/internal/components/factory';
import { knativeServingResourcesTrafficSplitting } from '../../utils/traffic-splitting-utils';
import Controller from './Controller';

type TrafficSplittingControllerProps = {
  obj: K8sResourceKind;
};

const TrafficSplittingController: React.FC<TrafficSplittingControllerProps> = (props) => {
  const {
    metadata: { namespace },
  } = props.obj;
  const resources = knativeServingResourcesTrafficSplitting(namespace);

  return (
    <Firehose resources={resources}>
      <Controller {...props} />
    </Firehose>
  );
};

type Props = TrafficSplittingControllerProps & ModalComponentProps;

export const trafficModalLauncher = createModalLauncher<Props>(TrafficSplittingController);

export default TrafficSplittingController;
