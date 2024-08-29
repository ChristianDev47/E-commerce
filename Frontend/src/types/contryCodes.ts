export type countryCode = {
  flags: Flags;
  name: Name;
  idd: Idd;
  altSpellings: string[];
};

export type Flags = {
  png: string;
  svg: string;
  alt: string;
};

export type Idd = {
  root: Root;
  suffixes: string[];
};

export type Root =
  | "+3"
  | "+2"
  | "+1"
  | "+6"
  | "+5"
  | "+9"
  | "+4"
  | "+8"
  | "+7"
  | "";

export type Name = {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
};

export type NativeName = {
  official: string;
  common: string;
};
