export const getDictionary = async (locale: string) => {
  switch (locale) {
    case "de":
      return import("./dictionaries/de.json").then((m) => m.default);
    case "en":
    default:
      return import("./dictionaries/en.json").then((m) => m.default);
  }
};
