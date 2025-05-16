import React, { useState, useRef, useEffect } from "react";
import "./AgentMicroSite.css";
import { Link } from "react-router-dom";
import mainLogo from "../../images/logo.svg";
import whatsUp from "../../images/Whatsapp.png";
import emailIcon from "../../images/Gmail.png";
import linkedInIcon from "../../images/LinkedIn_icon.svg";
import twitterIcon from "../../images/twitter_icon.svg";
import facebookIcon from "../../images/facebook_icon.svg";
import play from "../../images/Group 4526.svg";
import model from "../../images/advisor.png";
import model2 from "../../images/Group 4496@2x.png";
import celebration_badge from "../../images/celebration_badge.svg";
import innovstion from "../../images/innovstion-badge.svg";
import best_performaer_badge from "../../images/best-performaer-badge.svg";
import low_premiums_iocn from "../../images/low_premiums_iocn.svg";
import quick_n_easy_icon from "../../images/quick_n_easy_icon.svg";
import hassel_free_icon from "../../images/hassel_free_icon.svg";
import Happy_family_Health_insurance from "../../images/Happy_family_Health_insurance.png";
import family_Health_insurance from "../../images/family_health_insurance_icon.svg";
import Travel_insurance_icon from "../../images/Travel_insurance_icon.svg";
import car_insurance_icon from "../../images/car_insurance_icon.svg";
import Personal_accident_insurance_icon from "../../images/Personal_accident_insurance_icon.svg";
import blog_one from "../../images/blog_one.png";
import blog_two from "../../images/blog_two.png";
import blog_three from "../../images/blog_three.png";
import mask from "../../images/image_mask.png";
import letsConect from "../../images/lets_connect@2x.png";
import familyp from "../../images/Family Health Insurance.png";
import travelp from "../../images/travel_insurance.png";
import motorp from "../../images/motor_insurance.png";
import personalAccp from "../../images/personnel_accident_insurance.png";
import {
  Modal,
  message,
  Button,
  Input,
  Select,
  Form,
  Carousel,
  Spin,
} from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
// import { Player } from "video-react";
import ReactPlayer from "react-player";
// import "video-react/dist/video-react.css";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import axios from "../../axios-common";
const { Option } = Select;
function useQuery() {
  // new URLSearchParams(useLocation().search).get('name')
  return new URLSearchParams(useLocation().search);
}
const AgentMicroService = () => {
  const dispatch = useDispatch();
  // let query = useQuery();
  // const _dataStore = useSelector((state) => state)
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const agentId = new URLSearchParams(search).get("agent_id");
  // const agentId = _dataStore.login.user.agentId;
  const agentDetailsStore = useSelector((state) => state.agent.agentDetails);
  const fetchAgentDetailsLoading = useSelector(
    (state) => state.agent.fetchAgentDetailsLoading
  );
  const { first_name, last_name } = useSelector((state) => state.agent);
  const tagLine = useSelector(
    (state) => state.agent.agentDetails?.microsite_settings?.tagline
  );
  const achievements = useSelector(
    (state) => state.agent.agentDetails?.microsite_settings?.achievements
  );
  const testimonials = useSelector((state) => state.agent.testimonials);
  const fetchedProducts = useSelector((state) => state.agent.products);
  const profileImage = useSelector((state) => state.agent.profileImage);
  const { linkedIn, facebook, twitter } = useSelector(
    (state) => state.agent.socialLinks
  );
  const aboutCompany = useSelector((state) => state.agent.aboutCompany);
  const blogs = useSelector((state) => state.agent.blogs?.paginationResult);
  const benefits = useSelector(
    (state) => state.agent.aboutCompany?.aboutProduct?.benefits
  );
  const branchData = useSelector(
    (state) => state.agent.agentDetails?.branch[0]
  );
  // const imgTg = benefits?.[0]?.logoLink
  // const achievementsArr = agentDetails?.microsite_settings?.achievements?.badges
  // const agentDetails = useSelector((state) => state.agent.agentDetails)
  const [form] = Form.useForm();
  const [agentDetails, setAgentDetails] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [Testimonials, setTestimonials] = useState();
  const [Achievements, setAchievements] = useState();
  const [mobile, setMobile] = useState("");
  const [product, setProduct] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [slides, setSlides] = useState();
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const activeProductHandler = (productObj, activeIndex) => {
    setActiveProductIndex(activeIndex);
    const productBulletReasons = Object.keys(productObj?.productReasons).map(
      (key) => {
        return productObj?.productReasons[key] || null;
      }
    );
    const newProductObject = { ...productObj, productBulletReasons };
    setActiveProduct(newProductObject);
  };
  const [products, setProducts] = useState();
  const [activeProduct, setActiveProduct] = useState();

  useEffect(() => {
    dispatch(actions.fetchCompany(agentId));
    dispatch(actions.fetchBlogs(agentId, 1));
    dispatch(actions.fetchAgentDetails(agentId)).then((res) => {
      // const test = res?.agentDetails?.microsite_settings?.testimonials

      // setSlides(test)
      if (res.type === "FETCH_AGENT_DETAILS_SUCCESS") {

        // setAgentDetails(agentDetailsStore)
        setSlides(res?.agentDetails?.microsite_settings?.testimonials[0]);
        activeProductHandler(res?.agentDetails?.products[0], 0);
      }
    });
    //    fetchedProducts && setActiveProduct(activeProductHandler(fetchedProducts?.products[0],0))
  }, [dispatch, agentId]);

  const payload = {
    user_id: "5df77d17009e273b39cae811",
    Product: product,
    firstName: firstName,
    lastName: lastName,
    primaryMobile: mobile,
    leadStatus: "newleadentery",
    lead_allocated_by: "5df77d17009e273b39cae811",
    lead_Owner_Id: "5df77d17009e273b39cae811",
    lead_Creator_Id: "5df77d17009e273b39cae811",
  };
  const history = useHistory();
  const onLetsConnect = () => {
    axios
      .post(`user/addlead`, payload)
      .then((resp) => {
        if (resp?.data?.statusCode === 9) {
          message.error(resp.data.data);
        } else if (resp?.data?.statusCode === -1) {
          message.success(
            "Thanks for providing us the details. We will connect with you shortly."
          );
          form.resetFields();
        }
      })
      .catch((err) => {
      });
  };
  // const family = {
  //     title: "Family Health Insurance",
  //     image: familyp,
  //     desc: "A family floater health insurance plan allows you to cover multiple family members under a single policy. All family members share the maximum sum insured amount. This is a great option for families where some members may require more cover than others. Typically, a family floater health insurance plan offers a higher cover limit.",
  //     pdf: 'https://www.tataaig.com/s3/Medicare_Plus_bc171907df.pdf',
  //     points: [
  //         {
  //             p: "No Sub-Limit on Hospital Room Rent"
  //         },
  //         {
  //             p: "Pre & Post Hospitalisation Cover"
  //         },
  //         {
  //             p: "Cover For Pre-Existing Illnesses"
  //         }
  //     ]
  // }
  // const travel = {
  //     title: "Travel Insurance",
  //     image: travelp,
  //     desc: "Some accidents are more severe than others. If an accident were to be fatal or leave you disabled, a personal accident insurance policy will provide you or your family members with financial compensation. Of course, it will not help reverse the damage or loss, but it will help you and your family with financial stability at a difficult time.",
  //     pdf: 'https://www.tataaig.com/s3/TRAVEL_GUARD_POLICY_Prospectus_5b4b81a518.pdf',
  //     points: [
  //         {
  //             p: "We Have A Wide-Reaching Network"
  //         },
  //         {
  //             p: "High Claim Settlement Ratio"
  //         },
  //         {
  //             p: "Round the Clock Assistance"
  //         }
  //     ]
  // }
  // const car = {
  //     title: "Car Insurance",
  //     image: motorp,
  //     desc: "Own a car? Fed up of the way others drive? Yes, welcome to the club! Your car gives you independence and freedom of movement. Allowing the whole family to move together, it becomes a part of the family itself. So, let’s give it the care and protection it needs.",
  //     pdf: 'https://www.tataaig.com/s3/Brochures_3_Years_Auto_Secure_Private_Car_Package_Policy_9c237a5dd7.pdf',
  //     points: [
  //         {
  //             p: "High Claim Settlement ration "
  //         },
  //         {
  //             p: "Performance Driven "
  //         },
  //         {
  //             p: "Customer centric"
  //         }
  //     ]
  // }
  // const personal = {
  //     title: "Personal Accident Insurance",
  //     image: personalAccp,
  //     desc: "We have specialized plans that will look after you when you’re travelling domestically or abroad. Our plans will help you deal with whatever situation comes your way. We understand that students and senior citizens have unique needs. So, we’ve introduced plans engineered to meet their requirements.",
  //     pdf: 'https://www.tataaig.com/s3/ACCIDENT_SHIELD_POLICY_0b2cd3be15.pdf',
  //     points: [
  //         {
  //             p: "COVID-19 Covered "
  //         },
  //         {
  //             p: "Affordable International Policies"
  //         },
  //         {
  //             p: "Affordable Domestic Policies"
  //         },
  //         {
  //             p: "Instant Policy Purchase"
  //         }
  //     ]
  // }
  // const slide1 = {
  //     description: 'Himanshu is a great listener. He understands my needs very well. His knowledge of insurance is at par with the best in the industry',
  //     name: 'Karthik',
  //     slide: 0
  // }
  // const slide2 = {
  //     description: 'Karthik has been a great help in securing the insurance needs for my family',
  //     name: 'Amish Tr',
  //     slide: 1
  // }
  // const slide3 = {
  //     description: "Himanshu is equally good friend as he's a financial advisor.",
  //     name: 'Aditya',
  //     slide: 2
  // }
  // //     ()=>{
  // //     !_.isEmpty(testimonials) ?
  // //     return  testimonials[0]
  // // })

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showVideoModal = () => {
    setIsVideoModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    axios
      .post(`user/addlead`, payload)
      .then((resp) => {
        if (resp?.data?.statusCode === 9) {
          message.error(resp.data.data);
        } else if (resp?.data?.statusCode === -1) {
          message.success(
            "Thanks for providing us the details. We will connect with you shortly."
          );
          form.resetFields();
        }
      })
      .catch((err) => {
      });
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleVideoCancel = () => {
    setIsVideoModalVisible(false);
  };
  const toSingleBlog = (props) => {
    history.push({
      pathname: "/blog",
      state: props,
    });
  };
  const toCapitalize = (strText) => {
    try {
      if (
        strText === "" ||
        strText === null ||
        typeof strText === "undefined"
      ) {
        return strText;
      } else {
        let _str = strText.toLowerCase();
        let collection = _str.split(" ");
        let modifyStrigs = [];
        _str = "";
        for (let i = 0; i < collection.length; i++) {
          modifyStrigs[i] =
            collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      }
    } catch (Exception) {
      return strText;
    }
  };

  let achievementsElements = [];
  if (!_.isEmpty(achievements)) {
    achievementsElements = _.map(achievements.badges, (badge, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={badge.badge} alt="achievemntbadge" />
          <p className="badge-title">{badge.badgeName.toUpperCase()}</p>
        </div>
      );
    });
  }
  let testimonialElementHandler = [];
  if (!_.isEmpty(testimonials)) {
    testimonialElementHandler = _.map(testimonials, (testimonial, index) => {
      return (
        <>
          <hr
            onClick={() => setSlides(testimonial, index)}
            style={{
              width: "20px",
              border: "0",
              cursor: "pointer",
              borderBottom: testimonials[0]
                ? "0.5px solid #1cb3bc"
                : "0.5px solid #989898",
            }}
          />
        </>
      );
    });
  }
  let productElement = [];
  if (!_.isEmpty(fetchedProducts)) {
    productElement = _.map(fetchedProducts, (product, index) => {
      return (
        <>
          <div
            onClick={() => activeProductHandler(product, index)}
            className={
              activeProductIndex === index
                ? "productoptions selectedproduct"
                : "productoptions"
            }
            // style={{backgroundColor:activeProductBol.map((item)=>item?"white":"black")}}
          >
            {/* <img src={family_Health_insurance} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29.672"
              height="29.19"
              viewBox="0 0 29.672 29.19"
            >
              <defs></defs>
              <path
                style={{
                  fill: activeProductIndex === index ? "#fff" : "#0c5caa",
                }}
                className="a"
                d="M14.4.249a2.965,2.965,0,0,1,1.581,1.541,2.639,2.639,0,0,1-1.3,3.246A2.564,2.564,0,0,1,11.2,3.844,2.578,2.578,0,0,1,11.98.622a3.538,3.538,0,0,1,.678-.378A3.291,3.291,0,0,1,14.4.249Zm9.125,2.542A2.464,2.464,0,0,1,24.9,4.211a2.187,2.187,0,0,1-.006,1.46,2.3,2.3,0,0,1-2.847,1.446,2.392,2.392,0,0,1-1.474-1.429A2.3,2.3,0,0,1,23.523,2.791ZM16.94,6.525a1.5,1.5,0,0,1,.512.452c.156.267,2.671,8.206,2.619,8.267-.016.018-.095-.026-.175-.1a2.794,2.794,0,0,0-1.184-.47A2.765,2.765,0,0,0,17,14.965l-.416.209.055-.391c.03-.215.09-1.09.134-1.945s.088-1.664.1-1.8l.021-.245-1.005-.218a12.078,12.078,0,0,1-3.207-1.1A11.643,11.643,0,0,1,9.492,7.247c0-.194.329-.583.638-.747.281-.149.494-.159,3.375-.162C16.569,6.335,16.582,6.336,16.94,6.525ZM9.9,9.113a13.9,13.9,0,0,0,4.839,2.372l.923.232-.024.969c-.139,5.52-2.517,9.652-6.822,11.854l-.915.468-.914-.464A12.012,12.012,0,0,1,.657,16.509a14.508,14.508,0,0,1-.474-3.837l.023-.965.87-.227a14.763,14.763,0,0,0,6-3.331L7.9,7.425l.621.563C8.857,8.3,9.48,8.8,9.9,9.113Zm15.442-.782a1.417,1.417,0,0,1,.353.266c.072.083,1.038,1.867,2.147,3.964,2.154,4.075,2.166,4.106,1.881,4.706a1.24,1.24,0,0,1-1.078.6c-.6,0-.783-.215-1.707-1.963-.464-.877-.843-1.558-.842-1.513s.255,1.535.567,3.311.556,3.24.543,3.252-1.314.013-2.892,0l-2.869-.021.914-.736c1.04-.837,1.366-1.315,1.362-2a2.263,2.263,0,0,0-.515-1.3,2.282,2.282,0,0,0-1.375-.581h-.378l-.038-.429c-.021-.236-.487-1.859-1.035-3.606l-1-3.177.177-.287c.365-.591.395-.6,3.123-.6A10.836,10.836,0,0,1,25.342,8.331ZM7.4,9.782A18.019,18.019,0,0,1,2.374,12.6a6.056,6.056,0,0,0-.762.282,3.186,3.186,0,0,0,.025.906c.472,4.373,2.3,7.387,5.62,9.281l.619.353.384-.195a12.121,12.121,0,0,0,2.57-1.876,11.235,11.235,0,0,0,3.032-5.723,11.252,11.252,0,0,0,.292-2.741,3.771,3.771,0,0,0-.738-.292,16.3,16.3,0,0,1-4.7-2.574l-.829-.64Zm1.714,2.98a8.676,8.676,0,0,1,.05,1.186v1.057h1.084a6.324,6.324,0,0,1,1.188.068c.079.05.1.357.082,1.246l-.023,1.18-1.166.023-1.166.023v1.14c0,1.043-.013,1.147-.158,1.225a7.5,7.5,0,0,1-2.219,0c-.145-.078-.158-.181-.158-1.225v-1.14l-1.166-.023L4.3,17.5l-.023-1.18c-.017-.889,0-1.2.082-1.246a6.324,6.324,0,0,1,1.188-.068H6.627V13.874a7.092,7.092,0,0,1,.055-1.186A7.453,7.453,0,0,1,7.9,12.633C8.886,12.633,9.071,12.653,9.113,12.763Zm9.835,3.148a1.9,1.9,0,0,1,.894.939,1.652,1.652,0,0,1-2.215,2.092,1.694,1.694,0,0,1-.946-1.87A1.668,1.668,0,0,1,18.949,15.911ZM22.338,17.7a.667.667,0,0,1,.156.826,13.247,13.247,0,0,1-1.309,1.149,10.423,10.423,0,0,0-1.229,1.087c0,.051,0,1.849,0,4,.007,4.18,0,4.262-.4,4.478a.823.823,0,0,1-.834-.072c-.19-.153-.194-.187-.234-1.942-.037-1.616-.054-1.788-.184-1.813s-.143.1-.146,1.717c0,1.826-.017,1.905-.38,2.1a.691.691,0,0,1-.819-.1l-.23-.2L16.688,24.8l-.041-4.128-.682-.551c-.481-.389-.669-.59-.639-.685a6.625,6.625,0,0,1,.549-1.238,7.241,7.241,0,0,1,.772.573l.716.573h1.876l1.183-.941C21.752,17.342,21.92,17.28,22.338,17.7Zm-7.157,3.247.361.3v3.774c0,2.082.034,3.893.076,4.039.071.248.063.265-.125.265a1.542,1.542,0,0,1-1.254-.926,33.252,33.252,0,0,1-.087-3.573V21.478l.258-.414a1.3,1.3,0,0,1,.334-.414A1.8,1.8,0,0,1,15.181,20.945Zm7.068,4.346c0,3.018-.008,3.182-.163,3.436a1.263,1.263,0,0,1-.929.592c-.195,0-.222-.023-.164-.143.039-.079.081-1.7.094-3.6l.024-3.456H22.25Zm3.272.041c0,3.612.007,3.565-.615,3.86a1.13,1.13,0,0,1-1.337-.233l-.3-.3-.023-3.271-.023-3.27h2.3Zm-12.6.245c0,2.31-.016,2.588-.153,2.883a1.428,1.428,0,0,1-.771.772,1.453,1.453,0,0,1-1.749-.646c-.177-.335-.188-.447-.188-1.886v-1.53l.495-.306a14.246,14.246,0,0,0,1.959-1.542,1.713,1.713,0,0,1,.348-.293C12.9,23.025,12.925,24.171,12.924,25.577Z"
                transform="translate(-0.18 -0.129)"
              />
            </svg>
            <p>{product.productName}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </div>
        </>
      );
    });
  }
  let companyProducts = [];
  if (!_.isEmpty(benefits)) {
    companyProducts = _.map(benefits, (benefit, index) => {
      return (
        <>
          <div>
            <img src={benefit?.logoLink} alt="benefit-icon" />
            <p>{benefit?.logoName}</p>
          </div>
        </>
      );
    });
  }
  let blogCards = [];
  if (!_.isEmpty(blogs)) {
    blogCards = _.map(blogs, (blog, index) => {
      return (
        <>
          <div className="card">
            <img src={blog?.blogImages[0]?.link} alt="blog1" />
            <div className="cardCont">
              <h4>{blog?.title}</h4>
              <p>{blog?.content}</p>
              <Link
                to={{
                  pathname: "/blog",
                  state: {
                    blog: blog,
                    agentId: agentId,
                  },
                }}
                // onClick={() => toSingleBlog(blog)}
              >
                READ NOW
              </Link>
            </div>
          </div>
        </>
      );
    });
  }

  if (!agentDetails && !slides && !activeProduct) {
    return <Spin />;
  } else {
    return (
      <>
        <div className="whatsapp">
          <a
            href={`https://api.whatsapp.com/send?phone=+91${agentDetailsStore.mobile_no}`}
            target="_blank"
          >
            <img src={whatsUp} alt="whatsapp" />
          </a>
        </div>
        <div className="microEmail">
          <a href={`mailto:${agentDetailsStore.primary_email}`} target="_blank">
            <img src={emailIcon} alt="email" />
          </a>
        </div>
        <section className="main">
          <div className="header">
            <img src={mainLogo} />
            <div className="options">
              <a href="#products">Products</a>
              <a href="#blog">Blog</a>
            </div>
            <div className="options2">
              <a href="https://d2cli.iorta.in/#/instantrenew" target="_blank">
                Instant Renewal
              </a>
              <a href="https://d2cli.iorta.in/#/policytype" target="_blank">
                Claims
              </a>
              <a href="https://d2cli.iorta.in/#/masterRaiseReq" target="_blank">
                Service
              </a>
              <button
                className="primary"
                onClick={showModal}
                style={{ cursor: "pointer" }}
              >
                LETS CONNECT
              </button>
            </div>
          </div>
          <div className="profile">
            <div className="social">
              <br />
              <br />
              <div className="vr" style={{ height: "140px" }}></div>
              <a href={linkedIn}>
                <img src={linkedInIcon} alt="linkedInIcon" />
              </a>
              <br />
              <a href={twitter}>
                <img src={twitterIcon} alt="twiterIcon" />
              </a>
              <br />
              <a href={facebook}>
                <img src={facebookIcon} alt="facebookIcon" />
              </a>
              <div style={{ height: "150px", margin: "10px 8px 0" }}>
                <p>CONNECT WITH ME</p>
              </div>
              <div className="vr" style={{ height: "50px" }}></div>
            </div>

            <div className="info">
              <b className="title">
                <span>Hello i’m</span>
                <br />
                {first_name} {last_name}
              </b>
              <p className="id">ADVISOR : {agentId}</p>
              <div className="tagline">
                <h1>
                  {tagLine.toUpperCase()}
                  {/* GET SOLUTION FOR HEALTH INSURANCE */}
                </h1>
              </div>
              <b>{branchData.branchName + " " + "Branch"} </b>
              {/* <p >Chakala Industrial Estate (MIDC) Andheri East, Mumbai, 400093</p> */}
              <p>
                {branchData.zoneName +
                  ", " +
                  branchData.Area +
                  ", " +
                  branchData.cityName +
                  ", " +
                  branchData.stateName}
              </p>
              <b>
                {agentDetailsStore.reporting_manager_hirarchy.hierarchyName.toUpperCase()}
              </b>
              <p>
                {toCapitalize(agentDetailsStore.reporting_manager.name)} (
                {agentDetailsStore.reporting_manager.agent_id})
              </p>
              {/* <b>SALES MANAGER </b>
                        <p>Amol Khedekar (SM197682)</p> */}
            </div>
            <div className="person">
              <img src={profileImage} />
              <img
                className="play"
                src={play}
                onClick={showVideoModal}
                style={{ cursor: "pointer" }}
              />
              <div className="badgetag">
                <img src={celebration_badge} />
                <div>
                  <p>
                    <b>Celebrating 5 Years of Association</b>
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {" "}
                    With Tata Aig Life Insurance
                  </p>
                </div>
              </div>
            </div>
            <div className="achievements">
              <h2>My Achievements</h2>
              <p>{achievements.info}</p>
              <div className="badge-info badge-align">
                {achievementsElements}
                {/* <div>
                                <img src={innovstion} />
                                <p className="badge-title">INNOVATOR</p>
                            </div>
                            <div>
                                <img src={best_performaer_badge} />
                                <p className="badge-title">BEST PERFORMER</p>
                            </div> */}
              </div>
              <h2>Clients Testimonials</h2>
              {slides?.info ? <p>{slides?.info}</p> : null}
              <p className="by">- {slides?.name}</p>
              <div
                style={{
                  display: "flex",
                  columnGap: "5px",
                  padding: "10px 0 10px",
                }}
              >
                {testimonialElementHandler}
                {/* <hr onClick={() => setSlides(slide1)} style={{ width: '20px', border: '0', borderBottom: slides.slide === 0 ? '0.5px solid #1cb3bc' : "0.5px solid #989898", cursor: 'pointer' }} />
                            <hr onClick={() => setSlides(slide2)} style={{ width: '20px', border: '0', borderBottom: slides.slide === 1 ? '0.5px solid #1cb3bc' : "0.5px solid #989898", cursor: 'pointer' }} />
                            <hr onClick={() => setSlides(slide3)} style={{ width: '20px', border: '0', borderBottom: slides.slide === 2 ? '0.5px solid #1cb3bc' : "0.5px solid #989898", cursor: 'pointer' }} /> */}
              </div>
            </div>
          </div>
        </section>

        <section className="section2">
          <div style={{ width: "48%", position: "relative" }}>
            <h4>{aboutCompany?.companyName.toUpperCase()}</h4>
            <h1 style={{ textShadow: "0 0 5px white" }}>
              {aboutCompany?.aboutProduct?.tagLine.toUpperCase()}
            </h1>
            <br />
            <p>{aboutCompany?.aboutProduct?.summary}</p>
            <br />
            <div className="planHold">
              {companyProducts}
              {/* <div>
                            <img src={low_premiums_iocn} />
                            <p>Incredibly <br />low premiums</p>
                        </div>
                        <div>
                            <img src={quick_n_easy_icon} />
                            <p>Superquick <br />and easy</p>
                        </div>
                        <div>
                            <img src={hassel_free_icon} />
                            <p>Hassle-free <br />claims</p>
                        </div> */}
            </div>
            <br />
            <br />
            <button
              style={{ borderRadius: "8px", cursor: "pointer" }}
              className="primary"
              onClick={showModal}
            >
              LETS CONNECT
            </button>
          </div>
          <div style={{ width: "50%", marginLeft: "-120px" }}>
            <img
              className="family"
              src={aboutCompany?.aboutProduct?.productImageLink}
              alt="comapny-img"
            />
          </div>
        </section>

        <section className="section3" id="products">
          <div className="imagehld">
            <img
              src={
                !_.isEmpty(activeProduct) &&
                activeProduct?.productImages[0]?.location
              }
              alt="product-img"
            />
            {/* <img className="mask" src={mask}  alt="mask-img"/> */}
          </div>
          <div className="imgdata">
            <h4>OUR PRODUCTS</h4>
            <h1>
              SIMPLER, SMARTER, <br />
              REWARDING COVER.
            </h1>
            <br />
            <div>
              <div className="cont" style={{ width: "45%", cursor: "pointer" }}>
                {productElement}
                {/* <div onClick={() => setProducts(family)} className={products.title === "Family Health Insurance" ? "productoptions selectedproduct" : "productoptions"}>
                                <img src={family_Health_insurance} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="29.672" height="29.19" viewBox="0 0 29.672 29.19"><defs></defs><path style={{ fill: products.title === "Family Health Insurance" ? '#fff' : '#0c5caa' }} className="a" d="M14.4.249a2.965,2.965,0,0,1,1.581,1.541,2.639,2.639,0,0,1-1.3,3.246A2.564,2.564,0,0,1,11.2,3.844,2.578,2.578,0,0,1,11.98.622a3.538,3.538,0,0,1,.678-.378A3.291,3.291,0,0,1,14.4.249Zm9.125,2.542A2.464,2.464,0,0,1,24.9,4.211a2.187,2.187,0,0,1-.006,1.46,2.3,2.3,0,0,1-2.847,1.446,2.392,2.392,0,0,1-1.474-1.429A2.3,2.3,0,0,1,23.523,2.791ZM16.94,6.525a1.5,1.5,0,0,1,.512.452c.156.267,2.671,8.206,2.619,8.267-.016.018-.095-.026-.175-.1a2.794,2.794,0,0,0-1.184-.47A2.765,2.765,0,0,0,17,14.965l-.416.209.055-.391c.03-.215.09-1.09.134-1.945s.088-1.664.1-1.8l.021-.245-1.005-.218a12.078,12.078,0,0,1-3.207-1.1A11.643,11.643,0,0,1,9.492,7.247c0-.194.329-.583.638-.747.281-.149.494-.159,3.375-.162C16.569,6.335,16.582,6.336,16.94,6.525ZM9.9,9.113a13.9,13.9,0,0,0,4.839,2.372l.923.232-.024.969c-.139,5.52-2.517,9.652-6.822,11.854l-.915.468-.914-.464A12.012,12.012,0,0,1,.657,16.509a14.508,14.508,0,0,1-.474-3.837l.023-.965.87-.227a14.763,14.763,0,0,0,6-3.331L7.9,7.425l.621.563C8.857,8.3,9.48,8.8,9.9,9.113Zm15.442-.782a1.417,1.417,0,0,1,.353.266c.072.083,1.038,1.867,2.147,3.964,2.154,4.075,2.166,4.106,1.881,4.706a1.24,1.24,0,0,1-1.078.6c-.6,0-.783-.215-1.707-1.963-.464-.877-.843-1.558-.842-1.513s.255,1.535.567,3.311.556,3.24.543,3.252-1.314.013-2.892,0l-2.869-.021.914-.736c1.04-.837,1.366-1.315,1.362-2a2.263,2.263,0,0,0-.515-1.3,2.282,2.282,0,0,0-1.375-.581h-.378l-.038-.429c-.021-.236-.487-1.859-1.035-3.606l-1-3.177.177-.287c.365-.591.395-.6,3.123-.6A10.836,10.836,0,0,1,25.342,8.331ZM7.4,9.782A18.019,18.019,0,0,1,2.374,12.6a6.056,6.056,0,0,0-.762.282,3.186,3.186,0,0,0,.025.906c.472,4.373,2.3,7.387,5.62,9.281l.619.353.384-.195a12.121,12.121,0,0,0,2.57-1.876,11.235,11.235,0,0,0,3.032-5.723,11.252,11.252,0,0,0,.292-2.741,3.771,3.771,0,0,0-.738-.292,16.3,16.3,0,0,1-4.7-2.574l-.829-.64Zm1.714,2.98a8.676,8.676,0,0,1,.05,1.186v1.057h1.084a6.324,6.324,0,0,1,1.188.068c.079.05.1.357.082,1.246l-.023,1.18-1.166.023-1.166.023v1.14c0,1.043-.013,1.147-.158,1.225a7.5,7.5,0,0,1-2.219,0c-.145-.078-.158-.181-.158-1.225v-1.14l-1.166-.023L4.3,17.5l-.023-1.18c-.017-.889,0-1.2.082-1.246a6.324,6.324,0,0,1,1.188-.068H6.627V13.874a7.092,7.092,0,0,1,.055-1.186A7.453,7.453,0,0,1,7.9,12.633C8.886,12.633,9.071,12.653,9.113,12.763Zm9.835,3.148a1.9,1.9,0,0,1,.894.939,1.652,1.652,0,0,1-2.215,2.092,1.694,1.694,0,0,1-.946-1.87A1.668,1.668,0,0,1,18.949,15.911ZM22.338,17.7a.667.667,0,0,1,.156.826,13.247,13.247,0,0,1-1.309,1.149,10.423,10.423,0,0,0-1.229,1.087c0,.051,0,1.849,0,4,.007,4.18,0,4.262-.4,4.478a.823.823,0,0,1-.834-.072c-.19-.153-.194-.187-.234-1.942-.037-1.616-.054-1.788-.184-1.813s-.143.1-.146,1.717c0,1.826-.017,1.905-.38,2.1a.691.691,0,0,1-.819-.1l-.23-.2L16.688,24.8l-.041-4.128-.682-.551c-.481-.389-.669-.59-.639-.685a6.625,6.625,0,0,1,.549-1.238,7.241,7.241,0,0,1,.772.573l.716.573h1.876l1.183-.941C21.752,17.342,21.92,17.28,22.338,17.7Zm-7.157,3.247.361.3v3.774c0,2.082.034,3.893.076,4.039.071.248.063.265-.125.265a1.542,1.542,0,0,1-1.254-.926,33.252,33.252,0,0,1-.087-3.573V21.478l.258-.414a1.3,1.3,0,0,1,.334-.414A1.8,1.8,0,0,1,15.181,20.945Zm7.068,4.346c0,3.018-.008,3.182-.163,3.436a1.263,1.263,0,0,1-.929.592c-.195,0-.222-.023-.164-.143.039-.079.081-1.7.094-3.6l.024-3.456H22.25Zm3.272.041c0,3.612.007,3.565-.615,3.86a1.13,1.13,0,0,1-1.337-.233l-.3-.3-.023-3.271-.023-3.27h2.3Zm-12.6.245c0,2.31-.016,2.588-.153,2.883a1.428,1.428,0,0,1-.771.772,1.453,1.453,0,0,1-1.749-.646c-.177-.335-.188-.447-.188-1.886v-1.53l.495-.306a14.246,14.246,0,0,0,1.959-1.542,1.713,1.713,0,0,1,.348-.293C12.9,23.025,12.925,24.171,12.924,25.577Z" transform="translate(-0.18 -0.129)" /></svg>
                                <p>Family Health Insurance</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </div>
                            <div onClick={() => setProducts(travel)} className={products.title === "Travel Insurance" ? "productoptions selectedproduct" : "productoptions"}>
                                <img src={Travel_insurance_icon} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24.481" height="30" viewBox="0 0 24.481 30"><defs></defs><path style={{ fill: products.title === "Travel Insurance" ? '#fff' : '#0c5caa' }} className="a" d="M11.343.563A11.206,11.206,0,0,1,7.06,2.352a15.494,15.494,0,0,1-4.037.284C1.127,2.6.494,2.642.279,2.82.027,3.03,0,3.83,0,11.267,0,20.447.031,20.742,1.2,22.7c1.578,2.646,5.94,5.743,10.214,7.251.854.3.868.3,1.857-.093a40.389,40.389,0,0,0,5.547-2.839,17.128,17.128,0,0,0,4.626-4.716c.977-1.867,1.034-2.49,1.038-11.2,0-6.528-.038-7.917-.237-8.189-.222-.3-.425-.324-2.744-.273a16.272,16.272,0,0,1-3.832-.222A12.25,12.25,0,0,1,13.229.7C12.347.029,12.007,0,11.343.563ZM12.9,2.906a16.8,16.8,0,0,0,7.8,1.794h1.751v7.056c0,8.806-.062,9.126-2.195,11.406a18.5,18.5,0,0,1-5.771,3.906l-2.217,1.068-1.368-.584c-4.135-1.766-7.066-4.047-8.225-6.4l-.573-1.163-.049-7.625L2.013,4.739l2.244-.077a15.1,15.1,0,0,0,6.55-1.46c.7-.354,1.3-.655,1.336-.67A3.429,3.429,0,0,1,12.9,2.906ZM11.313,6.556c-.422.422-.411.343-.417,2.847l-.005,2.088L7.768,13.157a28.105,28.105,0,0,0-3.335,1.955,1.2,1.2,0,0,0,.048,1.411c.214.177.789.074,3.3-.594a31.731,31.731,0,0,1,3.106-.741,15.711,15.711,0,0,1,.109,1.973l.041,1.905-.873.884c-.849.859-1.137,1.619-.713,1.881a3.18,3.18,0,0,0,1.224-.342,2.6,2.6,0,0,1,2.8,0,3.18,3.18,0,0,0,1.224.342c.408-.252.133-1-.684-1.868l-.844-.893V17.13a8.629,8.629,0,0,1,.127-2.009,27.354,27.354,0,0,1,3.082.739c1.625.443,3.087.811,3.247.817.369.013.571-.723.363-1.322-.117-.337-.65-.706-2.262-1.564l-3.248-1.734-1.14-.61v-2.2c0-2.11-.017-2.217-.415-2.614A1.087,1.087,0,0,0,11.313,6.556Z" transform="translate(0 -0.168)" /></svg>
                                <p>Travel Insurance</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </div>
                            <div onClick={() => setProducts(car)} className={products.title === "Car Insurance" ? "productoptions selectedproduct" : "productoptions"}>
                                <img src={car_insurance_icon} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="31.538" height="30"
                                    viewBox="0 0 31.538 30"><defs></defs><path className="a" style={{ fill: products.title === "Car Insurance" ? '#fff' : '#0c5caa' }} d="M9.493.672A11.4,11.4,0,0,1,4.914,2.264c-2.754.417-3,.778-2.858,4.2.192,4.6,1.538,7.954,4.281,10.672l.9.9.6-.461.6-.461L7.381,16.058c-2.5-2.5-3.647-5.367-3.843-9.628-.091-1.965-.073-2.168.2-2.374a1.519,1.519,0,0,1,.773-.225,13.371,13.371,0,0,0,5.7-1.836c.936-.583,1.363-.618,2-.161a13.382,13.382,0,0,0,5.88,2c.955,0,1.087.272.981,2.016a16.963,16.963,0,0,1-2.327,7.885c-.578.915-.591.966-.232.869a4.692,4.692,0,0,1,.976-.106c.555,0,.627-.066,1.1-.969a20.549,20.549,0,0,0,2-8.38c0-2.118-.523-2.6-3.21-2.952A9.965,9.965,0,0,1,13.149.664C11.7-.223,11.054-.222,9.493.672Zm.295,3.9a5.712,5.712,0,0,0-2.353,1.64,5.245,5.245,0,0,0-.6,5.325,5.4,5.4,0,0,0,2.387,2.4,6.322,6.322,0,0,0,3.771.155,5.1,5.1,0,0,0,3.252-5.323c-.137-1.114-.437-1.6-.8-1.3-.2.169-.217.329-.081.826a4.39,4.39,0,0,1-1.287,4.195,3.791,3.791,0,0,1-2.784,1.062,4.129,4.129,0,0,1-3.93-2.855A4.18,4.18,0,0,1,13.173,5.6c.655.331.913.39,1.056.245.311-.315-.073-.729-1.052-1.136A5.185,5.185,0,0,0,9.787,4.572Zm3.878,2.716c-.927,1.077-1.708,1.988-1.736,2.026a3.524,3.524,0,0,1-.88-.64c-.747-.638-1.31-.8-1.31-.376A15.765,15.765,0,0,0,11.6,10.965c.455.382.872-.044,2.6-2.658C15.687,6.046,16,5.33,15.51,5.33A16.165,16.165,0,0,0,13.665,7.287Zm3.8,8.48A17.987,17.987,0,0,0,8.424,18.95a7.25,7.25,0,0,1-2.506,1.143c-2.408.653-4.2,1.723-5.041,3-.622.95-.631,1.059-.09,1.059.344,0,.413.07.37.375-.037.261-.22.425-.605.539L0,25.233l.1.891c.2,1.737.742,2.2,2.589,2.2h.962l0-.875A3.771,3.771,0,0,1,7.4,23.654a4.024,4.024,0,0,1,2.98,1.527,4.272,4.272,0,0,1,.772,2.724l-.1.413h9.586l-.1-.488a4.266,4.266,0,0,1,.777-2.72,4.054,4.054,0,0,1,2.97-1.452A3.728,3.728,0,0,1,27.994,27.4v.923H29.2c.945,0,1.263-.063,1.46-.292a4.886,4.886,0,0,0,.414-4.893,7.6,7.6,0,0,1-.541-1.479,9.113,9.113,0,0,0-1.781-3.366c-1.474-1.984-1.81-2.141-5.283-2.463A42.824,42.824,0,0,0,17.469,15.767Zm2.28,1.206c.179.115.2.486.106,1.822a7.362,7.362,0,0,1-.309,1.941c-.16.221-1.009.3-5.285.493-2.8.126-5.153.194-5.223.15-.254-.159.591-1.087,1.722-1.892A16.052,16.052,0,0,1,17.716,17C19.1,16.813,19.492,16.809,19.749,16.974Zm3.511.443a8.389,8.389,0,0,1,3.547,1.563c.833.615,1.426,1.5,1.175,1.755a18.22,18.22,0,0,1-3.5.229c-2.665.047-3.367.013-3.516-.169a10.806,10.806,0,0,1,.195-3.627C21.311,16.925,21.379,16.933,23.261,17.417Zm-3.522,4.772a.6.6,0,0,1-.121.96,5.726,5.726,0,0,1-1.655.172c-1.438,0-1.974-.173-1.974-.639,0-.571.349-.694,1.974-.694A4.155,4.155,0,0,1,19.738,22.189ZM6.189,25.057a2.836,2.836,0,0,0-1.476,2.851,3.005,3.005,0,0,0,1.419,1.833,2.987,2.987,0,0,0,2.548-.1,2.964,2.964,0,0,0,.9-1.089A2.59,2.59,0,0,0,6.189,25.057ZM23,25.2a2.7,2.7,0,0,0-.922,3.581A2.58,2.58,0,1,0,23,25.2Zm-14.9,1.455a1.1,1.1,0,0,1-.1,1.654.93.93,0,0,1-1.465-.064,1.092,1.092,0,0,1,.747-1.923A1.313,1.313,0,0,1,8.095,26.653Zm16.971-.042a1.163,1.163,0,0,1-1.281,1.9,1.159,1.159,0,0,1,.509-2.189A1.118,1.118,0,0,1,25.066,26.611Z" /></svg>
                                <p>Car Insurance</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </div>
                            <div onClick={() => setProducts(personal)} className={products.title === "Personal Accident Insurance" ? "productoptions selectedproduct" : "productoptions"}>
                                <img src={Personal_accident_insurance_icon} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="30" viewBox="0 0 23 30"><defs></defs><path className="a" style={{ fill: products.title === "Personal Accident Insurance" ? '#fff' : '#0c5caa' }} d="M11.143.042A5.34,5.34,0,0,0,9.465.561a5.442,5.442,0,0,0-.6,9.452,5.424,5.424,0,0,0,1.669.736,3.667,3.667,0,0,0,1.277.131,5.12,5.12,0,0,0,1.138-.071,5.548,5.548,0,0,0,3.86-3A5.462,5.462,0,0,0,12.833.083,5.972,5.972,0,0,0,11.143.042ZM10,11.217a17.537,17.537,0,0,0-4.279,2.506A22.4,22.4,0,0,0,3.48,15.886,16.437,16.437,0,0,0,.3,21.564,4.113,4.113,0,0,0,.021,23.4a2.157,2.157,0,0,0,.725,1.481c.473.473,1.121.669,2.588.781.737.056,7.315.056,7.608,0a2.059,2.059,0,0,0,1.6-1.348,2.027,2.027,0,0,0-.478-2.1,1.955,1.955,0,0,0-.876-.537c-.245-.086-.25-.09-.359-.357-.061-.149-.145-.367-.188-.485l-.077-.215.21-.285c.2-.274.266-.446,1.645-4.392.789-2.259,1.477-4.224,1.529-4.367l.094-.26-.218-.081c-.494-.184-.415-.222-1.215.578a9.277,9.277,0,0,1-.753.71,9.439,9.439,0,0,1-.731-.73c-.379-.4-.7-.728-.712-.726S10.212,11.139,10,11.217Zm4.555.932c-.05.312-.174,1.093-.275,1.735s-.44,2.79-.753,4.774l-.57,3.607.128.521a2.665,2.665,0,0,1-.151,2.043,2.943,2.943,0,0,1-1.123,1.135c-.59.3-.5.3-3.38.314l-2.585.017v1.446c0,.8.012,1.629.027,1.853L5.9,30H17.8l.027-.344c.015-.189.029-2.033.031-4.1l0-3.753.082.25a19.476,19.476,0,0,1,.47,2.09,29.951,29.951,0,0,1,.4,4.706c0,.39.013.807.027.928l.026.219h4.084l.029-.234c.031-.247,0-1.373-.068-2.622A24.746,24.746,0,0,0,21,18.318a14.855,14.855,0,0,0-3.291-4.5,12.666,12.666,0,0,0-2.721-2.052l-.341-.186Zm-5.78,5.592c1.777,4.541,1.7,4.371,2.061,4.459a2.021,2.021,0,0,1,.834.453,2.13,2.13,0,0,1,.256.413.982.982,0,0,1,.109.627,1.258,1.258,0,0,1-.117.573,1.653,1.653,0,0,1-.778.734l-.25.1H7.163c-3.807,0-4.174-.013-4.939-.169a1.938,1.938,0,0,1-1.011-.449,1.62,1.62,0,0,1-.592-1.549,3.242,3.242,0,0,1,.272-1.253,15.957,15.957,0,0,1,4.972-7.3A5.389,5.389,0,0,1,7.1,13.5C7.12,13.527,7.871,15.437,8.773,17.742Z" /></svg>
                                <p>Personal Accident Insurance</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </div> */}
              </div>

              <div
                className="cont"
                style={{
                  width: "50%",
                  marginLeft: "30px",
                  verticalAlign: "top",
                }}
              >
                <p className="matter">{activeProduct?.productDescription}</p>
                <br />
                {activeProduct?.productBulletReasons.map((p, i) => {
                  return p !== null ? (
                    <p key={i} className="matter">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                      </span>
                      {p}
                    </p>
                  ) : null;
                })}
                <br />
                <button
                  style={{
                    borderRadius: "8px !important",
                    display: "inlineBlock",
                    marginRight: "20px",
                  }}
                  className="primary"
                  onClick={showModal}
                  Style={{ cursor: "pointer" }}
                >
                  LEARN MORE
                </button>
                &nbsp;
                <span
                  style={{
                    fontSize: "12px",
                    color: "#0C5CAA",
                    marginLeft: "20px",
                  }}
                >
                  {
                    <a
                      href={activeProduct?.productBrochure.map(
                        (link, i) => link?.location
                      )}
                    >
                      <FilePdfOutlined /> DOWNLOAD BROCHURE
                    </a>
                  }
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section4" id="blog">
          <h4>BLOG</h4>
          <h1>EVERYTHING ABOUT INSURANCE YOU NEED TO KNOW</h1>
          <div className="cardsHolder">
            {blogCards}
            {/* <div className="card">
                        <img src={blog_one} alt="blog1" />
                        <div className="cardCont">
                            <h4>5 Things You Did Not Know About Two Wheeler Insurance</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Insurance Plan</p>
                            <a onClick={() => toSingleBlog(1)}>READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_two} alt="blog2" />
                        <div className="cardCont">
                            <h4>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Travel Insurance Plan</p>
                            <a onClick={() => toSingleBlog(2)}>READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_three} alt="blog3" />
                        <div className="cardCont">
                            <h4>Why every home need a Home Insurance?</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Home Insurance Plan</p>
                            <a onClick={() => toSingleBlog(3)}>READ NOW</a>
                        </div>
                    </div> */}
          </div>
        </section>

        <section className="section5">
          <div style={{ width: "40%", marginTop: "-10px" }}>
            <h4>LETS CONNECT</h4>
            <h1>NOT SURE WHAT INSURANCE YOU NEED? WE CAN HELP.</h1>
            <br />
            <Form form={form} onFinish={onLetsConnect}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First Name is Required",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last Name is Required",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="Enter Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Mobile is Required",
                  },
                  {
                    min: 10,
                    max: 10,
                    pattern: "^([-]?[1-9][0-9]*|0)$",
                    message: "Enter a Valid Mobile Number",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="Enter Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="product"
                rules={[{ required: true, message: "Please select product" }]}
              >
                <Select
                  className="ant-select-selector inputs"
                  placeholder="Select Product"
                  onChange={setProduct}
                  allowClear
                >
                  <Option value="Health Insurance">Health Insurance</Option>
                  <Option value="Motor Insurance">Motor Insurance</Option>
                  <Option value="Travel Insurance">Travel Insurance</Option>
                  <Option value="Personal Accident Insurance">
                    Personal Accident Insurance
                  </Option>
                  <Option value="Other">Others</Option>
                </Select>
              </Form.Item>
              {/* <Input className="inputs" placeholder="Intrested In" /> */}

              <button
                style={{ borderRadius: "8px", cursor: "pointer" }}
                className="primary"
                htmlType="submit"
              >
                LETS CONNECT
              </button>
            </Form>
          </div>
          <div className="imagehld">
            <img
              src={letsConect}
              width="100%"
              height="504px"
              style={{ float: "right", objectFit: "contain" }}
            />
          </div>
        </section>
        <footer>
          <div style={{ fontWeight: "300" }} className="social">
            &copy;2021 All Rights Reserved.
          </div>
          <div className="navigation social">
            <a
              href="https://sdrestdemo.iorta.in/#/loginview"
              target="_blank"
              style={{ color: "#1CB3BC" }}
            >
              ADVISOR LOGIN
            </a>
            <a href="#">TERMS OF USE</a>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">LEGAL</a>
          </div>
        </footer>
        <div className="ContactUS">
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            cancelButtonProps={{
              style: {
                display: "none",
              },
            }}
          >
            <div>
              <h2
                style={{
                  color: "#0C5CAA",
                  marginTop: "-12px",
                  marginBottom: "10px !important",
                }}
              >
                Lets connect
              </h2>
            </div>
            <Form form={form} onFinish={handleOk} style={{ marginTop: "15px" }}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First Name is Required",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last Name is Required",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Mobile is Required",
                  },
                  {
                    min: 10,
                    max: 10,
                    pattern: "^([-]?[1-9][0-9]*|0)$",
                    message: "Enter a Valid Mobile Number",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="product"
                rules={[
                  {
                    required: true,
                    message: "Product is Required",
                  },
                ]}
              >
                <Select
                  className="ant-select-selector inputs"
                  placeholder="Select Product"
                  onChange={setProduct}
                  allowClear
                >
                  <Option value="Health Insurance">Health Insurance</Option>
                  <Option value="Motor Insurance">Motor Insurance</Option>
                  <Option value="Travel Insurance">Travel Insurance</Option>
                  <Option value="Personal Accident Insurance">
                    Personal Accident Insurance
                  </Option>
                  <Option value="Other">Others</Option>
                </Select>
              </Form.Item>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1CB3BC",
                  border: "none",
                  borderRadius: "5px",
                }}
                htmlType="submit"
                size={"large"}
              >
                SUBMIT
              </Button>
            </Form>
            {/* <Input className="inputs" placeholder="Intrested In" /> */}
          </Modal>
        </div>
        <center>
          <div className="ContactUS">
            {isVideoModalVisible && (
              <Modal
                visible={isVideoModalVisible}
                onCancel={handleVideoCancel}
                width={600}
                footer={null}
                closable={false}
                bodyStyle={{ height: "400px", paddingTop: "4%" }}
                afterClose={handleVideoCancel}
                Style={{ padding: 0 }}
                cancelButtonProps={{
                  style: {
                    display: "none",
                  },
                }}
              >
                <ReactPlayer
                  controls={true}
                  url="https://www.youtube.com/watch?v=CuX7VSgI4KQ"
                />
              </Modal>
            )}
          </div>
        </center>
      </>
    );
  }
};

export default AgentMicroService;
