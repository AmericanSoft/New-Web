// src/pages/AboutCompany.en.jsx
import React from "react";
import {
  Box, Container, Heading, Text, HStack, VStack, SimpleGrid, GridItem,
  Button, Icon, Badge, Image, useColorModeValue, Divider, List, ListItem, ListIcon,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Avatar, chakra,
} from "@chakra-ui/react";
import { MdCheckCircle, MdOutlineSecurity, MdEmail, MdPhone } from "react-icons/md";
import { RiShieldCheckLine, RiTeamLine, RiTimeLine, RiMedalLine, RiBuilding2Line } from "react-icons/ri";
import { FaHandshake, FaRegFileAlt, FaMoneyCheckAlt, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";

// إن كنت حاطط الصور تحت public/ يفضّل استخدام مسارات مطلقة بدل import
import img1 from "../../public/assets/clients/AmericanGroups.png";
import img2 from "../../public/assets/clients/CairoStore.png";
import img3 from "../../public/assets/clients/Containertrend.png";
import img4 from "../../public/assets/clients/chiller.jpg";

const Section = ({ children, py }) => (
  <Box as="section" py={py || { base: 10, md: 14, lg: 16 }}>{children}</Box>
);

const StatCard = ({ label, value, hint }) => {
  const bg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  return (
    <VStack
      p={{ base: 4, md: 5 }}
      align="start"
      bg={bg}
      border="1px solid"
      borderColor={bd}
      rounded="2xl"
      spacing={1}
      w="100%"
    >
      <Heading size={{ base: "md", md: "lg" }}>{value}</Heading>
      <Text color="gray.600" _dark={{ color: "gray.300" }} fontSize={{ base: "sm", md: "md" }}>
        {label}
      </Text>
      {hint ? <Text fontSize="sm" color="gray.500">{hint}</Text> : null}
    </VStack>
  );
};

const TrustItem = ({ icon, title, desc }) => {
  const bg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  return (
    <HStack
      align="start"
      p={{ base: 4, md: 5 }}
      bg={bg}
      border="1px solid"
      borderColor={bd}
      rounded="2xl"
      spacing={3}
    >
      <Box color={useColorModeValue("green.600", "green.300")}>{icon}</Box>
      <VStack spacing={1} align="start">
        <Heading size="sm">{title}</Heading>
        <Text color="gray.600" _dark={{ color: "gray.300" }} fontSize={{ base: "sm", md: "md" }}>
          {desc}
        </Text>
      </VStack>
    </HStack>
  );
};

export default function AboutCompanyPageEN() {
  const sub = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  const grad = useColorModeValue(
    "linear-gradient(135deg, #F0FFF4 0%, #EFF6FF 100%)",
    "linear-gradient(135deg, rgba(26,32,44,.85) 0%, rgba(45,55,72,.85) 100%)"
  );

  const imgss = [img1, img2, img3, img4];

  return (
    <Box dir="ltr">
      {/* HERO */}
      <Box bg={grad} pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 12 }}>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
            <GridItem>
              <HStack spacing={3} mb={3} wrap="wrap">
                <Badge colorScheme="green" rounded="full" px={3} py={1}>American Softwares</Badge>
                <Badge colorScheme="blue" rounded="full" px={3} py={1}>Enterprise Solutions</Badge>
              </HStack>
              <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }} lineHeight={1.25} fontWeight="extrabold">
                Your trusted technology partner to build software that drives growth
              </Heading>
              <Text mt={3} fontSize={{ base: "sm", md: "md", lg: "lg" }} color={sub}>
                We deliver tailored software consulting and development, API integrations, dashboards,
                and enterprise systems—built with security, scalability, and user experience in mind,
                through a clear process and transparent agreements.
              </Text>

              <SimpleGrid columns={{ base: 3 }} spacing={3} mt={{ base: 5, md: 6 }}>
                <StatCard value="10+" label="Years of Experience" />
                <StatCard value="180+" label="Delivered Projects" hint="Apps, Websites, Dashboards" />
                <StatCard value="98%" label="Client Satisfaction" />
              </SimpleGrid>

              <HStack mt={{ base: 5, md: 6 }} spacing={3} wrap="wrap">
                <Button colorScheme="green" size={{ base: "md", md: "lg" }} as="a" href="/contact">Start Now</Button>
                <Button variant="outline" size={{ base: "md", md: "lg" }} as="a" href="/portfolio">See Our Work</Button>
              </HStack>
            </GridItem>

            <GridItem>
              <Box bg={cardBg} border="1px solid" borderColor={bd} rounded="3xl" p={{ base: 4, md: 6 }} boxShadow="lg">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                  alt="Our Team"
                  rounded="2xl"
                  objectFit="cover"
                  w="100%"
                  h={{ base: "220px", md: "320px" }}
                />
                <HStack spacing={3} mt={3} color="gray.500">
                  <Icon as={RiShieldCheckLine} />
                  <Icon as={RiTeamLine} />
                  <Icon as={RiTimeLine} />
                </HStack>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ABOUT */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }}>
            <Box>
              <Heading size={{ base: "md", md: "lg" }} mb={3}>Who We Are</Heading>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                American Softwares builds digital products and enterprise systems tailored to each client:
                from business analysis, UI/UX design, and frontend/backend development, to integrating with
                existing systems and stable launch with post-release support.
              </Text>
              <List spacing={2} mt={3} color={sub} fontSize={{ base: "sm", md: "md" }}>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Agile sprints with transparent progress reports.</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Clear contracts, realistic timelines, and delivery warranty.</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Security by design and privacy from day one.</ListItem>
              </List>
            </Box>
            <Box>
              <Heading size={{ base: "md", md: "lg" }} mb={3}>Why Clients Trust Us</Heading>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <TrustItem icon={<Icon as={RiMedalLine} boxSize={6} />} title="Quality Standards" desc="Code reviews, CI/CD, and staging environments for stable releases." />
                <TrustItem icon={<Icon as={MdOutlineSecurity} boxSize={6} />} title="Security Commitment" desc="Access control, sensitive data encryption, and audit logs." />
                <TrustItem icon={<Icon as={FaRegFileAlt} boxSize={6} />} title="Thorough Documentation" desc="API docs, user guides, and handover manuals." />
                <TrustItem icon={<Icon as={FaHandshake} boxSize={6} />} title="Clear Agreements" desc="SLA, NDA, and privacy policies to protect your interests." />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Container>
      </Section>

      {/* SERVICES SNAPSHOT */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>What We Offer</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <StatCard value="Tech Consulting" label="Discovery, Roadmap, Technical Feasibility" />
            <StatCard value="Custom Development" label="Web, Mobile, Dashboards" hint="React, Node/Nest, .NET" />
            <StatCard value="Enterprise Integrations" label="APIs, ERP, Payment, Auth" hint="REST/GraphQL, SSO" />
          </SimpleGrid>
        </Container>
      </Section>

      {/* SOCIAL PROOF */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={3}>Selected Clients</Heading>
          <Text color={sub} mb={{ base: 4, md: 6 }} fontSize={{ base: "sm", md: "md" }}>
            Sample logos—replace with your actual partners.
          </Text>

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={{ base: 3, md: 4 }}>
            {imgss.map((src, index) => (
              <Box
                key={index}
                p={{ base: 3, md: 4 }}
                bg={cardBg}
                border="1px solid"
                borderColor={bd}
                rounded="xl"
                textAlign="center"
              >
                <Image
                  src={src}
                  alt={`Client ${index + 1}`}
                  mx="auto"
                  w="100%"
                  maxH={{ base: "50px", md: "70px", lg: "80px" }}
                  objectFit="contain"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>Testimonials</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {[
              {name:"Ahmed",role:"CTO",text:"Delivery on time with excellent quality. The dashboard made a real impact."},
              {name:"Mai",role:"Product Manager",text:"Very responsive and flexible with changes. Great experience overall."},
              {name:"Khaled",role:"Founder",text:"Integrations were seamless and the documentation helped our team a lot."},
            ].map((t,idx)=>(
              <VStack key={idx} align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
                <Icon as={FaQuoteLeft} color="gray.400" />
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{t.text}</Text>
                <HStack pt={2}>
                  <Avatar name={t.name} />
                  <VStack spacing={0} align="start">
                    <Text fontWeight="semibold">{t.name}</Text>
                    <Text fontSize="sm" color="gray.500">{t.role}</Text>
                  </VStack>
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* TEAM */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>Leadership Team</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {[
              {n:"Product Lead",d:"Owns vision, MVP, and roadmap."},
              {n:"Tech Lead",d:"Ensures scalable architecture and code reviews."},
              {n:"Delivery Manager",d:"Drives sprints, timelines, and communication."},
            ].map((m, i)=>(
              <VStack key={i} p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" align="start">
                <Avatar name={m.n} size="lg" />
                <Heading size="md">{m.n}</Heading>
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{m.d}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* COMPLIANCE / POLICIES */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>Trust & Compliance</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <VStack align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
              <HStack><Icon as={MdOutlineSecurity} /><Heading size="md">Security First</Heading></HStack>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                Role-based access control, encryption of sensitive fields, permission audits, and optional pentests.
              </Text>
              <List spacing={2} color={sub} fontSize={{ base: "sm", md: "md" }}>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Principle of Least Privilege (PoLP)</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Dependency updates & CVE tracking</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />Backups & disaster recovery</ListItem>
              </List>
            </VStack>
            <VStack align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
              <HStack><Icon as={FaRegFileAlt} /><Heading size="md">Clear Policies</Heading></HStack>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                NDA, privacy policy, data protection clauses, and SLA with defined response times.
              </Text>
              <HStack spacing={3} pt={2}>
                <Badge colorScheme="purple">NDA</Badge>
                <Badge colorScheme="blue">Privacy</Badge>
                <Badge colorScheme="green">SLA</Badge>
              </HStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>How We Work</Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            {[
              {t:"01 • Discovery",d:"Understand goals, metrics, and success criteria."},
              {t:"02 • Plan",d:"Roadmap, timeline, and clear delivery scope."},
              {t:"03 • Build",d:"Short sprints, regular reviews, and staged releases."},
              {t:"04 • Launch & Support",d:"Documented delivery with ongoing improvements."},
            ].map((s,i)=>(
              <VStack key={i} align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl">
                <Heading size="md">{s.t}</Heading>
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{s.d}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* COVERAGE */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={2}>Where We Operate</Heading>
          <Text color={sub} mb={{ base: 4, md: 6 }} fontSize={{ base: "sm", md: "md" }}>
            Distributed teams supporting on-site or remote collaboration as needed.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="Cairo & Giza" desc="On-site meetings and fast enterprise support." />
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="New Cairo & 6th of October" desc="Flexible collaboration and scheduled visits." />
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="International Projects" desc="End-to-end remote delivery with regular reporting." />
          </SimpleGrid>
        </Container>
      </Section>

      <Divider />

      {/* FAQ */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>FAQ</Heading>
          <Accordion allowMultiple>
            {[
              {q:"Do you sign SLA and NDA?", a:"Yes. We provide SLA with response times and escalation, and NDA to protect confidentiality."},
              {q:"Do you provide invoices and post-delivery warranty?", a:"We issue official invoices and a bug-fix warranty for a defined period, plus monthly support options."},
              {q:"How do we track progress?", a:"Sprint reports, task boards, and a demo at the end of each sprint for full transparency."},
              {q:"Do you help with hosting and security?", a:"Yes. We help choose cloud setup, monitoring/backup, and security policies."},
            ].map((it,i)=>(
              <AccordionItem key={i} border="1px solid" borderColor={bd} rounded="xl" mb={3}>
                <h3>
                  <AccordionButton _expanded={{ bg: useColorModeValue("gray.50","gray.700") }} rounded="xl">
                    <Box as="span" flex="1" textAlign="left" fontWeight="semibold">{it.q}</Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4} color={sub} fontSize={{ base: "sm", md: "md" }}>{it.a}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* CTA */}
      <Section py={{ base: 10, md: 14, lg: 16 }}>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} alignItems="center">
            <GridItem colSpan={{ base: 12, md: 8 }}>
              <Heading size={{ base: "lg", md: "xl" }}>Ready to start?</Heading>
              <Text mt={2} color={sub} fontSize={{ base: "sm", md: "md" }}>
                Tell us your goal, budget, and timeline—we’ll prepare a clear roadmap and execution options.
              </Text>
              <HStack mt={5} spacing={3} wrap="wrap">
                <Button colorScheme="green" rightIcon={<Icon as={RiBuilding2Line} />}>Book an Intro Call</Button>
                <Button variant="outline" rightIcon={<Icon as={FaMoneyCheckAlt} />}>Request a Quote</Button>
              </HStack>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 4 }}>
              <VStack p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3} align="stretch">
                <HStack><Icon as={MdPhone} /><Text fontWeight="semibold">Phone / WhatsApp</Text></HStack>
                <chakra.a href="tel:01080002209" color="green.500" fontWeight="bold">01080002209</chakra.a>
                <HStack><Icon as={MdEmail} /><Text fontWeight="semibold">Email</Text></HStack>
                <chakra.a href="mailto:info@american-softwares.com" color="blue.500" fontWeight="bold">info@american-softwares.com</chakra.a>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Section>
    </Box>
  );
}
