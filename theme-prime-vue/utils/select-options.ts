// 1. A single, generic option type:
export interface SelectOption<T> {
  label: string
  value: T
}

// Convert single T → SelectOption<T>
export function convertToSelectOption<T extends string | number>(item: T): SelectOption<T> {
  return {
    label: typeof item === 'string' ? stringCapitalize(item) : String(item),
    value: item,
  }
}

// Convert single SelectOption<T> → T
export function convertOptionToRaw<T extends string | number>(option: SelectOption<T>): T {
  return option.value
}

// Convert T[] → SelectOption<T>[] by reusing convertToSelectOption
export function convertToSelectOptions<T extends string | number>(items: T[]): SelectOption<T>[] {
  return items.map((item) => convertToSelectOption(item))
}

//  Convert SelectOption<T>[] → T[] by reusing convertOptionToRaw
export function convertToRawData<T extends string | number>(options: SelectOption<T>[]): T[] {
  return options.map((opt) => convertOptionToRaw(opt))
}
