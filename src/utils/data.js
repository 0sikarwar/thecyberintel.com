import reactImg from "../assets/reactjs.png";
import dropbox from "../assets/dropbox.png";
import fb from "../assets/fb.png";
import instagram from "../assets/instagram.png";
import netflix from "../assets/netflix.png";
import paypal from "../assets/paypal.png";
import salesforce from "../assets/salesforce.png";
import tnyt from "../assets/tnyt.png";
import twitter from "../assets/twitter.png";
import uber from "../assets/uber.png";
import whatsapp from "../assets/whatsapp.png";
import website from "../assets/website.jpg";
import itSupport from "../assets/itSupport.jpg";
import seo from "../assets/seo.jpg";

export const timelineData = [
  {
    date: "22 mar 2001",
    heading: "This is the heading",
    desc:
      "Description goes here Description goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes hereDescription goes here",
  },
  {
    date: "22 mar 2002",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2000",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2003",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2003",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2003",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2004",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2002",
    heading: "This is the heading",
    desc: "Description goes here",
  },
  {
    date: "22 mar 2002",
    heading: "This is the heading",
    desc: "Description goes here",
  },
];

export const cardData = [
  {
    title: "Website Design & Development",
    serviceId: "website",
    discription:
      "Over time, people have just come to expect that a reputable business will have a website that they can visit. A website is the first step in helping build a company-customer relationship. Our web designers help businesses create effective online presence that support their growth. Do feel free to contact us here to get started.",
    readMoreLink: "#/web-design",
    imagePath: website,
  },
  {
    title: "Remote Managed IT Support",
    serviceId: "itsupport",
    discription:
      "We have a team of energetic people, dedicated to absolute customer satisfaction, that will assist and support you at every step. If you are a small business looking for affordable remote IT support Managed Services The Cyberintel can help your company’s IT department become more efficient and productive. We Combine preventative & predictive maintenance, automation and remote monitoring to reduce business impact from IT Failures.",
    readMoreLink: "",
    imagePath: itSupport,
  },
  {
    title: "SEARCH ENGINE OPTIMISATION",
    serviceId: "SEO",
    discription:
      "Search Engine Optimisation (SEO) helps businesses get their website in front of the right people, increasing their exposure, boosting their conversions and maximising their profits. Our SEO strategy marries ethical white hat tactics with innovative experimentation to produce outstanding long-term results for every client.",
    readMoreLink: "",
    imagePath: seo,
  },
];

export const servicesData = [
  {
    title: "Website Design & Development",
    desc:
      "Whatever your custom web development requirements are, we are the industry experts. We offer both custom web design and Website Theme design.",
  },
  {
    title: "Search Engine Optimization",
    desc: "We offer the full range of digital marketing services to help put your new website into the spotlight.",
  },
  {
    title: "Common Employee Portal",
    desc:
      "Deliver personalized content & messages to all employees, stakeholders, members and even spouses with backstitch Reader.",
  },
  {
    title: "Remote IT Support",
    desc:
      "We stand by our SLA agreements with our clients and provide with packaged hourly monthly commitments for IT services.",
  },
  {
    title: "Microsoft Office 365",
    desc: "We provide Microsoft Office 365 support and Office 365 consulting services to companies remotely.",
  },
  {
    title: "Veeam Backup & Replication",
    desc:
      "To get the right solution for your business, book a Disaster Avoidance and Business Continuity Planning Review today.",
  },
];

export const websitePricingData = {
  featuresList: [
    "Domain",
    "Hosting",
    "Design",
    "Development",
    "SEO",
    "Responsive",
    "Dedicated Engineer",
    "Storage",
    "SSL certificate",
    "24X7 Support",
  ],
  plans: [
    {
      name: "Basic",
      planId: "1",
      disabledFeatureIndex: [5, 7, 3, 9, 8],
      charges: 13000,
      planType: "Month",
    },
    {
      name: "Pro",
      planId: "2",
      disabledFeatureIndex: [9, 8],
      charges: 23000,
      planType: "Month",
    },
    {
      name: "premium",
      planId: "3",
      disabledFeatureIndex: [],
      charges: 30000,
      planType: "Month",
    },
  ],
};

export const webDevData = {
  cover: {
    imagePath: "https://speros.com/wp-content/uploads/2018/03/website-coding-1.jpg",
    title: "Customized Web Development Services",
    text:
      "With collaboration at our core, we are ready to work with you to hand craft winning web solutions. We excel at listening and then acting on your needs, to deliver a successful web design.",
  },
  mainData: [
    {
      title: "Having a website means customers are always able to find you – anytime, anywhere. ",
      desc: `The Cyberintel designed website provides a quick and easy way of communicating information between buyers and sellers. It shows what your company is about, what it has achieved and what it can achieve in the future. We're web design specialists so if you'd like to create a website that wows. `,
      buttonText: "Start you project now",
      buttonUrl: "#contact-block",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
    {
      title: "We use ReactJS for faster and secure development",
      desc: `React is a “declarative, efficient, and flexible JavaScript library for building user interfaces”, as defined by its creators. Simply put, it allows you to create a fast, simple and scalable frontend for web applications. You most likely use React apps everyday, while watching your favorite TV shows, browsing through social media and checking your email. 
      <p><i>When a technology is adopted by more and more people every day, it’s clear that it’s for a reason – it’s good quality.</i></p>
`,
      imagePath: reactImg,
      subData: {
        text1: "Top Organizations/Brands Using And Leveraging The Potential Of ReactJS.",
        images: [dropbox, fb, instagram, netflix, paypal, salesforce, tnyt, twitter, uber, whatsapp],
        text2:
          "The number of React lovers is increasing day by day. Every day new people fall in love with this technology. So why not try it?",
      },
    },
  ],
  faqs: {
    title: "Web Design frequently asked Questions",
    list: [
      {
        label: "How much does a new website cost?",
        content:
          "There’s not one single answer to this question. A website design is quoted based on the needs of each individual project. Every website is unique and requires different components; we design and develop custom websites specifically for your small business. We’ll ask a lot of questions, assess your needs, and give you a quote based on that assessment. Most of our sites run in the ₹20,000 – ₹2,00,000 range, but can be more or less depending on needs.",
      },
      {
        label: "What is a responsive website development?",
        content:
          "Responsive web design or responsive web development is an approach to improve the readability of the website pages across various devices, which includes PC desktops, retina displays, tablet screens and mobile phone screens.",
      },
      {
        label: "Will my website be mobile-friendly?",
        content:
          "Absolutely! Having a mobile-friendly website is more important than ever! We work hard to ensure your website looks great on a variety of devices.",
      },
      {
        label: "Do you only create ReactJS websites?",
        content:
          "Nope! We also use WordPress with React to Create Headless CMS for Your Web Application. Don’t worry, we’ll teach you how to manage it and help you along the way.",
      },
      {
        label: "Will you maintain my site for me?",
        content: "We can! We provide on-going support for many of our clients.",
      },
      {
        label: "When do I pay?",
        content:
          "We offer a variety of payment options, varying from a one-time, up-front payment to three parts, 20% payment is taken in the first part and 80% in the remaining two parts. We understand that this is a big investment and want to help you budget for the expense in whatever way possible.",
      },
      {
        label: "I’m on a strict budget. Do you have any low cost options?",
        content:
          "A custom website can be a big investment and not all small businesses have the budget for you. We offer a budget package which will help get you online with a nice looking website fast.",
      },
      {
        label: "What if I need help on my site down the road?",
        content:
          "We are only an email away! We’re here to help you as much or as little as you need, and we won’t disappear once the site is launched.",
      },
      {
        label: "Why are you so cheap?",
        content:
          "Yep. We’ve also been asked that question too. We spend a lot of time researching, planning the user’s journey through your site and then finally with the design and build. We’re typically cheaper than larger agencies because we work remotely which means you don’t pay for the water cooler or beanbag chairs.",
      },
    ],
  },
  contactUsExtraFields: ["bName", "phone"],
};

export const seoData = {
  cover: {
    imagePath: "https://speros.com/wp-content/uploads/2018/03/website-coding-1.jpg",
    title: "Savannah SEO",
    text:
      "Speros specializes in creating custom web design solutions for small businesses in and around Savannah, GA. Let us help you stand out.",
  },
  mainData: [
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block1",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
  ],
};

export const cepData = {
  cover: {
    imagePath: "https://speros.com/wp-content/uploads/2018/03/website-coding-1.jpg",
    title: "Savannah Common Employee Portal",
    text:
      "Speros specializes in creating custom web design solutions for small businesses in and around Savannah, GA. Let us help you stand out.",
  },
  mainData: [
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
    {
      title: "Your customers want to find you online. Speros web design services can make that happen.",
      desc: `Your customers are doing research online before they make a purchase. Without an updated website, you
                risk potential customers thinking you are no longer in business. If it’s been a few years since you last
                updated your web design, or worse, you are one of the 40% of small businesses who don’t have a website,
                it’s time to get on board.`,
      buttonText: "Schedule a Consultation",
      buttonUrl: "#contact-block1",
      imagePath: "https://i2.wp.com/speros.com/wp-content/uploads/2019/11/web-design-3d-icon-1.png",
    },
  ],
};
export const gstStateCodes = {
  "01": "JAMMU AND KASHMIR",
  "02": "HIMACHAL PRADESH",
  "03": "PUNJAB",
  "04": "CHANDIGARH",
  "05": "UTTARAKHAND",
  "06": "HARYANA",
  "07": "DELHI",
  "08": "RAJASTHAN",
  "09": "UTTAR PRADESH",
  10: "BIHAR",
  11: "SIKKIM",
  12: "ARUNACHAL PRADESH",
  13: "NAGALAND",
  14: "MANIPUR",
  15: "MIZORAM",
  16: "TRIPURA",
  17: "MEGHLAYA",
  18: "ASSAM",
  19: "WEST BENGAL",
  20: "JHARKHAND",
  21: "ODISHA",
  22: "CHATTISGARH",
  23: "MADHYA PRADESH",
  24: "GUJARAT",
  26: "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  27: "MAHARASHTRA",
  28: "ANDHRA PRADESH",
  29: "KARNATAKA",
  30: "GOA",
  31: "LAKSHWADEEP",
  32: "KERALA",
  33: "TAMIL NADU",
  34: "PUDUCHERRY",
  35: "ANDAMAN AND NICOBAR ISLANDS",
  36: "TELANGANA",
  37: "ANDHRA PRADESH",
  38: "LADAKH",
};
