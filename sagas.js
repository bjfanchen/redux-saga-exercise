import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects' //

export function* helloSaga() {
  console.log('Hello Sagas!');
}

// Our worker Saga: 将执行异步的 increment 任务
// incrementAsync Saga 通过 delay(1000) 延迟了 1 秒钟，然后 dispatch 一个叫 INCREMENT 的 action。
export function* incrementAsync() {
  yield call(delay, 1000)  //delay()函数返回一个延迟1秒再resolve的Promise
  yield put({ type: 'INCREMENT' }) //告诉middleware发起一个INCREMENT的action
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync) //takeEvery()用于监听所有的 INCREMENT_ASYNC action，并在 action 被匹配时执行 incrementAsync 任务。
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}