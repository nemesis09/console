import * as _ from 'lodash';
import { pipelineParameters, pipelineParametersWithoutDefaults } from './utils-data';
import { TektonParam } from '../../../../types';
import { getPipelineTaskLinks, removeEmptyDefaultFromPipelineParams } from '../utils';
import { PipelineExampleNames, pipelineTestData } from '../../../../test-data/pipeline-data';

describe('removeEmptyDefaultFromPipelineParams omits empty default values', () => {
  it('should return pipline parameters by only omitting empty default values', () => {
    const result = removeEmptyDefaultFromPipelineParams(pipelineParameters);
    const expectedPipelineParameters: TektonParam[] = [
      {
        name: 'param1',
        default: 'abc',
        description: 'This is param 1',
      },
      {
        name: 'param2',
        description: 'This is param 2',
      },
      {
        name: 'param3',
        default: 'xyz',
        description: 'This is param 3',
      },
    ];

    expect(result).toEqual(expectedPipelineParameters);
  });

  it('should return empty array if pipline parameters is empty', () => {
    let result = removeEmptyDefaultFromPipelineParams(null);
    expect(result).toEqual([]);

    result = removeEmptyDefaultFromPipelineParams([]);
    expect(result).toEqual([]);
  });

  it('should return pipline parameters as is if default is non-empty', () => {
    const pipelineParams = _.cloneDeep(pipelineParameters);
    pipelineParams[1].default = 'mno';
    const result = removeEmptyDefaultFromPipelineParams(pipelineParams);
    expect(result).toEqual(pipelineParams);
  });

  it('should return pipline parameters as is if the default property is not present', () => {
    const result = removeEmptyDefaultFromPipelineParams(pipelineParametersWithoutDefaults);
    expect(result).toEqual(pipelineParametersWithoutDefaults);
  });
});

describe('getPipelineTaskLinks', () => {
  it('should return empty array if there are no tasks with taskRef', () => {
    const { pipeline } = pipelineTestData[PipelineExampleNames.SIMPLE_PIPELINE];
    const pipelineWithoutTaskRef = {
      ...pipeline,
      spec: {
        tasks: [
          {
            name: 'task1',
            taskSpec: {
              metadata: {
                labels: {
                  app: 'example',
                },
              },
              steps: [{ name: 'echo', image: 'ubuntu' }],
            },
          },
        ],
      },
    };
    expect(getPipelineTaskLinks(pipelineWithoutTaskRef)).toHaveLength(0);
  });
  it('should return empty array if there are no finally tasks and isFinallyTasks is true', () => {
    const { pipeline } = pipelineTestData[PipelineExampleNames.SIMPLE_PIPELINE];
    expect(getPipelineTaskLinks(pipeline, true)).toHaveLength(0);
  });
  it('should return links for only pipeline tasks if isFinallyTasks is false', () => {
    const { pipeline } = pipelineTestData[PipelineExampleNames.PIPELINE_WITH_FINALLY];
    expect(getPipelineTaskLinks(pipeline)).toHaveLength(2);
  });
  it('should return links for only finally tasks if isFinallyTasks is true', () => {
    const { pipeline } = pipelineTestData[PipelineExampleNames.PIPELINE_WITH_FINALLY];
    expect(getPipelineTaskLinks(pipeline, true)).toHaveLength(1);
  });
});
