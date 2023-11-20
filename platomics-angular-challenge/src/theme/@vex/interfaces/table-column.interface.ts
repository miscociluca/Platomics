export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'date';
  visible?: boolean;
  cssClasses?: string[];
}

export interface MenuItem<T> {
  id: number;
  label: string;
  icon: string;
}
