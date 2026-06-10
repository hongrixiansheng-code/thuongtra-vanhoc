import { Paywall } from "@/components/legacy/Paywall";

export default function PremiumToolsPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Premium Tools</h1>
      <Paywall />
    </div>
  );
}
