import { AlertTriangle } from "lucide-react";
import { Button } from "@heroui/react";
export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full rounded-xl bg-white shadow-lg p-8 text-center">
        <AlertTriangle className="mx-auto h-14 w-14 text-red-500" />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Oops! Something went wrong.
        </h1>

        <p className="mt-2 text-gray-600">An unexpected error occurred.</p>

        {import.meta.env.DEV && (
          <pre className="mt-4 rounded bg-gray-900 p-4 text-left text-sm text-red-400 overflow-auto">
            {error.message}
          </pre>
        )}

        <Button
          onPress={resetErrorBoundary}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
