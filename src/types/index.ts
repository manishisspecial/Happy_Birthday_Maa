export interface BlessingPage {
  id: number;
  date: string;
  title: string;
  verse: string;
  verseHindi: string;
  reference: string;
  background: string;
  theme: string;
}

export interface NavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
} 