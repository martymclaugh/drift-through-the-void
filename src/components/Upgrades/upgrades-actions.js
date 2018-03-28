export const types = {
    SELECT_UPGRADE: 'SELECT_UPGRADE',
    SELECT_RESOURCE: 'SELECT_RESOURCE',    
    PURCHASE_UPGRADE: 'PURCHASE_UPGRADE',
}

export const selectUpgrade = payload =>
    ({ type: types.SELECT_UPGRADE, payload });
export const selectResource = payload =>
    ({ type: types.SELECT_RESOURCE, payload });
export const purchaseUpgrade = payload =>
    ({ type: types.PURCHASE_UPGRADE, payload });
