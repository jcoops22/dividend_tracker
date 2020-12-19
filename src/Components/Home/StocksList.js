import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { getUserStocks } from "../../resources/stockUtilities";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingIcon from "../Shared/LoadingIcon";
import StocksWrapper from "./StocksWrapper";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const StocksList = ({ selectCurrentUser }) => {
  const [userStocks, setUserStocks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (userStocks) {
      setLoading(false);
    } else {
      updateUserStocks();
    }
  }, [userStocks]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(selectCurrentUser.id);
    setUserStocks(stocks);
    setLoading(false);
  };

  return (
    <Container>
      <h1>Your Stocks:</h1>
      {loading ? (
        <LoadingIcon />
      ) : (
        <StockContainer>
          {userStocks.length ? (
            <StocksWrapper stocks={userStocks} />
          ) : (
            "Add some stocks!"
          )}
        </StockContainer>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StocksList);

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  @media ${device.tabletS} {
    /* padding: 0 1rem; */
  }
`;
const StockContainer = styled.div`
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
`;
