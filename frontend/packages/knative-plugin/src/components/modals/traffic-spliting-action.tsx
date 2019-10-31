import { K8sKind, DeploymentKind } from '@console/internal/module/k8s';
import { DeploymentModel } from '@console/internal/models';
import { trafficModalLauncher } from './TrafficSplittingModal';

export const TrafficSplittingAction = (kind: K8sKind, obj: DeploymentKind) => ({
  // FIXME: get the correct label
  label: 'Traffic Split',
  callback: () =>
    trafficModalLauncher({
      revisions: {
        one: 'one',
        two: 'two',
      },
      inprogress: false,
    }),
  accessReview: {
    group: kind.apiGroup,
    resource: kind.plural,
    name: obj.metadata.name,
    namespace: obj.metadata.namespace,
    verb: 'patch',
  },
});

export const trafficSplittingPlugin = (model: K8sKind) =>
  model.kind === DeploymentModel.kind ? [TrafficSplittingAction] : null;
