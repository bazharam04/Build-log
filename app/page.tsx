import { supabase, type BuildLog } from "@/lib/supabase";
import SubmitForm from "@/app/components/SubmitForm";
import BuildCard from "@/app/components/BuildCard";

export const revalidate = 0;

async function getLogs(): Promise<BuildLog[]> {
  const { data, error } = await supabase
    .from("build_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch build logs:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function Home() {
  const logs = await getLogs();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Build Log
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          A public wall where builders post what they shipped.
        </p>
      </div>

      {/* Submit form */}
      <SubmitForm />

      {/* Feed */}
      {logs.length === 0 ? (
        <div className="text-center py-16 text-gray-600 text-sm">
          No builds logged yet. Be the first to ship something!
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <BuildCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </main>
  );
}
