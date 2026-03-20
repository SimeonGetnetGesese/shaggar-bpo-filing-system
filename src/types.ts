export enum ImageSize {
  SIZE_1K = "1K",
  SIZE_2K = "2K",
  SIZE_4K = "4K"
}

export interface ColorPalette {
  hex: string;
  name: string;
  usage: string;
}

export interface FontPairing {
  headerFont: string;
  bodyFont: string;
  rationale: string;
}

export interface BrandIdentity {
  mission: string;
  brandName: string;
  tagline: string;
  palette: ColorPalette[];
  fonts: FontPairing;
  primaryLogoUrl?: string;
  secondaryMarks: string[]; // URLs
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
