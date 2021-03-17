import * as _ from 'lodash';
import { getResourceModelFromTaskKind } from '../../../utils/pipeline-augment';
import { PipelineKind, PipelineTask, TektonParam } from '../../../types';

export const removeEmptyDefaultFromPipelineParams = (parameters: TektonParam[]): TektonParam[] =>
  _.map(
    parameters,
    (parameter) =>
      _.omit(parameter, _.isEmpty(parameter.default) ? ['default'] : []) as TektonParam,
  );

export const getPipelineTaskLinks = (pipeline: PipelineKind, isFinallyTasks = false) => {
  const tasks = isFinallyTasks ? pipeline.spec.finally : pipeline.spec.tasks;
  if (!tasks || tasks.length === 0) return [];
  return tasks
    .filter((pipelineTask: PipelineTask) => !!pipelineTask.taskRef)
    .map((task) => ({
      model: getResourceModelFromTaskKind(task.taskRef.kind),
      name: task.taskRef.name,
      displayName: task.name,
    }));
};
