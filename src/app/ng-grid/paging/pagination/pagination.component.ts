import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfigModel, PagesModel, PaginationLinkContext, PaginationNumberLinkContext } from '../../models/page';
import { PaginationConfig } from '../../models/pagination';

export interface PageChangedEvent {
  itemsPerPage: number;
  page: number;
}

export const PAGINATION_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true
};

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
})
export class PaginationComponent implements ControlValueAccessor, OnInit {

  config: ConfigModel;
  @Input() align: boolean;
  @Input() maxSize: number;
  @Input() boundaryLinks: boolean;
  @Input() directionLinks: boolean;
  @Input() firstText: string;
  @Input() previousText: string;
  @Input() nextText: string;
  @Input() lastText: string;
  @Input() rotate: boolean;
  @Input() pageBtnClass: string;
  @Input() disabled: boolean;
  @Input() customPageTemplate: TemplateRef<PaginationNumberLinkContext>;
  @Input() customNextTemplate: TemplateRef<PaginationLinkContext>;
  @Input() customPreviousTemplate: TemplateRef<PaginationLinkContext>;
  @Input() customFirstTemplate: TemplateRef<PaginationLinkContext>;
  @Input() customLastTemplate: TemplateRef<PaginationLinkContext>;

  @Output() numPages: EventEmitter<number> = new EventEmitter<number>();

  @Output() pageChanged = new EventEmitter<PageChangedEvent>();

  @Input() get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  @Input() get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(v: number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(v: number) {
    this._totalPages = v;
    this.numPages.emit(v);
    if (this.inited) {
      this.selectPage(this.page);
    }
  }

  set page(value: number) {
    const _previous = this._page;
    this._page = value > this.totalPages ? this.totalPages : value || 1;
    this.changeDetection.markForCheck();

    if (_previous === this._page || typeof _previous === 'undefined') {
      return;
    }

    this.pageChanged.emit({
      page: this._page,
      itemsPerPage: this.itemsPerPage
    });
  }

  get page(): number {
    return this._page;
  }

  onChange = Function.prototype;
  onTouched = Function.prototype;

  classMap: string;
  pages: PagesModel[];

  protected _itemsPerPage: number;
  protected _totalItems: number;
  protected _totalPages: number;
  protected inited = false;
  protected _page = 1;

  constructor(
    private elementRef: ElementRef,
    paginationConfig: PaginationConfig,
    private changeDetection: ChangeDetectorRef
  ) {
    this.elementRef = elementRef;
    if (!this.config) {
      this.configureOptions(paginationConfig.main);
    }
  }

  configureOptions(config: ConfigModel): void {
    this.config = Object.assign({}, config);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
    }
    this.maxSize =
      typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
    this.rotate =
      typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
    this.boundaryLinks =
      typeof this.boundaryLinks !== 'undefined'
        ? this.boundaryLinks
        : this.config.boundaryLinks;
    this.directionLinks =
      typeof this.directionLinks !== 'undefined'
        ? this.directionLinks
        : this.config.directionLinks;
    this.pageBtnClass =
      typeof this.pageBtnClass !== 'undefined'
        ? this.pageBtnClass
        : this.config.pageBtnClass;

    this.itemsPerPage =
      typeof this.itemsPerPage !== 'undefined'
        ? this.itemsPerPage
        : this.config.itemsPerPage;
    this.totalPages = this.calculateTotalPages();

    this.pages = this.getPages(this.page, this.totalPages);
    this.inited = true;
  }

  writeValue(value: number): void {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  getText(key: string): string {
    return (this as any)[`${key}Text`] || (this as any).config[`${key}Text`];
  }

  noPrevious(): boolean {
    return this.page === 1;
  }

  noNext(): boolean {
    return this.page === this.totalPages;
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  selectPage(page: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled) {
      if (event && event.target) {
        const target: any = event.target;
        target.blur();
      }
      this.writeValue(page);
      this.onChange(this.page);
    }
  }

  protected makePage(
    num: number,
    text: string,
    active: boolean
  ): { number: number; text: string; active: boolean } {
    return { text, number: num, active };
  }

  protected getPages(currentPage: number, totalPages: number): PagesModel[] {
    const pages: PagesModel[] = [];

    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized =
      typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

    if (isMaxSized) {
      if (this.rotate) {
        startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
        endPage = startPage + this.maxSize - 1;

        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - this.maxSize + 1;
        }
      } else {
        startPage =
          (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;

        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }

    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        const previousPageSet = this.makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }

      if (endPage < totalPages) {
        const nextPageSet = this.makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
    }

    return pages;
  }


  protected calculateTotalPages(): number {
    const totalPages =
      this.itemsPerPage < 1
        ? 1
        : Math.ceil(this.totalItems / this.itemsPerPage);

    return Math.max(totalPages || 0, 1);
  }

}