// Fake API helper with typing
export function fakeApiCall<T>(response: T, shouldFail = false, delay = 500): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Fake API error'));
        } else {
          resolve(response);
        }
      }, delay);
    });
  }
  