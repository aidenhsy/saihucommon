import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page_no must be an integer' })
  @Min(1, { message: 'page_no must be a positive number' })
  page_no: number = 1;

  /**
   * Number of items per page (max 100)
   * @example 10
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page_size must be an integer' })
  @Min(1, { message: 'page_size must be at least 1' })
  @Max(100, { message: 'page_size cannot exceed 100' })
  page_size: number = 10;
}

export class PaginationResponseDto {
  total!: number;
  page_total!: number;
  current_page!: number;
  page_size!: number;
}

export class PaginatedResponseDto<T> {
  pagination!: PaginationResponseDto;
  data!: T;
}
