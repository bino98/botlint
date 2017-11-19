export const initialResolve = { error: false, messages: [] }

export default class Proofread {
  /*
    If you add proof classes, please inherit check method.
    @return Promise
   */
  check() {
    return new Promise((resolve) => (resolve(initialResolve)))
  }
}
