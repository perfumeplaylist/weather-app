import { useParams, useSearchParams } from "react-router";

export const useLocationParams = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  return { locationId, lat, lon };
};
