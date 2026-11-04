import { AdsLanding, adsMetadata } from "@/components/pages/ads-landing";
import { PRESSURE_WASH_LP } from "@/lib/ads-pages";

export const metadata = adsMetadata(PRESSURE_WASH_LP);

export default function Page() {
  return <AdsLanding page={PRESSURE_WASH_LP} />;
}
