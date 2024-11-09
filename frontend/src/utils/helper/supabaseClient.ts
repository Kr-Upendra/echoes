import { createClient } from "@supabase/supabase-js";
import { supabaseProjectUrl, supabaseApiKey } from "../constants";

export const supabase = createClient(supabaseProjectUrl, supabaseApiKey);
