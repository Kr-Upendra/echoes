import { createClient } from "@supabase/supabase-js";
import { supabaseProjectUrl, supabaseApiKey } from "../constants";
console.log({ supabaseProjectUrl, supabaseApiKey });

export const supabase = createClient(supabaseProjectUrl, supabaseApiKey);
