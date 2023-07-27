import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
const ItemDetails = () => {
  const API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=`;
  const { itemDetails } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const { data } = await axios.get(`${API}${itemDetails}`);
        setItem(data);
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
  }, [itemDetails]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <>
                    <div className="col-md-6 text-center">
                      <Skeleton
                        width={500}
                        height={500}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <h2>
                          <Skeleton width={350} height={50} />
                        </h2>

                        <div className="item_info_counts">
                          <Skeleton width={100} height={25} />

                          <Skeleton width={100} height={25} />
                        </div>
                        <Skeleton width={400} height={75} />
                        <div className="d-flex flex-row">
                          <div className="mr40">
                            <Skeleton width={75} height={15} />
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Skeleton width={50} height={50} />
                                <i className="fa fa-check"></i>
                              </div>
                              <div className="author_list_info">
                                <Skeleton width={75} height={15} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="de_tab tab_simple">
                          <div className="de_tab_content">
                            <Skeleton width={75} height={15} />
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Skeleton width={50} height={50} />
                                <i className="fa fa-check"></i>
                              </div>
                              <div className="author_list_info">
                                <Skeleton width={75} height={15} />
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <Skeleton width={50} height={15} />
                          <div className="nft-item-price">
                            <Skeleton width={100} height={25} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {item.title} #{item.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
