import { customAlphabet } from 'nanoid'

export const alphabetNumber = '0123456789'
export const alphabetSymbols = '~!@#$%^&*()_+`-={}|[]\\:";\'<>?,./'
export const alphabetUpperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const alphabetLowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetLetters =
  alphabetUpperCaseLetters + alphabetLowerCaseLetters
export const alphabetAll = alphabetNumber + alphabetLetters + alphabetSymbols

export const nanoid = (alphabet = alphabetAll, length = 8) => {
  return customAlphabet(alphabet, length)()
}
