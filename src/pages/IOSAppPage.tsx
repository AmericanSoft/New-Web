import ServicePageTemplate from "./ServicePageTemplate";
import ios from '../../public/projects/ios.jpg'
export default function IOSAppPage() {
  return (
    <ServicePageTemplate
      baseKey="service.ios"
      coverUrl={ios}
    />
  );
}
