import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SponsoredCarousel.css"; // Optional for custom styles
import { StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
const companies = [
  {
    name: "TechNova Inc.",
    logo: "https://www.technovaworld.com/Themes/Technova/Content/images/technova-logo.png",
    rating: 4.5,
    reviews: 128,
    tags: ["B2B", "B2C", "Corporate", "Public"],
  },
  {
    name: "GreenSolutions",
    logo: "https://img.naukimg.com/logo_images/groups/v1/4609355.gif",
    rating: 4.2,
    reviews: 97,
    tags: ["Corporate", "B2B"],
  },
  {
    name: "Amazon",
    logo: "https://amazon-blogs-brightspot-lower.s3.amazonaws.com/about/00/92/0260aab44ee8a2faeafde18ee1da/amazon-logo-inverse.svg",
    rating: 4.7,
    reviews: 143,
    tags: ["B2C", "Public"],
  },
  {
    name: "Skyline Ventures",
    logo: "https://skylineventures.in/wp-content/uploads/2023/03/Sky-Logo-01.png",
    rating: 4.8,
    reviews: 201,
    tags: ["B2B", "Corporate"],
  },
  {
    name: "EcoTech Ltd.",
    logo: "https://www.ecotech-ea.com/wp-content/uploads/2019/02/ecotech-logo-web-80px-h.png",
    rating: 4.3,
    reviews: 112,
    tags: ["B2C", "Public"],
  },
  {
    name: "ByteForge",
    logo: "https://www.byteforgetechnologies.in/assets/img/logo.gif",
    rating: 4.6,
    reviews: 189,
    tags: ["Corporate", "Public"],
  },
  {
    name: "NovaRetail",
    logo: "data:image/webp;base64,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",
    rating: 4.1,
    reviews: 75,
    tags: ["B2C", "Corporate"],
  },
  {
    name: "Zenith Works",
    logo: "https://zenithtechworks.com/wp-content/uploads/2023/03/Zenith-Tech-Works-Logo-768x384.png",
    rating: 3.9,
    reviews: 58,
    tags: ["B2B", "Public"],
  },
  {
    name: "Unthinkable",
    logo: "https://www.unthinkable.co/Logo.svg",
    rating: 4.0,
    reviews: 86,
    tags: ["Public", "Corporate"],
  },
  {
    name: "Upscale",
    logo: "https://cdn.prod.website-files.com/67e002ca1673b66e25aef679/67e056345fd36efdd34d0ada_Frame%202087325443.svg",
    rating: 4.4,
    reviews: 124,
    tags: ["B2B", "It services"],
  },
  {
    name: "Cutshort ",
    logo: "https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fnew_logo_full.png&w=828&q=75",
    rating: 4.9,
    reviews: 209,
    tags: ["B2B", "Corporate"],
  },
  {
    name: "DeltaSoft",
    logo: "https://deltasoftsolutions.net/wp-content/uploads/2023/09/main_logo.png",
    rating: 3.8,
    reviews: 52,
    tags: ["B2C", "Public"],
  },
  {
    name: "LumaTech",
    logo: "https://lumitechsolutions.com/wp-content/uploads/2022/05/logo-250.png",
    rating: 4.6,
    reviews: 133,
    tags: ["Corporate", "B2B"],
  },
  {
    name: "InfiniCore",
    logo: "https://www.inficore.co.ke/images/light%20logo.png",
    rating: 4.3,
    reviews: 91,
    tags: ["B2C", "Corporate"],
  },
  {
    name: "NeonEdge",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE-29u3sRvQkg/company-logo_200_200/company-logo_200_200/0/1633012877885?e=1752710400&v=beta&t=8XR7_iAzFbXFt_9iSbDt1xsdRwU6AgRMe3-veisjVt4",
    rating: 4.1,
    reviews: 69,
    tags: ["Public", "B2C"],
  },
  {
    name: "CloudNetics",
    logo: "https://cloudnetic.com.au/wp-content/uploads/2024/08/cropped-cropped-Untitled-design-1-1024x576-1.png",
    rating: 4.7,
    reviews: 155,
    tags: ["B2B", "Corporate"],
  },
  {
    name: "MatrixLogix",
    logo: "https://www.matrixedu.in/assets/default/images/xlogo.webp.pagespeed.ic.DJzVvJyuLy.webp",
    rating: 4.2,
    reviews: 101,
    tags: ["B2B", "Public"],
  },
  {
    name: "PrimeCode",
    logo: "https://primecode.com/wp-content/uploads/2022/08/PrimeCode-Logo-768x82.png",
    rating: 4.0,
    reviews: 82,
    tags: ["Corporate", "B2C"],
  },
  {
    name: "UrbanSoft",
    logo: "https://urbansoftsolutions.com/wp-content/uploads/2019/12/logo-1024x621.png",
    rating: 3.7,
    reviews: 47,
    tags: ["Public", "B2B"],
  },
  {
    name: "Microsoft",
    logo: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
    rating: 4.5,
    reviews: 119,
    tags: ["B2B", "B2C", "Public"],
  },
  {
    name: "Visionary Tech",
    logo: "https://www.visionarytechsolution.com/assets/logovts-removebg-7dce3a38.png",
    rating: 4.9,
    reviews: 230,
    tags: ["Corporate", "Public"],
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const SponsoredCarousel = () => {
    const readMore = ()=>{
    const readMore = document.querySelector('.read-more');
    const moreButtons = document.querySelector('.more-buttons');
    moreButtons.style.opacity = '1';
    readMore.style.opacity = '0';
  }
  const navigate = useNavigate()


  return (
    <div className="px-5">
      <div className="container">
        <h3 className="text-center my-4 ">Sponsored companies</h3>{" "}
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            opacity: "1",
          }}
        >
          {" "}
          <li>
            <button className="buttons-style mx-2 ">All</button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">It Services</button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">Technology</button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">
              Healthcare & Lifesciences
            </button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">
              Manufacturing & Production
            </button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">
              Infrastructure, Transport & Real Estate
            </button>
          </li>
          <li>
            <button className="buttons-style mx-2 ">BFSI</button>
          </li>
          <li
            className="read-more"
            style={{
              fontSize: "13px",
              color: "#5d5d5e",
              fontStyle: "bold",
              cursor: "pointer",
            }}
            onClick={readMore}
          >
            +4 more
          </li>{" "}
        </ul>{" "}
        <ul
          className="more-buttons"
          style={{
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0",
            marginBottom: "40px"
          }}
        >
          <li>
            <button className="buttons-style mx-2">All</button>
          </li>{" "}
          <li>
            <button className="buttons-style mx-2">It Services</button>
          </li>
          <li>
            <button className="buttons-style mx-2">Technology</button>
          </li>
          <li>
            <button className="buttons-style mx-2">
              Healthcare & Lifesciences
            </button>
          </li>
        </ul>
      </div>
      <Carousel
        responsive={responsive}
        draggable
        swipeable
        showDots={false}
        arrows
        infinite
        autoPlay={false}
        keyBoardControl
        containerClass="carousel-container"
        itemClass="carousel-item-padding-20-px"
      >
        {companies.map((company) => (
          <div key={company.id} className="card company-card mx-2">
            <img
              src={company.logo}
              className="card-img-top p-1 comp-logo"
              alt={company.name}
              style={{ objectFit: "contain" , backgroundSize:"cover"}}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{company.name}</h5>
              <p className="card-text">
                {Array.from({ length: company.rating }).map((_, i) => (
                  <StarFill key={i} className="text-warning mx-1" />
                ))}
                <span className="text-primary" >&#124; {company.reviews} reviews</span>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-1">
                    {company.tags.map((tag, tagIndex) => (
                      <button key={tagIndex} className="buttons-style">{tag}</button>
                    ))}
                  </div>



            </div>
          </div>
        ))}
      </Carousel>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: "40px 0" }}
      >
        {" "}
        <button type="button" className="px-4 py-2 btn-comp">
          <a
            onClick={() => {
              navigate("/carrier");
            }}
            className="text-decoration-none py-3 px-4"
          >
            View all companies
          </a>
        </button>
      </div>
    </div>
  );
};

export default SponsoredCarousel;
