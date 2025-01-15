import {z} from "zod";
import { Tool } from "@prisma/client";
import { ActionState } from "@/lib/server/actions/createSafeAction";

import { ToolZodSchema } from "./schema";

export type InputType = z.infer<typeof ToolZodSchema>;
export type OutputType = ActionState<InputType, Tool>;
