import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import GlobalSearchBar from '../globalSearch/GlobalSearchBar';
import styled from 'styled-components/native'; // Ensure this import is correct for styled-components/native
import { useActiveRouteName } from '../../hooks/useActiveRouteName';
import { setSearchVisible } from '../../redux/slices/searchSlice'; // Adjust the import path as needed

const CustomNavbar = ({ navigation }) => {
  const activeRouteName = useActiveRouteName();
  const [previousRouteName, setPreviousRouteName] = useState(activeRouteName);
  const searchVisible = useSelector((state) => state.search.searchVisible); // Assuming your store's structure
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeRouteName !== previousRouteName) {
      if (searchVisible) {
        dispatch(setSearchVisible(false));
      }
      setPreviousRouteName(activeRouteName);
    }
  }, [activeRouteName, previousRouteName, searchVisible, dispatch]);

  const toggleSearch = () => {
    dispatch(setSearchVisible(!searchVisible));
  };

  return (
    <NavContainer>
      <TopNavLeft>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </TopNavLeft>
      <TopNavMiddle>
        {!searchVisible && (
          <Text style={{ color: 'white', fontFamily: 'Moirai', fontSize: 32 }}>
            {activeRouteName === 'home' ? 'ollie.' : activeRouteName}
          </Text>
        )}
        {searchVisible && <GlobalSearchBar />}
      </TopNavMiddle>
      <TopNavRight>
        <TouchableOpacity onPress={toggleSearch}>
          {searchVisible ? 
            <Ionicons name="close" size={24} color="white" /> : 
            <Ionicons name="search" size={24} color="white" />
          }
        </TouchableOpacity>
      </TopNavRight>
    </NavContainer>
  );
};

export default CustomNavbar;

const NavContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  paddingTop: 50px;
  paddingBottom: 5px;
  min-height: 105px;
  background-color: black;
`;

const TopNavLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
`;
  
const TopNavMiddle = styled.View`
  flex: 10;
  align-items: center;
  justify-content: center;
`;
  
const TopNavRight = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
