import {z} from "zod";
import { Folder } from "@prisma/client";
import { ActionState } from "@/lib/server/actions/createSafeAction";

import { FolderZodSchema } from "./schema";

export type InputType = z.infer<typeof FolderZodSchema>;
export type OutputType = ActionState<InputType, Folder>;
