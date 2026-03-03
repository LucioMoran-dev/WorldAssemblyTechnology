/**
 * Tipos relacionados con Newsletter y Campañas
 */

export type CampaignType = "custom" | "monthly" | "promo" | "welcome";
export type CampaignStatus = "draft" | "scheduled" | "sending" | "sent" | "failed";

export interface INewsletterSubscribeDto {
  email: string;
  name?: string;
}

export interface INewsletterStats {
  total: number;
  sent: number;
  failed: number;
  opened: number;
  clicked: number;
}

export interface ICampaign {
  id: string;
  name: string;
  subject: string;
  title: string;
  body: string;
  discountCode?: string;
  featuredProductIds?: string[];
  ctaText: string;
  ctaUrl: string;
  campaignType: CampaignType;
  status: CampaignStatus;
  scheduledFor?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCampaignDto {
  name: string;
  subject: string;
  title: string;
  body: string;
  discountCode?: string;
  featuredProductIds?: string[];
  ctaText: string;
  ctaUrl: string;
  campaignType: CampaignType;
  scheduledFor?: string;
}

export interface IUpdateCampaignDto {
  name?: string;
  subject?: string;
  title?: string;
  body?: string;
  discountCode?: string;
  featuredProductIds?: string[];
  ctaText?: string;
  ctaUrl?: string;
  campaignType?: CampaignType;
  scheduledFor?: string;
}

export interface ISendPromoDto {
  promoCode: string;
}

export interface ICampaignListParams {
  page?: number;
  limit?: number;
  status?: CampaignStatus;
  campaignType?: CampaignType;
}
