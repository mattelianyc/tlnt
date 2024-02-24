import React from 'react';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../redux/actions';
import styled from 'styled-components';

const GlobalSearchBar = ({ dispatchSetSearchQuery }) => {
  
  const handleSearchChange = (text) => {
    dispatchSetSearchQuery(text);
  };
  
  return (
    <SearchBarContainer>
      <SearchInput
        onChangeText={handleSearchChange}
        placeholder="Start typing to search..."
        />
    </SearchBarContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchQuery: (query) => dispatch(setSearchQuery(query)),
});

export default connect(null, mapDispatchToProps)(GlobalSearchBar);

const SearchBarContainer = styled.View`
  width: 95%;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 10px 15px 10px;
  font-size: 15px;
`;