import { Component, EventEmitter, Input, OnChanges, OnInit, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule
  ]
})
export class InputSelectComponent implements OnChanges, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() listId: string = '';
  @Input() options: SelectOption[] = [];
  @Input() disabled: boolean = false;
  @Input() selection: SelectOption | undefined;
  @Output() selectionChange = new EventEmitter<SelectOption>();
  @Input() formControl!: FormControl;
  @ViewChild('singleSelect') singleSelect!: MatSelect;

  selectCtrl: FormControl<SelectOption | null> = new FormControl<SelectOption | null>(null);
  filterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  filteredOptions: ReplaySubject<SelectOption[]> = new ReplaySubject<SelectOption[]>(1);

  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.filteredOptions.next(this.options.slice());

    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });

    this.formControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(value => {
        console.log('Novo valor do select:', value);
      });

    this.formControl.statusChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.disabled = this.formControl.disabled;
        if (this.formControl.disabled) {
          this.selectCtrl.disable();
        } else {
          this.selectCtrl.enable();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["options"]) {
      this.filteredOptions.next(this.options.slice());
    }
    if (changes["selection"]) {
      this.selectCtrl.setValue(this.selection || null);
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterOptions() {
    if (!this.options) {
      return;
    }
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredOptions.next(
      this.options.filter(option => option.label.toLowerCase().includes(search!))
    );
  }

  onSelectionChange(event: MatSelectChange) {
    this.selection = event.value;
    this.selectionChange.emit(event.value);
  }
}

export interface SelectOption {
  label: string;
  value: string;
}