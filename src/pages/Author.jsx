import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
const API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=`;
const Author = () => {
  const { authorId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);


  
  function addFollower() {
    let followers = user.followers;
    if (isFollowing === false) {
      user.followers = followers + 1;
      setIsFollowing(true);
    }
    if (isFollowing === true) {
      user.followers = followers - 1;
      setIsFollowing(false);
    }
  }





  useEffect(() => {
    async function fetchCollections() {
      try {
        const { data } = await axios.get(`${API}${authorId}`);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(true);
      fetchCollections();
    }, 2000);
  }, [authorId]);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={99}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <span className="profile_username">
                                <Skeleton width={200} height={30} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={75} height={22} />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width={100} height={24} />
                          </div>
                          <Skeleton width={125} height={35} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          data-aos="fade-in"
                          data-aos-delay="400"
                          src={user.authorImage}
                          alt=""
                        />

                        <i
                          data-aos="fade-in"
                          data-aos-delay="400"
                          className="fa fa-check"
                        ></i>
                        <div className="profile_name">
                          <h4 data-aos="fade-in" data-aos-delay="400">
                            {user.authorName}
                            <span
                              data-aos="fade-in"
                              data-aos-delay="400"
                              className="profile_username"
                            >
                              @{user.tag}
                            </span>
                            <span
                              data-aos="fade-in"
                              data-aos-delay="400"
                              id="wallet"
                              className="profile_wallet"
                            >
                              {user.address}
                            </span>
                            <button
                              data-aos="fade-in"
                              data-aos-delay="400"
                              id="btn_copy"
                              title="Copy Text"
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div
                        data-aos="fade-in"
                        data-aos-delay="400"
                        className="de-flex-col"
                      >
                        <div className="profile_follower">
                          {user.followers} followers
                        </div>
                        <button onClick={addFollower} className="btn-main ">
                        {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems user={user} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
