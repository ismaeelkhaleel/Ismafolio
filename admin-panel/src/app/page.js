import ThemeToggle from "./dark";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Hello World 🌍 ismaeel
      </h1>
      <ThemeToggle />
    </div>
  );
}
