import { Map } from 'immutable';
import { CargoType } from '../shared/cargo-type';

export type State = {}

export type Props = {
  terminals: any,
  cargo: Map<string, *>,
  updateCargo: (cargo: CargoType) => void;
  sendCargo: (cargo: CargoType) => void;
}
