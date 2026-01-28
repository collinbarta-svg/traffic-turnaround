export interface Service {
  id: string;
  name: string;
  description: string;
  pricePerQuarterAcre: number;
  isPerVisit?: boolean;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "lawn-mowing",
    name: "Lawn Mowing",
    description: "Complete lawn care including mowing, string trimming, and blowing",
    pricePerQuarterAcre: 75,
    features: ["Professional mowing", "String trimming", "Debris blowing"],
    icon: "grass",
  },
  {
    id: "dethatching",
    name: "Dethatching",
    description: "Remove thatch buildup to promote healthy lawn growth",
    pricePerQuarterAcre: 165,
    features: ["Thatch removal", "Waste haul-away", "Proper disposal"],
    icon: "rake",
  },
  {
    id: "aerating",
    name: "Aerating",
    description: "Core aeration to improve soil health and root growth",
    pricePerQuarterAcre: 175,
    features: ["Core aeration", "Improved drainage", "Better nutrient absorption"],
    icon: "shovel",
  },
  {
    id: "fertilizer-weed-control",
    name: "Fertilizer & Weed Control",
    description: "Four seasonal treatments for a healthy, weed-free lawn",
    pricePerQuarterAcre: 150,
    features: ["Four treatments per season", "Weed prevention", "Lawn nutrition"],
    icon: "spray",
  },
  {
    id: "snow-plowing",
    name: "Snow Plowing",
    description: "Reliable snow removal to keep your property safe and accessible",
    pricePerQuarterAcre: 75,
    isPerVisit: true,
    features: ["Driveway plowing", "Sidewalk shoveling", "Front steps clearing"],
    icon: "snowflake",
  },
];

export const DISCLAIMER_TEXT = "Pricing shown is a preliminary estimate. Every property is different, and final pricing may vary.";

export const FULL_DISCLAIMER = "All prices shown are approximate estimates and subject to change. Prices do not include applicable sales tax. A professional on-site evaluation will be conducted to determine final pricing, and no work will be performed without customer approval of the final estimate.";

export const CONFIRMATION_MESSAGE = "Thank you for your request. A team member will contact you to schedule an on-site evaluation and confirm final pricing before any service is performed.";

export function calculateServicePrice(service: Service, quarterAcres: number): number {
  return service.pricePerQuarterAcre * quarterAcres;
}

export function calculateTotal(selectedServices: string[], quarterAcres: number): number {
  return selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return total;
    return total + calculateServicePrice(service, quarterAcres);
  }, 0);
}
