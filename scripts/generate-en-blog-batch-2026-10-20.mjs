import fs from "node:fs";
import path from "node:path";

const posts = [
  {
    slug: "iot-system-architecture-sensor-gateway-cloud-dashboard",
    title: "IoT System Architecture for FYP: Sensor, Gateway, Cloud and Dashboard",
    excerpt: "A practical guide to designing a clear IoT architecture from sensor to dashboard, including data flow, offline behaviour, security boundaries and testing.",
    category: "IoT",
    summary: `An IoT system architecture explains how measurements travel from the physical world to the person who uses them. For a final year project, the architecture should separate sensing, edge processing, communications, storage and the user application. Every arrow in the diagram should describe something real: the data format, protocol, direction and behaviour when a connection fails.

A strong FYP does not require every available technology. One ESP32, one meaningful sensor, one communications path and one dashboard can be enough when the student can prove acquisition, transmission, storage and recovery. Architecture must follow project requirements rather than a shopping list of popular modules.`,
    sections: [
      ["Separate the system into layers", `The sensing layer acquires a physical quantity and should define its unit, range and sampling interval. The edge layer validates readings, applies limited processing or makes local decisions. The communications layer carries messages through WiFi, Ethernet, LoRaWAN or cellular service. The application layer stores, presents and acts on the information. Keeping these layers separate makes design changes easier to explain and test.

If MQTT is selected, document topics, payloads, retained messages and the required Quality of Service. MQTT delivery options do not replace application controls such as timestamps, duplicate detection and stale-data handling. With HTTP, specify endpoints, methods, authentication and error responses.`],
      ["Define the data contract early", `Agree on the payload before building the entire dashboard. Useful fields include device_id, measurement_id, timestamp, value, unit, sensor status and schema version. A number without its unit or source is weak evidence. Decide whether time is assigned by the device, gateway or server, and distinguish measured_at from received_at when network delay matters.

Choose each dashboard element to answer a user question. Trend charts show change over time, status cards show current conditions and event tables support auditing. Ten decorative charts do not improve an engineering project if none supports an objective.`],
      ["Design for an Internet outage", `A credible IoT project defines a degraded mode. A controller may continue safe local control, buffer a limited number of readings and upload them after reconnection. State the buffer limit and what happens when it fills. Do not call a result real-time when records arrive minutes later after a network recovery.

Test cold start, loss of WiFi, an unavailable server, a disconnected sensor and power restoration. Record reconnection time, lost records and the final actuator state. This evidence is stronger than a demo that only works under ideal conditions.`],
      ["Create diagrams that support the report", `Use a context diagram for users and external systems, a block diagram for hardware, a deployment diagram for device-to-cloud placement and a sequence diagram for the main workflow. Keep names consistent across diagrams, firmware, database fields and the report. Inconsistent names make traceability difficult.

Mark trust boundaries such as the public Internet and third-party services. This gives a clear reason for authentication, encryption, input validation and access control instead of adding security terminology without a design.`],
    ],
    validation: ["Compare the serial reading, network payload and stored record for the same timestamp.", "Disconnect the network and measure recovery time and data loss.", "Send a malformed payload and confirm it is rejected or flagged.", "Repeat the workflow after a full power cycle and preserve the logs."],
    mistakes: ["Drawing the cloud as one unexplained box.", "Making essential local control depend entirely on a dashboard.", "Omitting units, timestamps or device identity.", "Assuming a transmitted message was stored correctly."],
    faq: [["Does every IoT project need a public cloud?", "No. A local network system can still be an IoT project when connected devices exchange data and provide a networked service. Use cloud infrastructure only when remote access, managed storage or analysis is required."], ["Is MQTT better than HTTP?", "Neither is universally better. MQTT fits publish-subscribe telemetry, while HTTP is straightforward for request-response web integration. Decide from requirements, network conditions, security and testability."]],
    refs: [["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"], ["NIST IoT Device Cybersecurity Baseline", "https://www.nist.gov/publications/iot-device-cybersecurity-capability-core-baseline"]],
    links: [["Browse IoT project titles", "/catalog?category=iot-embedded"], ["Explore the ESP32 component", "/components/esp32"], ["Use the ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Discuss an FYP scope", "/contact"]],
  },
  {
    slug: "iot-power-management-current-regulator-brownout",
    title: "IoT Power Management: Current Budget, Regulators and Brownout Testing",
    excerpt: "Build a realistic IoT power budget, select regulators, measure peak-load voltage and diagnose ESP32 brownouts without guessing.",
    category: "Electronics",
    summary: `Power problems commonly appear as random resets, corrupt sensor readings or lost communications. The voltage printed on an adapter does not prove that the voltage reaching the controller remains stable. A student must consider input voltage, current capability, regulator limits, cable loss, connectors, ground return and the peak current of every load.

A current budget is the starting estimate, not final proof. Measure voltage at the board while WiFi transmits, relays switch, motors start or a cellular modem connects. A brownout occurs when the supply falls below the circuit's operating requirement long enough to disrupt operation.`,
    sections: [
      ["Build a realistic power budget", `List each load with operating voltage, typical current, peak current and duty cycle. Use a datasheet or measurement rather than a marketplace description. Add reasonable margin for component variation and simultaneous events. Current values on different voltage rails cannot simply be added when a converter sits between them; power and conversion efficiency must be considered.

A relay coil may operate briefly but still loads the rail at a critical moment. Motors and modems can have starting or transmit peaks far above idle current. Size the supply around the heaviest credible combination, not the quiet bench condition.`],
      ["Select the regulator and power path", `Check input range, output voltage, continuous current, transient response, thermal performance and efficiency. A linear regulator is simple, but the voltage difference multiplied by current becomes heat. A buck converter is often more suitable when dropping 12 V to 5 V at higher current, although module quality, ripple and layout still matter.

Keep motor and relay current away from sensitive logic paths. Use a suitable transistor or driver, flyback protection for DC coils and a deliberate return-current route. Never power a motor from an ESP32 3.3 V pin.`],
      ["Use capacitors for the correct problem", `A bulk capacitor near the power entrance can support lower-frequency load changes, while a small decoupling capacitor close to an IC supply pin provides local transient current. Values and placement must follow the device documentation. Capacitors cannot repair an undersized adapter, overheating regulator, poor connector or thin cable.

Espressif's ESP32 hardware guidance includes supply-current and capacitor recommendations for chip-level designs. Development boards already contain some of this circuitry, but external loads still need a correct supply path.`],
      ["Diagnose a brownout systematically", `Start with the serial reset log and note exactly when the restart occurs. Measure voltage at the controller input rather than only at the adapter. Test one load at a time, then reproduce the worst credible combination. Check USB cable quality, breadboard contacts, connector resistance and ground routing.

For the report, record minimum observed voltage, load state, reset count and the result after each controlled change. Do not claim that one capacitor fixed the design unless the same test before and after supports that conclusion.`],
    ],
    validation: ["Measure idle and peak-load voltage at the board input.", "Exercise WiFi, relays and motors in a defined worst-case sequence.", "Repeat at least ten cold starts and record every reset.", "Monitor regulator temperature and stop if components exceed safe limits."],
    mistakes: ["Adding average currents while ignoring peaks.", "Treating the adapter label as a board-level measurement.", "Powering motors through the logic rail.", "Adding capacitors before checking voltage drop and heat."],
    faq: [["How much current does an ESP32 project need?", "There is no single value for every build. Budget the ESP32, radio activity, sensors, indicators, relays and other loads, then measure the actual peak condition using the documentation for the exact board."], ["Will a higher-current adapter damage the circuit?", "A correctly designed load draws the current it needs when voltage and polarity are correct. The adapter, regulator, connector and protection must still be appropriate; a high current rating never makes the wrong voltage safe."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"], ["Texas Instruments Power Supply Bypassing", "https://www.ti.com/lit/an/scea042/scea042.pdf"]],
    links: [["ESP32 power supply guide", "/blog/esp32-power-supply-for-sensors-relays-fyp"], ["ESP32 component guide", "/components/esp32"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Discuss an electronics project", "/contact"]],
  },
  {
    slug: "iot-sensor-data-quality-timestamp-units-validation",
    title: "IoT Sensor Data Quality: Timestamps, Units, Missing Values and Validation",
    excerpt: "Produce trustworthy IoT sensor data for analysis and FYP reporting by defining timestamps, units, missing records, duplicates, outliers and validation rules.",
    category: "IoT",
    summary: `A polished dashboard does not make sensor data trustworthy. An IoT dataset needs a clear meaning, comparable time, consistent units, source identity and quality status. Without those elements, students cannot determine whether a graph changed because of the environment, the sensor, the network or a software mistake.

Design the dataset before collection begins. Define a data dictionary, sample interval, validation rules, missing-record strategy and raw-data retention policy. Never silently remove records merely to make results look cleaner.`,
    sections: [
      ["Create a data dictionary", `For every field, record the name, type, unit, plausible range, source and whether it is required. temperature_c is clearer than value1. Keep measurements separate from setpoints and actuator states. Include device_id and firmware_version when several devices or revisions contribute data.

A validation range is not always a physical absolute limit; it may be a justified operating range for the experiment. Mark readings outside it as invalid or suspicious, but preserve the original value and reason instead of deleting the evidence.`],
      ["Handle timestamps and time zones", `Use an unambiguous format with UTC or an explicit offset. RFC 3339 defines an Internet timestamp profile based on ISO 8601. A value ending in Z represents UTC, while +08:00 records the Malaysian offset. Convert for display after storage rather than stripping the offset.

State where time originates. A device clock can drift or reset without synchronization. A server timestamp records arrival, not necessarily measurement time. Store measured_at and received_at separately when delay or offline buffering matters.`],
      ["Treat gaps, duplicates and outliers honestly", `Use a sequence number or expected interval to detect gaps. Never replace every missing reading with zero because zero may be a valid measurement. Represent absence explicitly and document any imputation. Retries can create duplicates, so a measurement identifier helps the database reject repeated messages.

Investigate outliers through wiring, supply, sensor limits, environmental events and communication logs. A median filter can suppress spikes, but it can also erase a real short event. Preserve raw and processed series separately.`],
      ["Validate the full data path", `Match a device reading in the serial log to the transmitted payload and stored database record using the same identifier or timestamp. This catches unit conversion and parsing errors. Compare against an appropriate reference when accuracy matters; a second identical low-cost sensor does not automatically establish true accuracy.

Report resolution, observed repeatability, packet-loss rate and exclusion rules. Avoid the word accurate unless the method, reference and uncertainty support it.`],
    ],
    validation: ["Inspect at least 100 sequential records for gaps and duplicates.", "Match serial, payload and database values for the same measurement.", "Inject invalid values to test validation and logging.", "Export raw data so the analysis can be reproduced."],
    mistakes: ["Storing numbers without units or device identity.", "Using local time without an offset.", "Replacing missing data with zero.", "Removing outliers without a record or justification."],
    faq: [["Should an FYP store raw or filtered data?", "Keep raw data when storage and privacy permit, then record the processing method and version. This allows an examiner to audit the result and lets the student repeat the analysis."], ["How often should a sensor be sampled?", "Sampling depends on the phenomenon, sensor response time, energy, network load and project objective. Faster is not better when the sensor has not settled or the records only repeat noise."]],
    refs: [["RFC 3339 Internet Timestamps", "https://www.rfc-editor.org/info/rfc3339/"], ["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]],
    links: [["IoT project ideas", "/blog/iot-project-ideas-2025"], ["Project catalog", "/catalog"], ["Component database", "/components"], ["Discuss a validation plan", "/contact"]],
  },
  {
    slug: "student-iot-security-api-keys-authentication-firebase-rules",
    title: "Student IoT Security: API Keys, Authentication and Firebase Rules",
    excerpt: "A practical security guide for student IoT projects covering secrets, identity, authorization, Firebase Rules, threat modelling and honest validation.",
    category: "IoT",
    summary: `IoT security is more than adding a login screen. A system should identify devices and users, restrict actions by role, protect data, control configuration and record important security events. For a final year project, a small tested security scope is stronger than calling the whole prototype secure without a threat model.

Begin with assets and risks: personal data, actuator commands, GPS locations, WiFi credentials, service tokens and administrator keys. Decide who may read, write or change each asset. NIST IR 8259A provides a useful baseline around device identity, configuration, data protection, interface access, software updates and cybersecurity-state awareness.`,
    sections: [
      ["Distinguish identifiers from secrets", `Not every API key has the same security meaning. Some Firebase keys identify a project and are designed to appear in client configuration, while actual data access must be enforced by Authentication, Security Rules and API restrictions. Service-account private keys, passwords, refresh tokens and server credentials are secrets and must not be committed to a public repository or embedded in exposed client code.

Use environment configuration for development and server-side secret storage for deployment. If a secret ever enters Git history, deleting the current file is not enough; rotate the credential.`],
      ["Authentication is not authorization", `Authentication establishes who made a request. Authorization decides what that identity may do. A signed-in user should not automatically read or modify every record. Structure data so ownership or role can be checked, and avoid sharing one device credential across every prototype.

Firebase documents the use of Authentication with Security Rules through request.auth and uid. Test both permitted and denied requests with an emulator or rules tests. Never leave a public demonstration database in test mode.`],
      ["Build an FYP-sized threat model", `Draw the data flow and mark trust boundaries across device, WiFi, Internet, cloud, application and administrator interface. Consider leaked credentials, cross-user data access, replayed commands, malformed payloads and lost devices. For each threat, identify a control and remaining risk.

Do not promise absolute security. State exactly what was tested, such as anonymous writes being rejected and user A being unable to read user B's private records.`],
      ["Plan logs and updates", `Log useful events such as failed sign-ins, role changes, actuator commands and configuration changes. Never log full passwords or tokens. Include a timestamp and acting identity, then choose a retention period that fits the project's privacy needs.

If over-the-air updates are supported, examine image verification and rollback provided by the platform. If they are not supported, document the physical update process and limitation. Software maintenance is part of the lifecycle, not a decorative feature.`],
    ],
    validation: ["Confirm unauthenticated requests fail on private paths.", "Verify user A cannot alter user B's data.", "Scan the repository for secrets and rotate exposed test credentials.", "Record administrative events without passwords or complete tokens."],
    mistakes: ["Assuming a login page protects the database.", "Deploying Firebase test-mode rules publicly.", "Placing service-account keys in a client application.", "Claiming security without negative tests."],
    faq: [["Must a Firebase API key always be secret?", "Firebase explains that its client API keys identify the project and are not the sole access control. Restrict them to relevant APIs, keep service-account and server credentials secret, and enforce Security Rules."], ["Should students build their own encryption?", "No. Use maintained platform implementations of protocols such as TLS. Custom cryptography is difficult to validate and creates unnecessary risk in a student project."]],
    refs: [["NIST IR 8259A IoT Cybersecurity Baseline", "https://www.nist.gov/publications/iot-device-cybersecurity-capability-core-baseline"], ["Firebase Security Checklist", "https://firebase.google.com/support/guides/security-checklist"], ["Firebase Rules and Authentication", "https://firebase.google.com/docs/rules/rules-and-auth"]],
    links: [["Browse IoT project titles", "/catalog?category=iot-embedded"], ["Firebase FYP guide", "/blog/booking-system-fyp-laravel-nextjs-firebase"], ["IoT topic hub", "/topics/iot"], ["Contact Rectronx", "/contact"]],
  },
  {
    slug: "outdoor-iot-project-wifi-lora-4g",
    title: "Outdoor IoT Projects: Choosing WiFi, LoRa or 4G for Range and Power",
    excerpt: "Compare WiFi, LoRa or LoRaWAN and 4G for outdoor IoT projects using coverage, payload, energy, gateway, recurring cost and field-test evidence.",
    category: "IoT",
    summary: `An outdoor IoT network should not be selected from an advertised range figure. Coverage changes with antennas, frequency, obstacles, mounting height, interference, transmit settings and local regulation. WiFi, LoRa or LoRaWAN and 4G solve different connectivity problems.

Start with payload size, reporting interval, latency, power source, deployment area, gateway access and recurring cost. Perform a site survey or field test at the real location. A five-metre laboratory test does not prove suitability for a farm, river or urban street.`,
    sections: [
      ["When WiFi is appropriate", `WiFi is practical when an access point already exists, the range is moderate, payloads are larger or direct IP integration is useful. It can fit greenhouses, campus buildings and locations close to a managed router. Power consumption and site-dependent coverage are the main constraints.

Test reconnect behaviour, changed credentials and loss of Internet separately from loss of the local access point. Institutional WiFi may use captive portals or policies that an embedded controller cannot support.`],
      ["When LoRa or LoRaWAN is appropriate", `LoRa is a radio modulation technology; LoRaWAN is a network protocol involving end devices, gateways, a network server and application services. LoRaWAN is designed for low-power wide-area operation and small messages. It is not a video or high-throughput connection.

Do not call a point-to-point LoRa link LoRaWAN. Document frequency, spreading factor, bandwidth, transmit power, antennas and topology. Check Malaysia's applicable spectrum requirements before a real deployment.`],
      ["When cellular service is appropriate", `Cellular connectivity fits sites with operator coverage but no local infrastructure. A modem needs a SIM, data plan, suitable antenna and a supply that can tolerate current peaks. Signal on a smartphone does not guarantee identical performance inside the project's enclosure.

Firmware should handle timeouts, reconnects, backoff and data usage. Buffer measurements during outages. Confirm that the chosen network service and module remain supported rather than designing around an obsolete technology.`],
      ["Make the decision with evidence", `Create a weighted decision matrix covering coverage, daily energy, payload, latency, gateway needs, recurring cost, security and implementation difficulty. Scores should come from measurements or reliable documentation rather than preference.

In field tests, record successful delivery rate, end-to-end latency, energy and environmental conditions at several points. Radio metrics from different technologies are not always directly comparable, so focus on whether the application message reached its destination correctly.`],
    ],
    validation: ["Test at the real site across several distances and obstacles.", "Send at least 100 defined messages for each configuration.", "Measure energy during sleep, transmit and reconnect states.", "Test recovery after the router, gateway or cellular link disappears."],
    mistakes: ["Treating maximum advertised range as a project result.", "Confusing point-to-point LoRa with LoRaWAN.", "Ignoring modem peak current and antenna placement.", "Deploying without checking local spectrum requirements."],
    faq: [["Is LoRa always longer range than WiFi?", "LoRa is designed for a different link budget and data rate, but real range depends on configuration and the site. A field test is required; no fixed distance can be guaranteed."], ["Must an FYP build its own LoRaWAN gateway?", "No. A project can use an available gateway or deploy one, but the architecture must identify who operates the gateway and servers and what happens when they fail."]],
    refs: [["LoRa Alliance: LoRaWAN for Developers", "https://lora-alliance.org/lorawan-for-developers/"], ["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]],
    links: [["LoRa sensor-node guide", "/blog/cara-bina-node-sensor-ladang-lora"], ["IoT project catalog", "/catalog?category=iot-embedded"], ["Component database", "/components"], ["Discuss technology selection", "/contact"]],
  },
  {
    slug: "measurable-electronics-fyp-objectives",
    title: "How to Write Measurable Objectives for an Electronics Final Year Project",
    excerpt: "Turn broad electronics FYP ideas into specific, testable objectives that align with the problem statement, methodology, results and viva evidence.",
    category: "FYP Guidance",
    summary: `A final year project objective is not a list of activities such as buying components, writing code or completing a report. It describes an outcome that will be achieved and evaluated. In an electronics or IoT project, each objective should connect one requirement to a system output and a method of verification.

Good objectives control scope. If an objective cannot be matched to a test case, metric or piece of evidence, it is probably too broad. Use verbs such as design, develop, measure, compare and evaluate, then state the function or parameter that genuinely belongs to the project.`,
    sections: [
      ["Separate aim, objective and feature", `The aim is the overall purpose, such as developing a prototype for monitoring a storage room. Objectives divide that purpose into assessable outcomes. Features are system functions such as alerts or CSV export. A feature should become an objective only when it is important to the problem and will be tested.

Avoid phrases such as efficient smart system unless efficient and smart have operational definitions. Replace them with a specific outcome, such as recording temperature at a defined interval and issuing an alert when a tested threshold is exceeded.`],
      ["Use a testable objective structure", `A useful structure is verb + technical outcome + operating condition or scope + evaluation method. For example: design an ESP32 node that records temperature and humidity every 60 seconds for evaluation of data loss during a 24-hour test. Numerical targets must come from requirements or justification rather than being invented to sound scientific.

Do not promise a particular accuracy before selecting a reference and calibration procedure. When uncertainty remains, write an objective to evaluate error or repeatability under stated conditions.`],
      ["Trace objectives through the report", `Every objective should reappear in the methodology and results. Build a traceability table with columns for objective, module, test case, evidence and result location. If an objective mentions response time, Chapter 3 must explain how time is measured and Chapter 4 must show the data rather than only an application screenshot.

Three or four focused objectives are often easier to defend than a long feature list. Follow the institution's required format, but keep every objective meaningful.`],
      ["Improve weak objective statements", `A weak statement is "to use IoT in agriculture." A stronger version is "to develop an ESP32 prototype that records soil-moisture readings and pump status for two test zones." A claim such as reducing water waste is not defensible unless water use is measured against a baseline.

Use words such as detect, prevent and optimise only when the project defines the event, comparison and metric. Objectives are engineering commitments, not marketing headlines.`],
    ],
    validation: ["Map every objective to at least one test case.", "Check that words such as fast, accurate and efficient have metrics.", "Confirm the required data can be collected with available tools.", "Ask another reader to explain each objective without the feature list."],
    mistakes: ["Writing development activities as research objectives.", "Using smart without a defined function.", "Promising social impact that is not measured.", "Leaving an objective unanswered in the results chapter."],
    faq: [["How many objectives should an FYP have?", "There is no universal number. Three or four focused objectives are often manageable, but students should follow their institution's format and ensure every objective receives evidence."], ["Can an objective name a component?", "Yes when the technology is central to scope, but the outcome should remain the focus. Avoid locking a part too early when the requirement is not stable."]],
    refs: [["NIST Engineering Laboratory", "https://www.nist.gov/el"]],
    links: [["How to choose an FYP topic", "/blog/how-to-choose-fyp-topic"], ["Browse project titles", "/catalog"], ["Engineering topic hubs", "/topics"], ["Discuss FYP objectives", "/contact"]],
  },
  {
    slug: "electronics-fyp-test-plan-test-cases-acceptance-criteria",
    title: "Electronics FYP Test Plan: Test Cases, Acceptance Criteria and Evidence",
    excerpt: "Build a repeatable electronics FYP test plan with traceable test cases, acceptance criteria, raw data, recovery tests and viva-ready evidence.",
    category: "FYP Guidance",
    summary: `A test plan converts project claims into evidence. One successful demonstration does not establish reliability, while a screenshot without test conditions is difficult to audit. Students should define the item under test, input, procedure, expected result, acceptance criteria and evidence before running the experiment.

Start from objectives and requirements. Functional tests prove behaviour, performance tests measure timing or throughput, reliability tests repeat operations, and fault tests examine what happens when a sensor, supply or network fails. Every project needs a clear procedure even when it does not require a complex laboratory.`,
    sections: [
      ["Define a complete test case", `Give every case an identifier such as TC-POWER-01, the linked requirement, setup, preconditions, steps, input, expected result, acceptance criteria, actual result and status. Record firmware version, wiring revision and equipment because small changes can alter the outcome. A photograph or labelled diagram should show measurement points.

Expected result describes behaviour; acceptance criteria define the pass boundary. "The dashboard shows data" is vague. A measurable criterion states the record fields, allowed delay, trial count and required success rate, with justification.`],
      ["Test normal and failure conditions", `The happy path is only one part of validation. Disconnect a sensor, inject an out-of-range value, stop the router, reboot the controller and restore power. A physical output should move to a defined safe state when input is invalid. The dashboard should identify stale or offline data rather than presenting an old value as current.

Use safe low-voltage loads for relay and motor tests. Do not place mains voltage on a breadboard or work without competent supervision.`],
      ["Preserve auditable evidence", `Keep raw CSV data, serial logs, timestamped screenshots, setup photographs and short video for events that are difficult to describe. Name each file using its test-case ID and date. Preserve failures and corrective actions rather than collecting only successful screenshots.

Chapter 4 can summarise results while raw material remains in an appendix or controlled repository. Every graph needs labelled axes, units, sample count and conditions.`],
      ["Turn results into a defensible conclusion", `Separate a system failure from a procedure failure. If a sensor was not stabilised, repeat the test after the required warm-up. If the reference instrument is unsuitable, do not use the number as proof of accuracy. Report trial count and variation, not only an average that hides failures.

When criteria are not met, improve the design, revise the requirement with justification or report the limitation. Never quietly change the criterion after seeing the result.`],
    ],
    validation: ["Trace every objective to a test case and evidence file.", "Repeat tests instead of relying on one successful demo.", "Include at least one failure-and-recovery scenario.", "Confirm every graph states units, sample count and conditions."],
    mistakes: ["Writing the procedure after obtaining results.", "Using pass or fail without criteria.", "Keeping only the best screenshot.", "Changing several variables without controls."],
    faq: [["How many test repetitions are enough?", "It depends on variability and the claim. State the trial count and rationale. Discrete functions may use repeated trials, while accuracy claims need a more formal experimental design."], ["Is a demo video valid evidence?", "Video is useful for an operational sequence, but it does not replace structured data, test conditions and logs. Use it as supporting evidence."]],
    refs: [["NIST/SEMATECH Engineering Statistics Handbook", "https://itl.nist.gov/div898/handbook/index2.htm"]],
    links: [["Test an IoT FYP before viva", "/blog/test-iot-final-year-project-before-viva"], ["Project catalog", "/catalog"], ["FYP guidance topics", "/topics"], ["Discuss a test plan", "/contact"]],
  },
  {
    slug: "electronics-fyp-bill-of-materials-components-alternatives",
    title: "Electronics FYP Bill of Materials: Components, Alternatives and Supply Risk",
    excerpt: "Create an auditable electronics BOM with part identification, critical specifications, compatible alternatives, revision control and purchasing risk.",
    category: "FYP Guidance",
    summary: `A bill of materials, or BOM, is a controlled list of everything required to build a specific project revision. A list containing only sensor, relay and wire is not enough for purchasing or troubleshooting. The BOM should identify each part, quantity, rating, function, source and alternatives that are genuinely compatible.

A good BOM helps students track design changes, manage spending and reduce the risk of late components. Prices vary by supplier and date, so record each price as a dated snapshot rather than a guaranteed project cost.`,
    sections: [
      ["Include fields that support rebuilding", `Record a reference such as U1 or SENSOR1, description, manufacturer part number where available, quantity, critical specification, package or connector, voltage, supplier, date checked and approval status. For generic modules, preserve the listing, markings and photographs because the same product name may be sold with a different circuit later.

Separate required components, consumables, tools and optional upgrades. Enclosures, terminal blocks, cables and adapters are frequently forgotten even though they determine whether the final demo is reliable.`],
      ["Define critical specifications", `An alternative is valid only when it meets the electrical and software parameters that matter. Two temperature sensors can differ in interface, range, response time, voltage and library support. For regulators, compare input range, output, current, heat and pinout. For relays, compare coil voltage, contact rating and actual isolation arrangement.

Mark parameters that must match and parameters that may vary. This turns purchasing into a defendable engineering decision.`],
      ["Control revisions and substitutions", `Give the BOM a revision that matches the schematic and firmware. When a part changes, record the date, reason and effect on wiring or code. Do not overwrite the old list, because earlier test results may belong to a different hardware revision.

Create an as-built BOM when the prototype is complete. It records what is physically installed rather than what the proposal originally planned.`],
      ["Manage purchasing risk", `Identify long-lead parts and buy them early only after interfaces have been checked. Keep limited spares for inexpensive failure-prone items, but avoid buying a full set before proving the highest-risk module. Consider seller traceability and counterfeit risk for critical devices.

Maintain a simple risk register containing part, possible issue, impact, mitigation and approved alternative. Typical risks include unavailable stock, a changed connector, incompatible logic voltage and abandoned software support.`],
    ],
    validation: ["Check that every schematic block has a BOM item.", "Ensure identification is sufficient to purchase the same part again.", "Bench-test alternatives before marking them approved.", "Match the as-built BOM to the final prototype and wiring photographs."],
    mistakes: ["Using generic names without ratings or identifiers.", "Assuming replacement modules share a pinout.", "Presenting old prices as current commitments.", "Failing to record substitutions after testing."],
    faq: [["Should software be included in a BOM?", "A BOM normally focuses on hardware, but the report should keep a separate software and library inventory with versions. Both are required for reproducibility."], ["Is a marketplace link enough to identify a module?", "It helps, but listings can change. Preserve markings, specifications, photographs and the date alongside the link."]],
    refs: [["NIST Cybersecurity Supply Chain Risk Management", "https://csrc.nist.gov/projects/cyber-supply-chain-risk-management"]],
    links: [["Component database", "/components"], ["Project catalog", "/catalog"], ["ESP32 sensor selection guide", "/blog/best-esp32-sensors-final-year-projects"], ["Contact Rectronx", "/contact"]],
  },
  {
    slug: "electronics-project-design-review-before-buying-components",
    title: "Electronics Project Design Review Before Buying Components",
    excerpt: "A student design-review checklist for voltage, GPIO, interfaces, power, safety, testability and component compatibility before purchasing FYP hardware.",
    category: "Electronics",
    summary: `A design review before purchasing reduces the risk of incompatible modules and late scope changes. It does not need to be a long formal meeting. It is a structured check of requirements, block diagrams, interfaces, power, pin allocation, safety, project risks and the test plan with a supervisor or technically informed peer.

The purpose is not to prove the design is perfect. It is to expose hidden assumptions while changes are still inexpensive. Important decisions should point to a datasheet, calculation, requirement or small proof-of-concept test.`,
    sections: [
      ["Review the requirements first", `List the user, environment, inputs, outputs, response, power source, connectivity and safety boundaries. Separate required behaviour from optional ideas. For an outdoor project, enclosure, temperature, moisture, antenna placement and power become design inputs rather than accessories added at the end.

Check that every feature supports an objective. Remove features without a user need, test method or realistic development window.`],
      ["Audit every interface", `Create an interface table with signal name, direction, logic voltage, protocol, connector, pull resistor and controller pin. I2C devices need compatible addresses and pull-ups; UART requires correct TX/RX routing and baud rate; analogue inputs must stay within the ADC range.

Use documentation for the exact board. For ESP32 designs, check input-only GPIOs, strapping pins and pins used by flash before finalising allocation. A tutorial may use a different board revision.`],
      ["Review power, heat and loads", `Complete a power budget and check regulators, connectors, cable loss and peak current. Define how motors, solenoids and relay coils are driven because a GPIO is not a power output. Review flyback protection, transistor or driver choice, common ground and isolation requirements.

Do not prototype mains voltage on a breadboard. Demonstrate control logic with safe low voltage unless the project has appropriate hardware and competent supervision.`],
      ["Design the project for testing", `Add accessible test points for ground, supply rails and critical signals. Ensure connectors can be reached and damaged modules can be replaced. Plan firmware recovery and debugging before an incorrect configuration locks the device. Status indicators should convey a defined state.

Finish the review with an action list containing the issue, owner, due date and decision. Do not purchase a critical module while voltage, interface or power questions remain open.`],
    ],
    validation: ["Read the primary datasheet for every critical interface.", "Check pin allocation against the official board schematic or tool.", "Calculate the power budget including peaks.", "Prototype the highest-risk interface before full purchasing."],
    mistakes: ["Buying all parts from a project title alone.", "Assuming every module accepts 5 V logic.", "Ignoring I2C addresses, boot pins or input-only pins.", "Providing no test points or recovery method."],
    faq: [["Who should attend a student design review?", "The student, supervisor and ideally one person willing to challenge assumptions. A small review with complete material is better than a large meeting without evidence."], ["Is a full schematic required?", "At minimum, bring requirements, a block diagram, interface table and power plan. A detailed schematic should receive a later review before PCB fabrication."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"]],
    links: [["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Component database", "/components"], ["Electronics project catalog", "/catalog?category=iot-embedded"], ["Discuss a project design", "/contact"]],
  },
  {
    slug: "record-experiment-data-iot-final-year-project-report",
    title: "How to Record Experiment Data for an IoT Final Year Project Report",
    excerpt: "Record IoT experiments so results can be reproduced, audited and used correctly in the methodology and results chapters of an FYP report.",
    category: "FYP Guidance",
    summary: `An experiment record connects the prototype to the conclusion. Without versions, setup, time, inputs and raw data, a student may be unable to explain why two runs differ. A good record lets another person reproduce the procedure and understand its limitations.

Assign an experiment ID before testing. Preserve the question or hypothesis, variables, equipment, configuration, procedure, raw data, observations and decision. Do not depend on memory or scattered chat messages.`,
    sections: [
      ["Build an experiment log", `Every session should record date and time with zone, operator, location, hardware revision, firmware commit, network configuration and reference equipment. Note apparently small changes such as the USB cable, adapter or sensor position. Setup photographs should include labels or scale.

Use consistent file names such as EXP-07_run-03_raw.csv. Never overwrite raw data after filtering or calibration. Processed outputs belong in separate files together with the script, spreadsheet formula or method that produced them.`],
      ["Control the variables", `Identify the independent variable being changed, dependent variable being measured and controls being held constant. When testing radio range, do not change antenna and transmit power simultaneously unless the experiment deliberately studies both. Randomise order when time drift or temperature could bias the result.

State sample interval, sample count, warm-up and duration. A sensor that requires stabilisation cannot be compared using only its first reading.`],
      ["Protect data integrity", `Store standard timestamps, units in the schema or header, explicit missing values and calibration records. Use checksums or versioned storage for important datasets where appropriate. Export numerical data rather than manually copying points from a chart, which creates transcription errors.

Record every exclusion with a reason. If power failed during a run, preserve that event. Selectively reporting only clean runs weakens the conclusion.`],
      ["Convert records into a results chapter", `Begin with a table describing conditions and sample counts. Select charts that fit the question: time series for trends, scatter plots for relationships, distributions for variation and confusion matrices for classification. Every figure needs units, conditions and a caption explaining the relevant observation.

Separate observation from interpretation. "The rail fell to X volts when the relay activated" is an observation; "the adapter is undersized" is an interpretation requiring supporting tests.`],
    ],
    validation: ["Ask another person to reproduce one test from the log.", "Trace every plotted point to a raw-data file.", "Confirm units, time zone and firmware revision are recorded.", "Keep failed runs and exclusions with reasons."],
    mistakes: ["Editing a raw-data file after the experiment.", "Omitting firmware or wiring revision.", "Using graphs without units or sample count.", "Removing failed runs without an audit trail."],
    faq: [["Is CSV or Excel better for FYP data?", "CSV is open and easy to process or version, while a spreadsheet is convenient for manual inspection. Keep raw data in an open format and preserve analysis formulas separately."], ["Must all raw data appear in the report?", "No. The report can present summaries and representative results, while raw data and procedures remain available under the institution's storage and privacy policy."]],
    refs: [["RFC 3339 Internet Timestamps", "https://www.rfc-editor.org/info/rfc3339/"], ["NIST/SEMATECH Engineering Statistics Handbook", "https://itl.nist.gov/div898/handbook/index2.htm"]],
    links: [["IoT testing before viva", "/blog/test-iot-final-year-project-before-viva"], ["Project catalog", "/catalog"], ["IoT topic hub", "/topics/iot"], ["Discuss an FYP methodology", "/contact"]],
  },
  {
    slug: "common-ground-esp32-sensors-relays-motors",
    title: "Common Ground for ESP32, Sensors, Relays and Motors",
    excerpt: "Understand signal reference, return-current paths, load separation and isolation so ESP32 electronics projects avoid unstable readings and resets.",
    category: "Electronics",
    summary: `A signal voltage only has meaning relative to a reference. When an ESP32 drives a relay interface or reads a sensor output, both circuits normally need a shared ground reference so the receiver can interpret the voltage. Common ground does not mean forcing every current through one thin wire or joining isolated systems without analysing safety.

Ground problems often appear as jumping sensor values, failed UART communication or resets when a motor starts. Solving them requires understanding the current return path rather than adding random GND wires.`,
    sections: [
      ["Understand the shared reference", `If an ESP32 output is 3.3 V relative to ESP32 ground, the driver's input needs a compatible reference. With two separate DC supplies and a non-isolated control signal, connect ground at a deliberate point. Do not connect the positive terminals of different voltage rails together.

Some optocoupler modules can provide isolation, but relay boards may include jumpers or copper connections that defeat it. Check the module schematic and actual wiring instead of trusting a product title or board colour.`],
      ["Control motor and relay return current", `Motor current should not return through a narrow sensor-ground path. Route high-current and signal returns deliberately, joining them at an appropriate reference near the supply or driver. Add flyback protection to DC coils and use decoupling specified by the relevant datasheet.

Breadboards and jumper wires have non-zero resistance. Motors, servos and modems can create a measurable drop. Use short suitable conductors and measure voltage between ground points while the load operates.`],
      ["Know when not to join grounds directly", `Mains circuits, industrial field wiring and equipment with different ground potentials require a safety analysis and may need galvanic isolation. Never attach grounded test equipment casually to a mains-referenced circuit. A student project should remain at safe low voltage unless competent supervision and suitable equipment are present.

Interfaces such as RS-485 also have common-mode limits. Isolation is a system decision based on voltage, faults and safety rather than an optional decoration.`],
      ["Troubleshoot the reference path", `With power removed, check continuity only where grounds are intended to connect. Under power, measure the drop between controller ground and driver ground while the load is active. Use clearly documented probe points. If the reading changes when a motor starts, investigate the supply transient and return-current path.

Test the sensor without the load, then add the driver and motor one stage at a time. Record the first configuration that reproduces the fault.`],
    ],
    validation: ["Draw supply and return-current paths on the schematic.", "Measure ground-to-ground voltage during peak load.", "Compare sensor readings before and during motor operation.", "Confirm whether the real relay-module wiring preserves isolation."],
    mistakes: ["Sending a signal between circuits without a reference.", "Returning motor current through sensor wiring.", "Assuming every optocoupled module is isolated.", "Connecting grounded instruments to mains without expertise."],
    faq: [["If a motor uses another adapter, must grounds be connected?", "When an ESP32 controls a non-isolated driver, a common reference is normally required. The exact connection depends on the driver schematic. Never join different positive rails without a valid design."], ["Is star grounding always required?", "No. It is one technique for controlling current paths. The correct topology depends on current, frequency and layout. Analyse the actual return path instead of applying a rule blindly."]],
    refs: [["Texas Instruments PCB Layout and Decoupling Guidelines", "https://www.ti.com/lit/an/scea042/scea042.pdf"]],
    links: [["ESP32 power supply guide", "/blog/esp32-power-supply-for-sensors-relays-fyp"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["ESP32 component guide", "/components/esp32"], ["Discuss project wiring", "/contact"]],
  },
  {
    slug: "pull-up-pull-down-floating-digital-inputs",
    title: "Pull-Up, Pull-Down and Floating Digital Inputs Explained",
    excerpt: "Learn why digital inputs float, how pull-up and pull-down resistors set a default state, and how to test buttons and sensor outputs correctly.",
    category: "Electronics",
    summary: `A high-impedance digital input can change between HIGH and LOW when nothing drives it. This floating condition can make a button appear pressed, generate false interrupts or switch an output unexpectedly. A pull-up or pull-down resistor establishes a known default state while allowing the intended signal to override it.

Do not copy one resistor value from a diagram without context. Check controller documentation, logic voltage, leakage, signal speed, power consumption and electrical noise. Internal pull resistors simplify prototypes but may have a broad value range and are not available on every pin.`,
    sections: [
      ["How a pull-up sets the default", `A pull-up connects the input to the logic rail through a resistor. With an open switch, the input reads HIGH; when the switch closes to ground, it reads LOW. The resistor limits current so the closed switch does not short the rail directly to ground. A pull-down provides the opposite default.

Active-low logic is valid. Name the signal clearly, such as BUTTON_N, and document the inversion so firmware and diagrams remain consistent.`],
      ["Choose internal or external biasing", `Internal pulls are convenient for short button wiring, but not every GPIO provides them. Espressif documentation notes that ESP32 GPIO34 and higher are input-only and do not have internal pull-up or pull-down resistors. Details differ by ESP32 family and board.

An external resistor gives a controlled value near the receiver. Too little resistance wastes current when active; too much makes leakage and noise more significant. Values in the kilo-ohm range are common, but the correct result follows the datasheet and measurement.`],
      ["Treat button bounce separately", `A pull resistor does not remove mechanical contact bounce. One press can create several transitions over milliseconds. Use a timed software debounce or a correctly designed hardware network. Avoid blocking delays when the system must continue servicing communication and safety functions.

Long cables add capacitance and receive interference. For noisy or remote wiring, consider filtering, shielding, twisted pairs, Schmitt-trigger inputs or a differential interface instead of a raw GPIO.`],
      ["Diagnose an unstable input", `Measure the input relative to ground while the switch is open and closed. A middle or changing voltage can indicate a floating node or unsuitable bias. Enable the internal pull explicitly in firmware rather than assuming the startup state.

A logic analyser can reveal bounce and narrow pulses that a multimeter will not show. Count events per physical press before and after debounce to prove the improvement.`],
    ],
    validation: ["Measure input voltage for every switch state.", "Test 100 presses and count extra events.", "Power-cycle the board and confirm a safe default state.", "Verify the selected pin supports the configured internal pull."],
    mistakes: ["Leaving a digital input undriven.", "Assuming every GPIO has an internal pull.", "Changing software before measuring the node.", "Expecting a pull resistor to remove switch bounce."],
    faq: [["What pull-up resistor value should I use?", "It depends on leakage, capacitance, speed and power. Values such as 4.7 kOhm or 10 kOhm are common in some circuits, but documentation and measurements should determine the final choice."], ["Can I use a pull-up and pull-down together?", "A divider can establish a bias, but it is usually unnecessary for a simple switch and consumes current. Use it only when the circuit has a defined reason."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"]],
    links: [["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Safe ESP32 GPIO guide", "/blog/esp32-pinout-safe-gpio-pins-guide"], ["ESP32 component guide", "/components/esp32"], ["Contact Rectronx", "/contact"]],
  },
  {
    slug: "choose-resistors-led-voltage-divider",
    title: "How to Choose Resistors for LEDs and Voltage Dividers",
    excerpt: "Calculate LED current-limiting and voltage-divider resistors while checking power, tolerance, loading and ADC input limits in student electronics projects.",
    category: "Electronics",
    summary: `A resistor should not be chosen by copying colour bands from a photograph. For an LED, the resistor limits current according to supply voltage, forward voltage and target current. For a voltage divider, the resistor ratio defines the unloaded output, but ADC input behaviour and leakage make a real circuit less ideal.

Every calculation should be checked against standard values, tolerance and power dissipation. Measure the prototype because LED forward voltage, supply voltage and resistor values vary. A divider is not a regulated power supply for a changing load.`,
    sections: [
      ["Calculate an LED series resistor", `Use R = (Vsupply - Vf) / I. If a 3.3 V output drives an LED with a 2.0 V forward voltage at a 5 mA target, the estimate is 260 ohms; a standard 270 or 330 ohm value may be selected according to brightness and margin. This is an example, not a universal value.

Check both per-pin and total controller current limits in the datasheet. An indicator LED often needs much less than its maximum rated current. Calculate resistor power using P = I squared times R and select a suitable rating.`],
      ["Calculate a voltage divider", `For an ideal unloaded divider, Vout = Vin x Rbottom / (Rtop + Rbottom). Large resistor values reduce divider current but raise source impedance. An ADC sample-and-hold input may require lower impedance, more acquisition time or buffering. Small values consume power and load the source.

Use maximum input voltage, including credible transients, to keep Vout below the input's absolute maximum. Add suitable protection when the source can exceed the expected range.`],
      ["Account for tolerance and loading", `A 1% resistor can still produce ratio error from the combination of both tolerances. ADC reference uncertainty, noise, calibration and loading add further error. For battery measurement, test several known voltages with a suitable reference and document any fitted calibration.

Sensor output impedance and input leakage change the effective divider. Use the Thevenin equivalent when assessing source resistance and load error.`],
      ["Verify the breadboard circuit", `Measure actual resistor values when markings are uncertain. Confirm common ground, use clearly labelled probe points and begin at a safe low voltage. If an LED does not illuminate, check polarity, wiring and output state before reducing the resistor.

Record the equation, selected standard value, measured value and result. This demonstrates engineering selection rather than trial and error.`],
    ],
    validation: ["Calculate worst case using voltage and resistor tolerances.", "Measure divider output unloaded and with the ADC connected.", "Check resistor power and controller current limits.", "Compare several input points with a suitable meter."],
    mistakes: ["Treating the LED maximum rating as a required current.", "Using a divider to power a sensor or relay.", "Ignoring ADC source impedance and tolerance.", "Allowing an input to exceed its absolute maximum."],
    faq: [["Why is an LED still bright with a larger resistor?", "Modern LEDs can be clearly visible at a few milliamps. A larger resistor reduces current and is often safer when the brightness remains adequate."], ["Can a divider convert 5 V into a 3.3 V power supply?", "A divider can scale a high-impedance signal, but it is not a regulator for a changing load. Use a suitable regulator for power."]],
    refs: [["Texas Instruments Voltage Divider Calculator", "https://www.ti.com/download/kbase/volt/volt_div3.htm"], ["TI Voltage-Sensing Divider Application Brief", "https://www.ti.com/document-viewer/lit/html/SNAA363/GUID-7B0D26D5-46C0-4D6F-94BC-9579FEFB9A94"]],
    links: [["Component database", "/components"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Common ESP32 wiring mistakes", "/blog/common-esp32-wiring-mistakes-fyp-demo"], ["Discuss an electronics circuit", "/contact"]],
  },
  {
    slug: "decoupling-capacitors-reduce-esp32-resets",
    title: "Decoupling Capacitors: Reducing ESP32 Resets the Right Way",
    excerpt: "Understand decoupling, bulk capacitance, component placement and voltage-drop testing before using capacitors to address ESP32 resets.",
    category: "Electronics",
    summary: `An ESP32 that resets during WiFi transmission, relay switching or sensor activity may have a supply disturbance, but adding a random capacitor is not a diagnosis. A decoupling capacitor provides a local low-impedance path for transient current and helps control supply noise. Bulk capacitance supports slower load changes. Both complement a suitable supply rather than replacing one.

Capacitance, ESR, voltage rating, dielectric and placement affect performance. Follow the schematic and hardware guidelines for the actual chip or development board. External loads may still need additional support at their point of load.`,
    sections: [
      ["Separate decoupling from bulk support", `A small capacitor such as 0.1 uF is commonly placed very close to an IC supply pin for high-frequency transients. A larger bulk capacitor is placed near a rail entrance or load for slower current changes. These are general principles; the device documentation determines exact values and arrangements.

Traces and vias add inductance, so a distant capacitor becomes less effective at high frequency. Both Espressif and Texas Instruments emphasise short placement near the intended pin or supply entrance.`],
      ["Identify the real reset source", `Possible causes include a weak adapter, high-resistance USB cable, overheating regulator, motor noise, disturbance on EN, a temporary short or a firmware watchdog. A serial reset message can point toward a cause, but measurement is still necessary.

Measure the supply at the board during the event. A handheld meter may miss a short transient, making an oscilloscope more useful when it is available and used safely. Controlled substitution of supply, cable and load also narrows the cause.`],
      ["Add capacitance safely", `Check polarity, voltage rating and discharge state before installing an electrolytic capacitor. Place local decoupling close to the relevant device and bulk capacitance near the load entrance according to guidance. Keep leads short. Very large capacitance can increase inrush current and stress a regulator or switch.

Do not add capacitance to boot, EN or communication signals without understanding timing. A power fix should not accidentally alter control behaviour.`],
      ["Prove that the change worked", `Define a repeatable stress sequence with WiFi activity, relay switching and load startup. Record reset count, minimum observed voltage, regulator temperature and capacitor configuration. Change one factor at a time.

If a better cable solves the issue, report the likely supply-path weakness. If a capacitor reduces resets while voltage still leaves the specified range, the design is not yet validated.`],
    ],
    validation: ["Read reset reason and correlate it with load events.", "Measure rails at the controller and point of load.", "Compare before and after using the same stress sequence.", "Check capacitor polarity, rating and component temperature."],
    mistakes: ["Installing an electrolytic with reversed polarity.", "Using long leads for a local decoupler.", "Masking an undersized regulator with capacitance.", "Changing several parts at once and losing causality."],
    faq: [["What capacitor value should I add to an ESP32?", "There is no universal value. Use the board documentation, load profile and measurement. Espressif gives chip-level guidance, while a finished development board may already implement part of it."], ["Is every ESP32 reset a brownout?", "No. Watchdogs, exceptions, EN, boot pins, heat and firmware can also reset the controller. Use the reset reason and structured tests."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"], ["Texas Instruments Decoupling Guidelines", "https://www.ti.com/lit/an/slaa921/slaa921.pdf"]],
    links: [["ESP32 power supply guide", "/blog/esp32-power-supply-for-sensors-relays-fyp"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["ESP32 component guide", "/components/esp32"], ["Discuss reset troubleshooting", "/contact"]],
  },
  {
    slug: "multimeter-troubleshooting-electronics-fyp-safely",
    title: "How to Use a Multimeter Safely for Electronics FYP Troubleshooting",
    excerpt: "A safe multimeter workflow for continuity, voltage and current checks in low-voltage FYP circuits, including probe mistakes that can damage a project.",
    category: "Electronics",
    summary: `A multimeter can answer three basic questions: is a connection complete, does the correct voltage reach a point, and how much current flows through a path? The selected mode and probe sockets change how the meter interacts with a circuit. A particularly dangerous mistake is measuring voltage while the lead remains in a current socket, because the meter may create a short circuit.

This guide concerns low-voltage DC projects such as ESP32, sensors and relay drivers. Do not measure mains without training, correctly rated equipment and competent supervision.`,
    sections: [
      ["Inspect before applying power", `Check wiring, polarity, connectors and obvious shorts visually. With power removed and capacitors safely discharged, use continuity to check intended ground connections, fuses and conductors. Fluke specifies that continuity should only be tested when voltage is not present.

A continuity beep does not prove the path performs well under load. Contact resistance may become important at higher current, so continue with voltage-drop testing while the low-voltage system operates.`],
      ["Measure DC voltage in parallel", `Place the black lead in COM and the red lead in the voltage or resistance socket. Select DC voltage and an appropriate range. Voltage is measured in parallel between two points. In an ESP32 project, check the adapter, regulator input, 5 V or 3.3 V rail and the load during the event that causes trouble.

Always record the reference point. Saying that a sensor measured 3.3 V is incomplete without the ground point and load condition.`],
      ["Measure current in series", `Current measurement requires opening the path and inserting the meter in series. Move the lead to the correct current socket, begin on a high range and check the meter fuse. Never place a meter in current mode directly across a battery or supply because this creates a short through the meter.

Return the red lead to the voltage socket immediately after the measurement. A current sensor or oscilloscope with a suitable shunt may be better for transient or long-running measurements.`],
      ["Follow a systematic fault path", `Start at the source and move toward the load: adapter, regulator, rail, connector, driver and component. Compare a working condition with the failure condition. Stable power with a wrong signal points toward logic level, configuration or communications; a falling rail points toward the supply path and load.

Photograph probe placement and record mode, range and conditions. This gives report evidence and prevents numbers from losing their context.`],
    ],
    validation: ["Check probe sockets before every measurement.", "Use continuity only with power removed and capacitors discharged.", "Measure supply voltage at idle and peak load.", "Record mode, range, probe points and system condition."],
    mistakes: ["Measuring voltage with the lead in a current socket.", "Testing resistance or continuity on a live circuit.", "Treating a beep as proof of a good load connection.", "Working on mains without suitable competence and equipment."],
    faq: [["Why can a meter show 3.3 V while the ESP32 still resets?", "A handheld meter may not capture a short transient. Check reset logs, wiring, cable and load, then use an oscilloscope only when it is available and can be operated safely."], ["Can I measure current across battery terminals?", "No. In current mode that can short the battery through the meter. Current is measured in series with a controlled load and suitable protection."]],
    refs: [["Fluke: How to Use a Multimeter", "https://www.fluke.com/en/learn/blog/maintenance-monitoring/how-to-use-a-multimeter-guide"], ["Fluke: What Is Continuity", "https://www.fluke.com/en-us/learn/blog/electrical/what-is-continuity"]],
    links: [["Electronics troubleshooting checklist", "/blog/fyp-electronics-troubleshooting-checklist"], ["Component database", "/components"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Contact Rectronx", "/contact"]],
  },
];

const blogDir = path.join(process.cwd(), "content", "blog");

for (const post of posts) {
  const sections = post.sections.map(([heading, body]) => `## ${heading}\n\n${body}`).join("\n\n");
  const validation = post.validation.map((item) => `- ${item}`).join("\n");
  const mistakes = post.mistakes.map((item) => `- ${item}`).join("\n");
  const faq = post.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n");
  const viva = post.sections.map(([heading], index) => `- For **${heading}**, what was design decision ${index + 1}, which alternative was rejected, and what evidence supports the choice?`).join("\n");
  const references = post.refs.map(([label, url]) => `- [${label}](${url})`).join("\n");
  const links = post.links.map(([label, url]) => `- [${label}](${url})`).join("\n");

  const output = `---
title: "${post.title}"
excerpt: "${post.excerpt}"
category: "${post.category}"
date: "2026-10-20"
language: "en-MY"
---

## Quick Summary

${post.summary}

${sections}

## Validation Plan

${validation}

Run tests with one controlled change at a time. Preserve configuration, raw measurements and failed runs rather than only successful screenshots. For a final year project, repeatable evidence is stronger than promotional claims. When the available instrument or method cannot prove a statement, report that limitation and define the additional experiment that would be required.

## Common Mistakes

${mistakes}

Move these risks into a checklist or project risk register before demo day. A fault found while architecture and wiring are still flexible is normally less expensive to correct than one discovered after hardware, firmware and report chapters depend on the same assumption.

## FAQ

${faq}

## Viva Questions You Should Be Able to Answer

${viva}

A strong answer should cite a requirement, primary datasheet, calculation or result from the student's own tests. For **${post.title}**, avoid saying only that a tutorial used the same method. Explain the selected option, the rejected alternative, test conditions and remaining limitation. Honest boundaries show engineering judgement and make future improvements credible.

## Technical References

${references}

These references support the general technical principles. Always verify the datasheet for the exact component model, board revision and library version used in the prototype because pins, electrical limits and behaviour can differ.

## Related Rectronx Resources

${links}
`;

  fs.writeFileSync(path.join(blogDir, `${post.slug}.mdx`), output, "utf8");
}

console.log(`Generated ${posts.length} English blog articles.`);
