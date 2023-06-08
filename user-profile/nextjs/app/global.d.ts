import type { Database as DB } from "@/lib/schema";

declare global {
  type Database = DB;
  type ProfileInfo = DB["public"]["Tables"]["profiles_info"]["Row"];
  type Profiles = DB["public"]["Tables"]["profiles"]["Row"];
  type Profile = Profiles & {
    profiles_info: ProfileInfo | ProfileInfo[] | null;
  };
}
