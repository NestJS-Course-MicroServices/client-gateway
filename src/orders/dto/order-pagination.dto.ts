import { PaginationDto } from "src/common/dto/pagination.dto";
import { OrderStatus, orderStatusList } from "../enum/order.enum";
import { IsEnum, IsOptional } from "class-validator";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(orderStatusList, {
        message: `Valid status are ${orderStatusList}`
    })
    status: OrderStatus;
}