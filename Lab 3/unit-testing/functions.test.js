import { substring, slice, indexOf } from './functions.js';

describe('Substring function', () => {
    test('should return "ell" when getting substring(1,4) of "hello"', () => {
      expect(substring("hello", 1, 4)).toBe("ell");
    });
  
    test('should return empty string when start and end indexes are equal', () => {
      expect(substring("world", 2, 2)).toBe("");
    });
  
    test('should return entire string when start is 0 and end is string length', () => {
      const str = "testing";
      expect(substring(str, 0, str.length)).toBe(str);
    });
  
    test('should handle empty strings', () => {
      expect(substring("", 0, 1)).toBe("");
    });
  
    test('should return substring till end of string when end index exceeds length', () => {
      expect(substring("javascript", 4, 20)).toBe("script");
    });
  });

  describe('Slice function', () => {
    test('should return "ell" when slicing "Hello" from 1 to 4', () => {
      expect(slice("Hello", 1, 4)).toBe("ell");
    });
  
    test('should return entire string when no start and end provided', () => {
      expect(slice("Hello")).toBe("Hello");
    });
  
    test('should return empty string when start is greater than string length', () => {
      expect(slice("Hello", 10)).toBe("");
    });
  
    test('should return string from start index to end when only start is provided', () => {
      expect(slice("Hello World", 6)).toBe("World");
    });
  
    test('should handle empty string input', () => {
      expect(slice("", 0, 1)).toBe("");
    });
  });

  describe('indexOf function', () => {
    test('should find the index of a substring at the start of the string', () => {
      expect(indexOf('hello world', 'hello')).toBe(0);
    });
  
    test('should find the index of a substring in the middle of the string', () => {
      expect(indexOf('hello world', 'world')).toBe(6);
    });
  
    test('should return -1 when the substring is not found', () => {
      expect(indexOf('hello world', 'goodbye')).toBe(-1);
    });
  
    test('should be case-sensitive when searching', () => {
      expect(indexOf('Hello World', 'hello')).toBe(-1);
    });
  
    test('should return the first occurrence when multiple matches exist', () => {
      expect(indexOf('hello hello world', 'hello')).toBe(0);
    });
  });