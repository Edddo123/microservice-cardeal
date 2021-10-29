// getting fake redis implementation so isAuth doesnt stop me for tests

export const getDataRedis = jest.fn().mockImplementation(() => {
  return (key: string) => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  };
});

export const setDataRedis = jest.fn().mockImplementation(() => {
  return (key: string, value: string, options?: string, duration?: number) => {
    return new Promise((resolve, reject) => {
      resolve("OK");
    });
  };
});

export const deleteDataRedis = jest.fn().mockImplementation(() => {
  return (key: string) => {
    return new Promise((resolve, reject) => {
      resolve(1);
    });
  };
});
