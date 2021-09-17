import { all } from 'redux-saga/effects';

import { initSaga } from './init';
import { refreshSaga } from './refresh';
import { loadBagDataSaga } from './loadBagData';
import { uploadBagDataSaga } from './uploadBagData';
import { reuploadBagDataSaga } from './reuploadBagData';
import { purchaseBagSaga } from './purchaseBag';

export const sagas = function* rootSaga() {
  yield all([
    initSaga(),
    refreshSaga(),
    loadBagDataSaga(),
    uploadBagDataSaga(),
    reuploadBagDataSaga(),
    purchaseBagSaga(),
  ]);
};
