import PricingCard from "../components/PricingCard";
import { websitePricingData } from "../data";

export default function WebsitePricing() {
  return (
    <section>
      <div className="container py-5">
        <div className="row text-center align-items-end">
          {websitePricingData.plans.map((plan, index) => (
            <PricingCard key={index} {...plan} featuresList={websitePricingData.featuresList} />
          ))}
        </div>
      </div>
    </section>
  );
}
