import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/";
import device from "../responsive/Device";
import PropTypes from "prop-types";

const SearchBar = styled.form`
  flex-basis: 90%;
  position: relative;
  margin: 0 10px 0 0;
  max-width: 500px;
  transition: 0.8s 0.5s;
  @media ${device.mobileS} {
    margin: 0 5px 0 0;
  }
  @media ${device.laptopL} {
    max-width: 600px;
    flex-basis: 100%;
  }
  @media ${device.desktop} {
    max-width: 700px;
    flex-basis: 100%;
  }
`;

const DetectLocationBotton = styled.button`
  display: block;
  position: relative;
  margin: 0;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  transition: 0.8s;
  background-color: #ffffff;
  border: none;
  color: #c5c5c5;
  font-size: 17px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media ${device.laptopL} {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    font-size: 18px;
  }
  @media ${device.desktop} {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    font-size: 18px;
  }
  &:hover {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
    font-size: 19px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 20px 10px 40px;
  color: #c5c4c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

const SeachIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  @media ${device.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${device.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`;

const SearchContainer = styled.div`
  top: ${({ showResult }) => (showResult ? "0%" : "30%")};
  transition: 0.8s 0.5s;
  max-width: 1500px;
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 0;
  position: relative;
  flex-direction: row;
  flex-basis: auto;
`;

const SearchCity = ({ submit, value, change, showResult, locate }) => {
  return (
    <>
      <SearchContainer showResult={showResult}>
        <SearchBar onSubmit={submit}>
          <SearchInput
            type="text"
            value={value}
            placeholder="Enter City"
            onChange={change}
          />
          <SeachIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SeachIcon>
        </SearchBar>
        <DetectLocationBotton onClick={locate}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </DetectLocationBotton>
      </SearchContainer>
    </>
  );
};

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
