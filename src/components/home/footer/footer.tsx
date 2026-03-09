import { FooterBottom } from "./footer-bottom";
import { FooterLinks } from "./footer-links";
import { FooterNewsletter } from "./footer-newsletter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <FooterNewsletter />
      <FooterLinks />
      <FooterBottom />
    </footer>
  );
}
