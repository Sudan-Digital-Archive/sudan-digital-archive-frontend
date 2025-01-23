import {
  Box,
  SlideFade,
  VStack,
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function CodeOfConduct() {
  const { t, i18n } = useTranslation();
  const { hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      targetElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [key, hash]);
  const values = [
    {
      title: "Humanity",
      description:
        "We center the human experience and prioritize empathy and compassion in all our work, recognizing the dignity and worth of every individual.",
    },
    {
      title: "Justice",
      description:
        "We advocate for truth, accountability, and reparations for victims of human rights abuses, while being mindful of potential harm in our documentation processes.",
    },
    {
      title: "Preservation",
      description:
        "We are committed to safeguarding Sudanese digital memory and ensuring its accessibility to future generations through ethical archival practices.",
    },
    {
      title: "Community",
      description:
        "We foster a strong and inclusive community of Sudanese people and allies, welcoming diverse perspectives and experiences.",
    },
    {
      title: "Innovation",
      description:
        "We embrace technology thoughtfully to advance the archive's goals and reach a wider audience, while maintaining ethical standards.",
    },
    {
      title: "Integrity",
      description:
        "We adhere to strict ethical standards and ensure the accuracy and reliability of the archive's content through rigorous verification processes.",
    },
    {
      title: "Do No Harm",
      description:
        "We prioritize the safety and wellbeing of individuals in our archives. We will not release or share content that could cause harm to those documented in our materials.",
    },
    {
      title: "Being open",
      description:
        "We actively encourage collaboration across all aspects of our work, from developing archival catalogues to improving software and fundraising.",
    },
    {
      title: "Focusing on community benefit",
      description:
        "We center the human experience and prioritize empathy and compassion in all our work, recognizing the dignity and worth of every individual.",
    },
    {
      title: "Acknowledging contributions",
      description:
        "We explicitly recognize and value the time, effort, and expertise that community members contribute to the archive.",
    },
    {
      title: "Embracing diverse perspectives",
      description:
        "We actively seek out and respect different viewpoints and experiences, recognizing that our diversity strengthens our work.",
    },
    {
      title: "Practicing empathy",
      description:
        "We communicate thoughtfully and considerately, both online and in person, especially when addressing differences of opinion.",
    },
    {
      title: "Maintaining respectful dialogue",
      description:
        "We honor others' positions, skills, commitments, and contributions through respectful interaction.",
    },
    {
      title: "Learning from feedback",
      description:
        "We welcome and thoughtfully consider constructive criticism, viewing it as an opportunity for growth.",
    },
    {
      title: "Creating inclusive spaces",
      description:
        "We use language and practices that welcome all participants, ensuring everyone can contribute meaningfully to our work.",
    },
    {
      title: "Upholding collective governance",
      description:
        "We work through consensus rather than hierarchy, making decisions collectively and staying true to our shared mandates.",
    },
  ];
  const unacceptable_behavior_examples = [
    "Harassment of any participants in any form.",
    "Deliberate intimidation, stalking, or following.",
    "Logging or taking screenshots of online activity for harassment purposes.",
    "Publishing others' private information, such as a physical or electronic address, without explicit permission.",
    "Violent threats or language directed against another person.",
    "Incitement of violence or harassment towards any individual, including encouraging a person to commit suicide or to engage in self-harm.",
    "Creating additional online accounts in order to harass another person or circumvent a ban.",
    "Sexual language and imagery in online communities or in any conference venue, including talks.",
    "Insults, put-downs, or jokes that are based upon stereotypes, that are exclusionary, or that hold others up for ridicule.",
    "Excessive swearing.",
    "Unwelcome sexual attention or advances.",
    "Unwelcome physical contact, including simulated physical contact (eg, textual descriptions like 'hug' or 'backrub') without consent or after a request to stop.",
    "Pattern of inappropriate social contact, such as requesting/assuming inappropriate levels of intimacy with others.",
    "Sustained disruption of online community discussions, in-person presentations, or other in-person events.",
    "Continued one-on-one communication after requests to cease.",
    "Other conduct that is inappropriate for a professional audience including people of many different backgrounds.",
  ];
  const boundaries_steps = [
    "Request that the person stop the behavior that goes against the code of conduct. Request the person goes through the accountability process.",
    "If the behavior continues, temporarily ban the individual from organizational activity and repeat the request for them to work through our accountability process.",
    "After a specified period, allow the individual to return, contingent upon completion of the accountability process and their commitment to upholding the code of conduct.",
    "If the individual repeats the behavior upon return, implement a ban from the organization.",
    "If at any point the banned individual demonstrates genuine remorse, acknowledges their harmful actions and their impact on the organization, and provides convincing evidence of personal growth and change, the community may collectively decide to revoke the ban and allow them to rejoin.",
  ];
  const accountability_processes = [
    {
      step: "Acknowledge Harm",
      description:
        "Recognize that your actions, regardless of intent, caused harm to another person or relationship. This acknowledgment will be discussed in a mediated session with the affected parties.",
    },
    {
      step: "Recognize Agency",
      description:
        "Accept that your decisions, whether intentional or not, led to the harm. Through guided dialogue with mediators, explore how different choices could have led to different outcomes.",
    },
    {
      step: "Understand Impact",
      description:
        "Work with mediators to gain a clear understanding of how your actions affected others. This involves facilitated communication between parties, either direct or indirect based on the comfort and safety of those involved.",
    },
    {
      step: "Take Reparative Action",
      description:
        "With guidance from mediators, develop and implement concrete steps to repair the harm caused. This demonstrates accountability through action. For example, if you upset someone by being overly critical of their work, you could not only apologize but also publicly praise some other work they've done. Another example could be offering to assist them with a project or task to make up for any setbacks your actions may have caused. The specific actions will be agreed upon by all parties through the mediation process.",
    },
    {
      step: "Identify and Address Patterns",
      description:
        "Through structured reflection sessions with mediators, examine the circumstances that led to the harmful decision. Develop specific strategies and commitments to change your behavior and reduce the likelihood of similar situations in the future.",
    },
  ];
  return (
    <>
      <Menu />
      <SlideFade in>
        <Box
          as="section"
          display="flex"
          alignItems="center"
          maxW="2xl"
          mx="auto"
          px={4}
        >
          <Box>
            <VStack spacing={2} align="left">
              <Heading
                textAlign="center"
                py={2}
                bgGradient="linear(to-r, cyan.300, pink.600)"
                bgClip="text"
              >
                Code of Conduct
              </Heading>
              <Box pb={5}>
                <Heading size="md" py={2} id="toc">
                  Table of Contents{" "}
                </Heading>
                <OrderedList>
                  <ListItem>
                    <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                      <Link href="#our-values">Our Values</Link>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                      <Link href="#standards-and-inappropriate-behavior">
                        Standards and Inappropriate Behavior
                      </Link>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                      <Link href="#boundaries">Boundaries</Link>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                      <Link href="#accountability-processes">
                        Accountability Processes
                      </Link>
                    </Text>
                  </ListItem>
                </OrderedList>
              </Box>
              <Heading size="md" id="our-values">
                Our Values
              </Heading>
              <UnorderedList>
                {values.map((item, index) => {
                  return (
                    <ListItem
                      fontSize={i18n.language === "en" ? "lg" : "2xl"}
                      key={`our-values-${index}`}
                    >
                      <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                        <Box
                          fontSize={i18n.language === "en" ? "lg" : "2xl"}
                          as="u"
                        >
                          {item.title}
                        </Box>
                        . {item.description}
                      </Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
              <Heading size="sm" mb={2}>
                <Link href="#toc">Back to Top</Link>
              </Heading>
              <Heading size="md" id="standards-and-inappropriate-behavior">
                Standards and Inappropriate Behavior
              </Heading>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                Every member of our community has the right to have their
                identity respected. The Sudan Digital Archive collective is
                dedicated to providing a positive experience for everyone,
                regardless of age, gender identity and expression, sexual
                orientation, disability, physical appearance, body size,
                ethnicity, nationality, race, or religion (or lack thereof),
                education, or socio-economic status.
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                Examples of unacceptable behavior by community members include:
              </Text>
              <UnorderedList>
                {unacceptable_behavior_examples.map((item, index) => {
                  return (
                    <ListItem
                      fontSize={i18n.language === "en" ? "lg" : "2xl"}
                      key={`unacceptable-behaviors-example-${index}`}
                    >
                      <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                        {item}
                      </Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                Community members asked to stop any inappropriate behavior are
                expected to comply immediately.
              </Text>
              <Heading size="sm" mb={2}>
                <Link href="#toc">Back to Top</Link>
              </Heading>
              <Heading id="boundaries" size="md">
                Boundaries
              </Heading>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                If a participant engages in behavior that violates this code of
                conduct, the community organizers will take the following steps:
              </Text>
              <OrderedList>
                {boundaries_steps.map((item, index) => {
                  return (
                    <ListItem
                      fontSize={i18n.language === "en" ? "lg" : "2xl"}
                      key={`boundaries-steps-${index}`}
                    >
                      <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                        {item}
                      </Text>
                    </ListItem>
                  );
                })}
              </OrderedList>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                Throughout this process, we will prioritize the safety and
                well-being of the community while also embodying our commitment
                to rehabilitation and transformative justice. Our goal is to
                create opportunities for positive change, recognizing that
                people can evolve and improve their behavior with proper
                support. While bans are considered final, we remain hopeful of
                redemption if presented with compelling evidence of sincere
                transformation.
              </Text>
              <Heading size="sm" mb={2}>
                <Link href="#toc">Back to Top</Link>
              </Heading>
              <Heading id="accountability-processes" size="md">
                Accountability Process
              </Heading>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                Our accountability process consists of five key steps,
                facilitated through mediation by designated collective members:
              </Text>
              <OrderedList>
                {accountability_processes.map((item, index) => {
                  return (
                    <ListItem
                      fontSize={i18n.language === "en" ? "lg" : "2xl"}
                      key={`our-values-${index}`}
                    >
                      <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                        <Box
                          fontSize={i18n.language === "en" ? "lg" : "2xl"}
                          as="u"
                        >
                          {item.step}
                        </Box>
                        . {item.description}
                      </Text>
                    </ListItem>
                  );
                })}
              </OrderedList>
              <Heading size="sm" mb={2}>
                <Link href="#toc">Back to Top</Link>
              </Heading>
            </VStack>
          </Box>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
