import ServicePageTemplate from "./ServicePageTemplate";
import ando from '../../public/projects/ando.jpg'
export default function AndroidAppPage() {
  return (
    <ServicePageTemplate
      baseKey="service.android"
      coverUrl={ando}
    />
  );
}
