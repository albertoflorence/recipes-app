import recipeMock from '../recipeMock';

const globalFetch = global.fetch;
export const mockFetch = (data = recipeMock) => {
  global.fetch = jest.fn((url) => Promise.resolve({
    json: () => {
      return Promise.resolve({ [url.includes('meal') ? 'meals' : 'drinks']: data });
    },
  }));
};

afterEach(() => {
  global.fetch = globalFetch;
});
