export interface Entity {
  _id?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Repository<T extends Entity> {
  create(entity: T): Promise<T>;
  findOneById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  findByCriteria(criteria: Record<string, any>): Promise<T[]>;
  updateById(id: string, updates: Partial<T>): Promise<T | undefined>;
  deleteById(id: string): Promise<void>;
}

export interface PropsWithSearchParams {
  searchParams?: Record<string, string>;
}

export interface APIListingResponse<T extends Entity> {
  results: T[];
}
