import React from "react";
import { useEffect, useState } from "react";
import { NFTCard } from "../UI/NFTCard";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [nftCollection, setNFTCollection] = useState([]);
  const displaycount = Array(8).fill(null);

  useEffect(() => {
    setTimeout(() => {
      setNFTCollection(user.nftCollection);
      setLoading(false);
    }, 2000);
  }, [user]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? displaycount.map((__, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={99} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown_skeleton">
                      <Skeleton width={97} height={30} />
                    </div>
                    <div className="nft__item_wrap">
                      <div className="lazy nft__item_preview">
                        <Skeleton width={225} height={225} />
                      </div>
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width={125} height={18} />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton width={75} height={11} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={16} height={16} />
                          <Skeleton width={16} height={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : !loading &&
              Array.isArray(user.nftCollection) &&
              user.nftCollection.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NFTCard
                    user={user}
                    nft={{
                      ...nft,
                      authorImage: nft.authorImage,
                      authorId: nft.authorId,
                    }}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
