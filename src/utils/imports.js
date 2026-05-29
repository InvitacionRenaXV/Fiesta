export function importAll(r) {
  if (!r.keys) {
    return Promise.resolve({});
  }

  return Promise.resolve(r.keys()).then((keys) =>
    keys.reduce((acc, key) => {
      acc[r(key).default] = key;
      return acc;
    }, {})
  );
}
