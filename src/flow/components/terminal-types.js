export type Props = {
  numberOfHacks: number,
  hackingActive: boolean,
  algorithm: ?Array<string> | ?string,
  isLastTerminal?: boolean,
  terminateHacking: () => void,
  handleDiscardTerminal: () => void,
}

export type State = {
  value: any,
}
