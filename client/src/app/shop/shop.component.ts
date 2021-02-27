import {Component, OnInit} from '@angular/core';
import {IProduct} from '../shared/interfaces/product.interface';
import {ShopService} from './shop.service';
import {IPagination} from '../shared/interfaces/pagination.interface';
import {IProductType} from '../shared/interfaces/productType.interface';
import {IBrand} from '../shared/interfaces/brand.interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  productTypes: IProductType[];
  brands: IBrand[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
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

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe((res: IPagination) => {
      this.products = res.data;
    }, error => {
      console.log(error);
    });
  }

  getProductTypes() {
    this.shopService.getProductTypes().subscribe((res: IProductType[]) => {
      this.productTypes = [{id: 0, name: 'All'}, ...res];
    }, error => {
      console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe((res: IBrand[]) => {
      this.brands = [{id: 0, name: 'All'}, ...res];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }
}
