import { AdsLanding, adsMetadata } from "@/components/pages/ads-landing";
import { HOUSE_WASH_LP } from "@/lib/ads-pages";

export const metadata = adsMetadata(HOUSE_WASH_LP);

export default function Page() {
  return <AdsLanding page={HOUSE_WASH_LP} />;
}
