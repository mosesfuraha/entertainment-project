import { v4 as uuidv4 } from 'uuid';

interface Thumbnail {
  trending?: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
export function addIdToContentItem(
  content: Omit<ContentItem, 'id'>
): ContentItem {
  return { ...content, id: uuidv4() };
}
