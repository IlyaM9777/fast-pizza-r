import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sspsbllbwsxkhzljwccx.supabase.co"; //it will change in another project
const supabaseKey = "sb_publishable_cMKu8VCKxbaoF0fSkrpc3g_6QHR8cVi";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
