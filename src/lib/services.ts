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
    description: "Professional weekly lawn mowing services",
    basePrice: 65,
    additionalQuarterAcrePrice: 25,
    features: ["Professional mowing", "String trimming", "Debris cleanup"],
    icon: "grass",
  },
  {
    id: "brush-yard-cleanup-spring",
    name: "Spring Clean Up",
    description: "Winter debris removal, garden bed & perennial care",
    basePrice: 275,
    additionalQuarterAcrePrice: 40,
    features: ["Debris removal", "Garden bed cleaning", "Perennial care"],
    icon: "rake",
  },
  {
    id: "brush-yard-cleanup",
    name: "Fall / Leaf Clean Up",
    description: "Full leaf and debris removal to prepare for winter",
    basePrice: 300,
    additionalQuarterAcrePrice: 40,
    features: ["Leaf removal", "Debris cleanup", "Winter prep"],
    icon: "rake",
  },
  {
    id: "fertilizer-weed-control",
    name: "Lawn Fertilizing & Weed Control",
    description: "Essential nutrients for thicker, greener grass",
    basePrice: 155,
    additionalQuarterAcrePrice: 30,
    features: ["Essential nutrients", "Weed prevention", "Greener lawn"],
    icon: "spray",
  },
  {
    id: "dethatching",
    name: "Lawn Dethatching",
    description: "Remove built-up organic matter for better absorption",
    basePrice: 240,
    additionalQuarterAcrePrice: 47,
    features: ["Thatch removal", "Waste disposal included", "Healthier lawn"],
    icon: "rake",
  },
  {
    id: "aerating",
    name: "Lawn Aeration",
    description: "Core plug aeration for deeper root growth",
    basePrice: 220,
    additionalQuarterAcrePrice: 25,
    features: ["Core aeration", "Reduced compaction", "Deeper roots"],
    icon: "shovel",
  },
  {
    id: "overseeding",
    name: "Lawn Overseeding",
    description: "Fill thin areas for a fuller, healthier lawn",
    basePrice: 295,
    additionalQuarterAcrePrice: 205,
    isCustom: true,
    features: ["Fills thin areas", "Turf density", "Healthier lawn"],
    icon: "spray",
  },
  {
    id: "snow-plowing",
    name: "Snow Plowing & Ice Control",
    description: "Snow removal for driveways and walkways",
    basePrice: 75,
    additionalQuarterAcrePrice: 0,
    isPerVisit: true,
    features: ["Driveway plowing", "Ice control", "Safe access"],
    icon: "snowflake",
  },
  {
    id: "custom-landscaping",
    name: "Custom Landscaping",
    description: "Gardening, pruning, tree trimming, rock beds & mulch",
    basePrice: 0,
    additionalQuarterAcrePrice: 0,
    isCustom: true,
    features: ["Landscape gardening", "Pruning & trimming", "Mulch & rock beds"],
    icon: "trees",
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
      return { label: "Custom", description: "Call for estimate", requiresCustom: true };

    case "aerating":
      if (acres <= 0.25) return { label: "Tier 1", description: "Small lot estimate", requiresCustom: false };
      if (acres <= 0.5) return { label: "Tier 2", description: "Standard lot estimate", requiresCustom: false };
      return { label: "Custom", description: "Call for estimate", requiresCustom: true };

    case "snow-plowing":
      if (acres > 0.5) return { label: "Review", description: "Call for estimate", requiresCustom: true };
      return { label: "Standard", description: "Standard estimate", requiresCustom: false };

    case "brush-yard-cleanup":
      return { label: "Custom", description: "Call for estimate", requiresCustom: true };

    default:
      // dethatching, fertilizer-weed-control
      if (acres <= 0.25) return { label: "Tier 1", description: "Small lot estimate", requiresCustom: false };
      if (acres <= 0.5) return { label: "Tier 2", description: "Standard lot estimate", requiresCustom: false };
      if (acres <= 1) return { label: "Tier 3", description: "Large lot estimate", requiresCustom: false };
      return { label: "Custom", description: "Call for estimate", requiresCustom: true };
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
