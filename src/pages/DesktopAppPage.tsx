import ServicePageTemplate from "./ServicePageTemplate";
import desktop from '../../public/projects/desktop.jpg'
export default function DesktopAppPage() {
  return (
    <ServicePageTemplate
      baseKey="service.desktop"
      coverUrl={desktop}
    />
  );
}
