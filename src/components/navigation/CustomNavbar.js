import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSearchVisible } from '../../redux/actions';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import GlobalSearchBar from '../globalSearch/GlobalSearchBar';
import styled from 'styled-components';
import { useActiveRouteName } from '../../hooks/useActiveRouteName';

const CustomNavbar = ({ navigation, searchVisible, dispatchSetSearchVisible }) => {
    
  const activeRouteName = useActiveRouteName();
  const [previousRouteName, setPreviousRouteName] = useState(activeRouteName);

  useEffect(() => {
    // Check if the route has changed
    if (activeRouteName !== previousRouteName) {
      if (searchVisible) {
        // Close the search bar if it's open
        dispatchSetSearchVisible(false);
      }
      // Update the previous route name
      setPreviousRouteName(activeRouteName);
    }
  }, [activeRouteName, previousRouteName, searchVisible, dispatchSetSearchVisible]);

  const toggleSearch = () => {
    dispatchSetSearchVisible(!searchVisible);
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
            {activeRouteName == `home` ? 'ollie.' : activeRouteName}
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

// Add routeName to mapStateToProps if it's stored in Redux state
const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
  routeName: state.routeName, // Assuming the current route name is stored in Redux state
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchVisible: (isVisible) => dispatch(setSearchVisible(isVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);

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
