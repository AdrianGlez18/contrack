import {z} from "zod";
import { Content } from "@prisma/client";
import { ActionState } from "@/lib/server/actions/createSafeAction";

import { ContentZodSchema } from "./schema";

export type InputType = z.infer<typeof ContentZodSchema>;
export type OutputType = ActionState<InputType, Content>;
