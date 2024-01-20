import { connect } from 'react-redux';
import { setSearchVisible } from '../../redux/actions';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import { HeaderContainer, TopNavLeft, TopNavMiddle, TopNavRight } from '../../styles/StyledComponents';
import GlobalSearchBar from '../globalSearch/GlobalSearchBar';

const CustomNavbar = ({ navigation, searchVisible, dispatchSetSearchVisible }) => {

  const toggleSearch = () => {
    dispatchSetSearchVisible(!searchVisible);
  };

  return (
    <HeaderContainer>

      <TopNavLeft>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </TopNavLeft>

      <TopNavMiddle>
        {!searchVisible && <Text style={{ color: 'black', fontSize: 24 }}>0LL1E</Text>}
        
        {searchVisible ? 
          (
            <GlobalSearchBar />
          ) : null
        }
      </TopNavMiddle>
      
      <TopNavRight>
        <TouchableOpacity onPress={toggleSearch}>
          {searchVisible ? 
            <Ionicons name="close" size={24} color="black" /> : 
              <Ionicons name="search" size={24} color="black" />
          }
        </TouchableOpacity>
      </TopNavRight>

    </HeaderContainer>
  );
};

const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchVisible: (isVisible) => dispatch(setSearchVisible(isVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);