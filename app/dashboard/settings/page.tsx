import SettingsPanel from "@/components/SettingsPanel";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SettingsPanel userEmail={user?.email} />;
}
