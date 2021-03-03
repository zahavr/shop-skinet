import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from '../shared/interfaces/product.interface';
import {ShopService} from './shop.service';
import {IPagination} from '../shared/interfaces/pagination.interface';
import {IProductType} from '../shared/interfaces/productType.interface';
import {IBrand} from '../shared/interfaces/brand.interface';
import {ShopParams} from '../shared/interfaces/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchInput: ElementRef;
  products: IProduct[];
  productTypes: IProductType[];
  brands: IBrand[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe((res: IPagination) => {
      this.products = res.data;
      this.shopParams.pageNumber = res.pageIndex;
      this.shopParams.pageSize = res.pageSize;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
    });
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe((res: IProductType[]) => {
      this.productTypes = [{id: 0, name: 'All'}, ...res];
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe((res: IBrand[]) => {
      this.brands = [{id: 0, name: 'All'}, ...res];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any): void {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchInput.nativeElement.value;
    this.getProducts();
  }

  onReset(): void {
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
