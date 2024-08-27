import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = (this.query?.searchTerm as string) ?? '';
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: searchTerm,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter(excludeFields: string[]) {
    const queryCopy = structuredClone(this.query);
    excludeFields.forEach((field) => delete queryCopy[field]);

    // Filter by price range if provided
    if (this.query?.priceRange) {
      const priceRange = (this.query?.priceRange as string).split('-');
      if (priceRange.length === 2) {
        const minPrice = parseFloat(priceRange[0]);
        const maxPrice = parseFloat(priceRange[1]);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          this.modelQuery = this.modelQuery.find({
            price: { $gte: minPrice, $lte: maxPrice },
          });
        }
      }
    }

    this.modelQuery = this.modelQuery.find(queryCopy as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortField: string = (this.query?.sort as string) || 'createdAt';
    const order: string = this.query?.order === 'desc' ? '-' : '';

    this.modelQuery = this.modelQuery.sort(`${order}${sortField}`);

    return this;
  }

  paginate() {
    const limit: number = Number(this?.query?.limit as number) || 10;
    const page: number = Number(this?.query?.page as number) || 1;
    const skip: number = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const selectedFields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(selectedFields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}
