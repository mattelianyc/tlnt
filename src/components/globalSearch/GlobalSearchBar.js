import React from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { setSearchQuery } from '../../redux/slices/searchSlice'; // Adjust the import path as needed
import styled from 'styled-components/native'; // Ensure you use 'styled-components/native' for React Native

const GlobalSearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (text) => {
    dispatch(setSearchQuery(text));
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

export default GlobalSearchBar;

const SearchBarContainer = styled.View`
  width: 95%;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 10px 15px 10px;
  font-size: 15px;
`;
