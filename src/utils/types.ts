export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type ClientStatus = "généré" | "envoyé" | "accepté" | "refusé";

export type FournisseurStatus = "généré" | "envoyé" | "répondu";

export type Item = {
  url: string;
  quantity: number;
  name: string;
  reference: string;
  price: number;
  supplierPrice: string;
  color: string;
  customizations: Customization[];
  size: Size;
};

export type FournisseurItem = Omit<Item, "price" | "supplierPrice">;

export type CustomizationPlace =
  | "torse"
  | "épaule droite"
  | "épaule gauche"
  | "haut du dos"
  | "bas du dos"
  | "dos entier"
  | "autre";

export type CustomizationType = "texte" | "image" | "logo" | "nom" | "autre";

export type CustomizationMethod =
  | "sérigraphie"
  | "broderie"
  | "flocage"
  | "couture"
  | "autre";

export type Customization = {
  place: CustomizationPlace;
  type: CustomizationType;
  method: CustomizationMethod;
};
