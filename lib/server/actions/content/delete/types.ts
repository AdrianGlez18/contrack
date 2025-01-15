import { z} from "zod";
import { ToolZodSchema } from "./schema";
import { ActionState } from "@/lib/server/actions/createSafeAction";
import { Tool } from "@prisma/client";

export type InputType = z.infer<typeof ToolZodSchema>
export type OutputType = ActionState<InputType, Tool>