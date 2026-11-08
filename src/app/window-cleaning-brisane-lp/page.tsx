import { AdsLanding, adsMetadata } from "@/components/pages/ads-landing";
import { WINDOW_WASH_LP } from "@/lib/ads-pages";

export const metadata = adsMetadata(WINDOW_WASH_LP);

export default function Page() {
  return <AdsLanding page={WINDOW_WASH_LP} />;
}
