import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Prediction {
  place_id: string;
  description: string;
}

interface AddressDetails {
  formattedAddress: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export function useAddressAutocomplete() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((input: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (input.length < 1) {
      setPredictions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("google-maps-proxy", {
          body: { action: "autocomplete", input },
        });
        if (!error && data?.predictions) {
          setPredictions(data.predictions.slice(0, 5));
        }
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const getDetails = useCallback(async (placeId: string): Promise<AddressDetails | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("google-maps-proxy", {
        body: { action: "details", placeId },
      });
      if (error || !data?.result) return null;

      const components = data.result.address_components || [];
      const get = (type: string) =>
        components.find((c: any) => c.types.includes(type))?.long_name || "";
      const getShort = (type: string) =>
        components.find((c: any) => c.types.includes(type))?.short_name || "";

      return {
        formattedAddress: data.result.formatted_address || "",
        street: `${get("street_number")} ${get("route")}`.trim(),
        city: get("locality") || get("sublocality"),
        state: getShort("administrative_area_level_1"),
        zip: get("postal_code"),
      };
    } catch (err) {
      console.error("Place details error:", err);
      return null;
    }
  }, []);

  const clearPredictions = useCallback(() => setPredictions([]), []);

  return { predictions, isLoading, search, getDetails, clearPredictions };
}
