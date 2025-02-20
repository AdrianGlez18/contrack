import {z} from "zod";
import { PrismaUser } from "@prisma/client";
import { ActionState } from "@/lib/server/actions/createSafeAction";

import { UserZodSchema } from "./schema";

export type InputType = z.infer<typeof UserZodSchema>;
export type OutputType = ActionState<InputType, PrismaUser>;
