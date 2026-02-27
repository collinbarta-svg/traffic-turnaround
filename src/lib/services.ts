export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  additionalQuarterAcrePrice: number;
  isPerVisit?: boolean;
  isCustom?: boolean;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "lawn-mowing",
    name: "Lawn Mowing",
    description: "Complete lawn care including mowing, string trimming, and blowing",
    basePrice: 75,
    additionalQuarterAcrePrice: 25,
    features: ["Professional mowing", "String trimming", "Debris blowing"],
    icon: "grass",
  },
  {
    id: "dethatching",
    name: "Dethatching",
    description: "Remove thatch buildup to promote healthy lawn growth",
    basePrice: 165,
    additionalQuarterAcrePrice: 25,
    features: ["Thatch removal", "Waste haul-away", "Proper disposal"],
    icon: "rake",
  },
  {
    id: "aerating",
    name: "Aerating",
    description: "Core aeration to improve soil health and root growth",
    basePrice: 175,
    additionalQuarterAcrePrice: 25,
    features: ["Core aeration", "Improved drainage", "Better nutrient absorption"],
    icon: "shovel",
  },
  {
    id: "fertilizer-weed-control",
    name: "Fertilizer & Weed Control",
    description: "Four seasonal treatments for a healthy, weed-free lawn",
    basePrice: 150,
    additionalQuarterAcrePrice: 25,
    features: ["Four treatments per season", "Weed prevention", "Lawn nutrition"],
    icon: "spray",
  },
  {
    id: "snow-plowing",
    name: "Snow Plowing",
    description: "Reliable snow removal to keep your property safe and accessible",
    basePrice: 75,
    additionalQuarterAcrePrice: 0,
    isPerVisit: true,
    features: ["Driveway plowing", "Sidewalk shoveling", "Front steps clearing"],
    icon: "snowflake",
  },
  {
    id: "brush-cleanup",
    name: "Brush Cleanup",
    description: "Professional brush and debris removal — custom quote required",
    basePrice: 0,
    additionalQuarterAcrePrice: 0,
    isCustom: true,
    features: ["Brush removal", "Debris hauling", "Custom pricing"],
    icon: "trees",
  },
  {
    id: "sod-installation",
    name: "Sod Installation",
    description: "Full sod installation including ground prep, grading, and fresh sod",
    basePrice: 0,
    additionalQuarterAcrePrice: 0,
    isCustom: true,
    features: ["Ground preparation", "Grading & tilling", "Sod delivery & install"],
    icon: "shovel",
  },
];

export const DISCLAIMER_TEXT = "Pricing shown is a preliminary estimate based on public property data.";

export const FULL_DISCLAIMER = "All prices shown are approximate estimates and subject to change. Prices do not include applicable sales tax. A professional on-site evaluation will be conducted to determine final pricing, and no work will be performed without customer approval of the final estimate.";

export const CONFIRMATION_MESSAGE = "Thank you for your request. A team member will contact you to schedule an on-site evaluation and confirm final pricing before any service is performed.";

export interface EstimateTier {
  label: string;
  description: string;
  requiresCustom: boolean;
}

/**
 * Get the estimate tier for a service based on property size in acres.
 */
export function getEstimateTier(serviceId: string, acres: number): EstimateTier {
  switch (serviceId) {
    case "lawn-mowing":
      if (acres <= 0.25) return { label: "Tier 1", description: "Small lot estimate", requiresCustom: false };
      if (acres <= 0.5) return { label: "Tier 2", description: "Standard lot estimate", requiresCustom: false };
      if (acres <= 1) return { label: "Tier 3", description: "Large lot estimate", requiresCustom: false };
      return { label: "Custom", description: "Custom estimate required", requiresCustom: true };

    case "aerating":
      if (acres <= 0.25) return { label: "Tier 1", description: "Small lot estimate", requiresCustom: false };
      if (acres <= 0.5) return { label: "Tier 2", description: "Standard lot estimate", requiresCustom: false };
      return { label: "Custom", description: "Custom estimate required", requiresCustom: true };

    case "snow-plowing":
      if (acres > 0.5) return { label: "Review", description: "Flagged for manual review", requiresCustom: true };
      return { label: "Standard", description: "Standard estimate", requiresCustom: false };

    default:
      // dethatching, fertilizer-weed-control
      if (acres <= 0.25) return { label: "Tier 1", description: "Small lot estimate", requiresCustom: false };
      if (acres <= 0.5) return { label: "Tier 2", description: "Standard lot estimate", requiresCustom: false };
      if (acres <= 1) return { label: "Tier 3", description: "Large lot estimate", requiresCustom: false };
      return { label: "Custom", description: "Custom estimate required", requiresCustom: true };
  }
}

export function calculateServicePrice(service: Service, quarterAcres: number): number {
  if (service.isPerVisit || service.isCustom) {
    return service.basePrice;
  }
  const additionalQuarterAcres = Math.max(0, quarterAcres - 1);
  return service.basePrice + (additionalQuarterAcres * service.additionalQuarterAcrePrice);
}

export function calculateTotal(selectedServices: string[], quarterAcres: number): number {
  return selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return total;
    return total + calculateServicePrice(service, quarterAcres);
  }, 0);
}

/**
 * Check if any selected service requires a custom estimate at the given property size.
 */
export function hasCustomEstimateRequired(selectedServices: string[], acres: number): boolean {
  return selectedServices.some(id => getEstimateTier(id, acres).requiresCustom);
}
