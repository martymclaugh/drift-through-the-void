import { Map } from 'immutable';
import { DistributedResourcesType } from '../shared/distributed-resources-type';

export type Props = {
  distributedResources: Map<DistributedResourcesType, *>,
  colonists: number,
  soylent: number,
  credits: number,
  changePhase: () => void;
};

export type State = {

};
