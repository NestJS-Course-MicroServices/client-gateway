import { IsEnum } from "class-validator";
import { OrderStatus, orderStatusList } from "../enum/order.enum";

export class StatusDto {
    @IsEnum(orderStatusList, {
        message: `status valid are ${orderStatusList}`
    })
    status: OrderStatus;
}