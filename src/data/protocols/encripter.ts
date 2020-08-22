export interface Encripter {
  encript(value: string): Promise<string>
}
