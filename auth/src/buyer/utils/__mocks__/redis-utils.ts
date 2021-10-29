// getting fake redis implementation so isAuth doesnt stop me for tests

export const getDataRedis = jest.fn().mockImplementation(() => {
  return (key: string) => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  };
});
