export enum CookiesKeys {
  Theme = "theme",
}

// actually 2147483647 = 2^31 - 1
export const cookiesMaxExpirationDate = new Date(2147483647 * 1000);
