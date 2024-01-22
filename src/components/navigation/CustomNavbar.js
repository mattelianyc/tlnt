import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSearchVisible } from '../../redux/actions';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import GlobalSearchBar from '../globalSearch/GlobalSearchBar';
import styled from 'styled-components';
import { useRoute } from '@react-navigation/native';
import { useActiveRouteName } from '../../hooks/useActiveRouteName';

const CustomNavbar = ({ navigation, searchVisible, dispatchSetSearchVisible, routeName }) => {
  
  const activeRouteName = useActiveRouteName();

  const toggleSearch = () => {
    dispatchSetSearchVisible(!searchVisible);
  };

  // useEffect(() => alert(`route: ${route.name}`), [route.name])

  return (
    <NavContainer>
      <TopNavLeft>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </TopNavLeft>
      <TopNavMiddle>
        {!searchVisible && (
          <Text style={{ color: 'black', fontSize: 24 }}>
            {activeRouteName == `home` ? 'ollie.' : activeRouteName}
          </Text>
        )}
        {searchVisible && <GlobalSearchBar />}
      </TopNavMiddle>
      <TopNavRight>
        <TouchableOpacity onPress={toggleSearch}>
          {searchVisible ? 
            <Ionicons name="close" size={24} color="black" /> : 
              <Ionicons name="search" size={24} color="black" />
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
