type DropDownItem = {
  value: any,
  name: number | string,
}

export type Props = {
  handleDropdownSelection: (num: number) => void,
  items: Array<DropDownItem>,
}
export type State = {
  isActive: boolean,
  value: number,
}
