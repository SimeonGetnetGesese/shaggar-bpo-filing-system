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

export interface WebsiteSpec {
  siteName: string;
  pages: string[];
  features: string[];
  techStack: string[];
  designRationale: string;
}

export interface TrainingSpec {
  programName: string;
  numTrainees: number;
  trainerNames: string[];
  curriculum: string[];
  duration: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ServiceData {
  branding?: BrandIdentity;
  website?: WebsiteSpec;
  training?: TrainingSpec;
}
