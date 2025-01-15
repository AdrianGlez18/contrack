import { z} from "zod";
import { UpdateBoardSchema } from "./schema";
import { ActionState } from "../../createSafeAction";
import { BoardModel } from "@prisma/client";

export type InputType = z.infer<typeof UpdateBoardSchema>
export type OutputType = ActionState<InputType, BoardModel>