export type Without<Type, Key> = {
  [L in Exclude<keyof Type, Key>]: Type[L];
};
