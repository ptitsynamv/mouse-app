import { Mouse } from '../../../shared/interfaces/shared.interfaces';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  mouses: Mouse[];
}
