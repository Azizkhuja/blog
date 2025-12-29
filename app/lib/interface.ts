export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  _updatedAt: string;
  createdAt: string;
}

export interface fullBlog {
  title: string;
  content: any;
  currentSlug: string;
  titleImage: any;
  _updatedAt: any;
  smallDescription: string;
  seoKeywords: string[];
}
