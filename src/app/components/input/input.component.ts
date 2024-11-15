import { Component, forwardRef, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { LoggerService } from '../modules/logger/logger.service';
import { trace } from '../modules/logger/logger-tracer';
import { SelectOption } from '../input-select/input-select.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  @Input() label: string = "";
  @Input() id: string = "";
  @Input() required: boolean = true;
  @Input()
  errorMessage!: string;
  @Input()
  successMessage!: string;
  @Input() type: "password" | "text" | "date" | "array:string" | "entity:carrier" | "email" = "text";
  @Input() disabled: boolean = false;
  @Input() role: string = "";
  @Input() autocomplete: string = "";
  @Input()
  form!: FormGroup;
  @Input() formControlName: any;
  @Input()
  formControl!: FormControl;
  @Input() selectOptions: SelectOption[] = [];
  @Input()
  minLength!: number;
  @Input() validateOnSubmit: boolean = false;
  @Input()
  pattern!: string;
  @Input() placeholder: string = "";
  @ViewChild('inputElement')
  inputElement!: ElementRef;

  inputControl!: FormControl;
  value!: string | Date;
  showError: boolean = false;
  showSuccess: boolean = false;
  option!: SelectOption;
  selectControl: FormControl = new FormControl();
  showPassword: boolean = false;
  isInputFocused: boolean = false;
  hasInteracted: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
    this.inputControl = this.formControl || new FormControl('');

    this.setupValidators();

    this.inputControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.inputControl.touched) {
          this.inputControl.markAsTouched();
        }
        if (this.hasInteracted) {
          this.updateValidationStatus(true);
        }
        this.onChange(this.inputControl.value);
      });

    this.inputControl.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.hasInteracted) {
          this.updateValidationStatus();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loggerService.log("changes: ", changes);

    if (changes['pattern']) {
      this.setupValidators();
    }

    if (changes["selectOptions"] && (this.type === "array:string" || this.type === "entity:carrier")) {
      setTimeout(() => {
        const selectedOption = this.selectOptions.find(option => option.value === this.value);
        if (selectedOption) {
          this.option = selectedOption;
          this.selectControl.setValue(selectedOption.value, { emitEvent: false });
        }
      });
    }
    if (changes['validateOnSubmit']) {
      this.updateValidationStatus();
    }
  }
  focus() {
    this.inputElement?.nativeElement?.focus();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupValidators() {
    const validators = [];

    if (this.required) {
      validators.push(Validators.required);
    }

    if (this.type === 'email') {
      validators.push(Validators.email);
    }

    if (this.minLength) {
      validators.push(Validators.minLength(this.minLength));
    }

    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    if (validators.length > 0) {
      this.inputControl.setValidators(validators);
      this.inputControl.updateValueAndValidity();
    }
  }

  @trace()
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputControl.setValue(value);
    this.value = this.type === 'date' ? new Date(value) : value;
    this.onChange(this.value);
  }

  @trace()
  onBlur(): void {
    this.isInputFocused = false;
    this.onTouched();
    this.updateValidationStatus();
  }

  onFocus(): void {
    this.isInputFocused = true;
    this.hasInteracted = true;
  }

  @trace()
  onOptionChange(newOption: SelectOption) {
    this.option = newOption;
    this.selectControl.setValue(newOption);
    this.value = newOption.value;
    this.inputControl.setValue(newOption.value, { emitEvent: false });
    this.onChange(this.value);
    this.onTouched();
    this.updateValidationStatus();
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }

  private updateValidationStatus(forceValidation: boolean = false): void {
    if (!this.inputControl || (!this.hasInteracted && !this.validateOnSubmit)) {
      return;
    }

    if (this.type === 'array:string' || this.type === 'entity:carrier') {
      this.showError = !this.selectControl.value &&
        (this.inputControl.touched || this.validateOnSubmit || forceValidation);
    } else {
      this.showError = this.inputControl.invalid &&
        (this.inputControl.touched || this.validateOnSubmit || forceValidation);
    }

    this.showSuccess = this.inputControl.valid &&
      (this.inputControl.touched || this.validateOnSubmit || forceValidation) &&
      this.inputControl.value !== '';
  }

  @trace()
  writeValue(value: any): void {
    this.value = value;
    this.inputControl.setValue(value, { emitEvent: false });
    if (this.type === 'array:string' || this.type === 'entity:carrier') {
      const selectedOption = this.selectOptions.find(option => option.value === value);
      if (selectedOption) {
        this.option = selectedOption;
        this.selectControl.setValue(selectedOption, { emitEvent: false });
      }
    }
    this.updateValidationStatus();
  }

  @trace()
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  @trace()
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @trace()
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
    if (this.type === 'array:string' || this.type === 'entity:carrier') {
      isDisabled ? this.selectControl.disable() : this.selectControl.enable();
    }
  }

  resetValidation(): void {
    this.inputControl?.markAsUntouched();
    this.inputControl?.markAsPristine();
    this.hasInteracted = false;

    if (this.type === 'array:string' || this.type === 'entity:carrier') {
      this.selectControl?.markAsUntouched();
      this.selectControl?.markAsPristine();
    }

    this.showError = false;
    this.showSuccess = false;
  }
  onChange = (value: any) => { };
  onTouched = () => { };
}