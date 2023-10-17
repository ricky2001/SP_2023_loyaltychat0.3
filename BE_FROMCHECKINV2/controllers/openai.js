const openAI = require("openai");
require('dotenv').config();

const openai = new openAI({
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openai = async (req, res) => {
  const { message } = req.body;
  console.log(message)

    let knowledge = "World-Class IT Banking Services A multinational team creating digital solutions to provide reliable, secured technological services, and infrastructure to the National Bank of Canada\nCompany info ATA IT supports The National Bank of Canada's banking projects in Southeast Asia and North America. ATA IT Limited is a subsidiary of National Bank of Canada (NBC), ATA IT was founded in 2016 to provide NBC and its subsidiaries in Asia-Pacific region including ABA Bank with world-class IT service. ATA IT provides trusted security solutions as well as developing products and services for our key partners. We are a multinational organization with a global team; we value our staff and their development is the key to our success. ATA IT Limited is a subsidiary of National Bank of Canada (NBC), founded in 2016 to provide NBC, and its partners in the Asia-Pacific region including ABA Bank, with world-class IT services. Our talented team has broad skillsets and a wealth of experience in delivering new technology and high quality solutions for our group.\nSERVICE, MAINTENANCE Providing service operation while maintaining stable and secure infrastructure Providing round the clock support and service operation incidents and requests while maintaining stable and secure infrastructure.\nAROUND THE CLOCK, RAPID Providing IT Security in a fast-paced, evolving banking environment Security awareness, quick identification, analysis and notification of al security incidents, and mitigate the impact of attacks or intrusions\nAGILE, DIGITAL TRANFORMATION Revolutionizing the financial experience with customer-centric products. Digital banking solutions for web & mobile, using the latest tools and technology, as well as application support for wealth management systems.\nSUPPORTS, SOLUTION Overseeing complex financial market applications outside partner's business hours. End of day support, handling incidents and providing short-term as well as structural improvements.\nMANAGEMENT, PRODUCTION Supporting data management, environment creation and ETL production. Supervising the migration of data analysis work products, end to end database management, plus customizing & modifying documentation.\nINTEGRATION, CONTINUITY Directing IT solutions for a rapidly expanding international bank. End to end integration of all core banking systems, guaranteeing its' continuity and managing full delivery life cycle.\nCONTACT ATA IT LIMITED 25 Bangkok Insurance Building, 25th/28th Floor, South Sathorn Road, Thungmahamek, Sahorn, Bangkok 10120, Thailand Phone +662 105 4574 Website Email Address hr@ata-it-th.com https://www.ata-it-th.com/";

  const basePromptPrefix = `This is a conversation between ATAmanager and a stranger.\nRelevant information that ATAmanager knows:\n${knowledge}`;
  console.log(basePromptPrefix);
  
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}\n\nStranger:${message}\n\nATAmanager:`,
    max_tokens: 256,
    temperature: 0.7,
  });
  res.json({
    message: response.choices[0].text,
  });
}




