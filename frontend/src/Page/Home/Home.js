import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../Contexts/GlobalState";
import { Footer, Header } from "../../imports";
import { Feature, List, MetaData, Modal, Watch } from "../../imports/index";
import { HomeStyle } from "../../Style/StyleHome/HomeStyle";
const Home = () => {
  const data = useContext(GlobalState);
  const [isOpenModal, setIsOpenModal] = data.modal;
  const { allFilmAdult} = useSelector((state) => state.adult);
  const [allCategory,setAllCategory]=useState([])
  const messageEndRef = useRef(null); 
  const handleHideResult = () => {
    setIsOpenModal(false);
  };
  const ScrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (isOpenModal === true) {
      ScrollToBottom();
    }
  }, [isOpenModal]);
  
  useEffect(()=>{
    var catall=[];
    allFilmAdult.forEach(element => {
    element.category.forEach(cat=>{
        catall.push(
          {
            id:cat._id,
            name:cat.name
          });
      })
    }) 
    const uniqueIds = [];
    const unique = catall.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);
    
      if (!isDuplicate) {
        uniqueIds.push(element.id);
    
        return true;
      }
    
      return false;
    });
    setAllCategory(unique) 
  },[allFilmAdult])

  // console.log(allCategory,'cat')
  // console.log(allFilmAdult,'film')
  return (
    <div>
      <HomeStyle />
      <MetaData title={`Home-Page-Movie`} />
      <div
        className={`home ${isOpenModal && "open-modal"}`}
        ref={messageEndRef}
      >
        <Header />
        {isOpenModal && (
          <Modal
            setIsOpenModal={setIsOpenModal}
            handleHideResult={handleHideResult}
          />
        )}
        <div className={isOpenModal ? "home__content" : ""}>
          <Feature setIsOpenModal={setIsOpenModal} className="test" />
          {
            allCategory?.map((film)=>{
              return(
                <List  key={film.id} category={film.id} name={film.name} setIsOpenModal={setIsOpenModal} />
              )
            }
            )
          }
          <br />
          <br />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
