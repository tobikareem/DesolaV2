// Define the module augmentation for the Array prototype
declare global {
  interface Array<T> {
    distinct<K>(keySelector?: (item: T) => K): T[];
  }
}

// Implement the distinct method
Array.prototype.distinct = function<T, K>(keySelector?: (item: T) => K): T[] {
  const array = this as T[];
  
  if (!keySelector) {
    return [...new Set(array)];
  }
  
  const seen = new Set<K>();
  return array.filter(item => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export {};