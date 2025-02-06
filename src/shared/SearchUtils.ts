export class SearchUtils {
  static isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  static isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  // 🔍 Búsqueda por campo específico o búsqueda global si no se define un campo
  static searchInObject(obj: unknown, query: string, field?: string): boolean {
    if (obj == null) return false;

    if (field && this.isObject(obj)) {
      const value = obj[field];
      return value !== undefined && value !== null
        ? value.toString().toLowerCase().includes(query.toLowerCase())
        : false;
    }

    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return obj.toString().toLowerCase().includes(query.toLowerCase());
    }

    if (this.isArray(obj)) {
      return obj.some((item) => this.searchInObject(item, query));
    }

    if (this.isObject(obj)) {
      return Object.values(obj).some((value) => this.searchInObject(value, query));
    }

    return false;
  }
}
