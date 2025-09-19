import RTEWrapper from "../../components/RTEWrapper";

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">WYSIWYG — Word style editor</h1>
      <RTEWrapper />
    </main>
  );
}