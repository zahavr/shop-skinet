import {IProduct} from './product.interface';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}
